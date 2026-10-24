import { Resend } from 'resend';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { fillTemplate, renderEmail } from '@/lib/email/templates';

const DAILY_LIMIT = 200;
const MAX_BODY_BYTES = 50_000;

const sendSchema = z.object({
  clientIds: z.array(z.string().min(1).max(100)).min(1).max(50),
  subject: z.string().trim().min(1).max(200).refine((s) => !/[\r\n]/.test(s), 'El asunto no puede tener saltos de línea'),
  body: z.string().trim().min(1).max(10_000),
  templateId: z.string().max(50).optional(),
});

type Client = { id: string; name?: string; contact?: string; email?: string };

export async function GET(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Acceso privado' }, { status: 401 });
  const client = new URL(req.url).searchParams.get('client');
  let query = supabase.from('email_log').select('id,client_id,to_email,subject,template_id,status,error,sent_at').order('sent_at', { ascending: false }).limit(200);
  if (client) query = query.eq('client_id', client);
  const { data, error } = await query;
  if (error) return Response.json({ error: 'No se pudo cargar el historial' }, { status: 500 });
  return Response.json({ log: data }, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: 'Acceso privado' }, { status: 401 });
  if (req.headers.get('origin') !== new URL(req.url).origin) return Response.json({ error: 'Origen inválido' }, { status: 403 });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) return Response.json({ error: 'El envío de correos no está configurado (RESEND_API_KEY / RESEND_FROM).' }, { status: 503 });

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return Response.json({ error: 'Mensaje demasiado grande' }, { status: 413 });
  let parsed;
  try { parsed = sendSchema.safeParse(JSON.parse(raw)); } catch { return Response.json({ error: 'JSON inválido' }, { status: 400 }); }
  if (!parsed.success) return Response.json({ error: parsed.error.issues[0]?.message || 'Datos inválidos' }, { status: 400 });
  const { clientIds, subject, body, templateId } = parsed.data;

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count } = await supabase.from('email_log').select('id', { count: 'exact', head: true }).eq('status', 'sent').gte('sent_at', since);
  if ((count ?? 0) + clientIds.length > DAILY_LIMIT) return Response.json({ error: `Límite de ${DAILY_LIMIT} correos en 24 horas alcanzado.` }, { status: 429 });

  // Recipients always come from the stored workspace, never from the request.
  const { data: row, error: loadError } = await supabase.from('workspaces').select('data').eq('id', 'studio').maybeSingle();
  if (loadError) return Response.json({ error: 'No se pudieron cargar los clientes' }, { status: 500 });
  const clients: Client[] = (row?.data as { clients?: Client[] } | null)?.clients ?? [];
  const byId = new Map(clients.map((c) => [c.id, c]));

  const signature = `${user.user_metadata?.full_name || 'Maca & Paolo'}\nDiploy Studio`;
  const replyTo = process.env.RESEND_REPLY_TO || undefined;
  const unsubscribe = `<mailto:${replyTo || from.replace(/^.*<([^>]+)>.*$/, '$1')}?subject=BAJA>`;

  const failed: { clientId: string; error: string }[] = [];
  const outgoing: { client: Client; email: string; subject: string; html: string; text: string }[] = [];
  for (const id of [...new Set(clientIds)]) {
    const client = byId.get(id);
    const email = client?.email?.trim() || '';
    if (!client) { failed.push({ clientId: id, error: 'Cliente no encontrado' }); continue; }
    if (!z.string().email().safeParse(email).success) { failed.push({ clientId: id, error: 'Correo inválido o vacío' }); continue; }
    const personalSubject = fillTemplate(subject, client, signature).replace(/[\r\n]+/g, ' ').slice(0, 250);
    outgoing.push({ client, email, subject: personalSubject, ...renderEmail(fillTemplate(body, client, signature)) });
  }

  const log: Record<string, unknown>[] = failed.map((f) => ({ client_id: f.clientId, to_email: byId.get(f.clientId)?.email || '', subject, template_id: templateId ?? null, status: 'failed', error: f.error, sent_by: user.id }));

  if (outgoing.length) {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.batch.send(
      outgoing.map((m) => ({ from, to: [m.email], subject: m.subject, html: m.html, text: m.text, replyTo, headers: { 'List-Unsubscribe': unsubscribe } })),
    );
    const ids = data?.data ?? [];
    outgoing.forEach((m, i) => {
      if (error) failed.push({ clientId: m.client.id, error: error.message });
      log.push({ client_id: m.client.id, to_email: m.email, subject: m.subject, template_id: templateId ?? null, status: error ? 'failed' : 'sent', resend_id: ids[i]?.id ?? null, error: error?.message ?? null, sent_by: user.id });
    });
  }

  const { error: logError } = await supabase.from('email_log').insert(log);
  if (logError) console.error('email_log insert failed', logError.message);

  return Response.json({ sent: log.filter((l) => l.status === 'sent').length, failed });
}

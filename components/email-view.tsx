'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, Mail, Send } from 'lucide-react';
import { fillTemplate, templates, unsubscribeNote } from '@/lib/email/templates';

type Client = { id: string; name: string; contact?: string; email?: string };
type LogEntry = { id: string; client_id: string; to_email: string; subject: string; status: 'sent' | 'failed'; error: string | null; sent_at: string };

const hasEmail = (c: Client) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email?.trim() || '');
const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('es-CL', { timeZone: 'America/Santiago', dateStyle: 'short', timeStyle: 'short' });

export function EmailView({ clients, user, preselected }: { clients: Client[]; user: string; preselected?: string }) {
  const [templateId, setTemplateId] = useState(templates[0].id);
  const [subject, setSubject] = useState(templates[0].subject);
  const [body, setBody] = useState(templates[0].body);
  const [selected, setSelected] = useState<string[]>(preselected ? [preselected] : []);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [logFilter, setLogFilter] = useState(preselected || '');

  const withEmail = useMemo(() => clients.filter(hasEmail), [clients]);
  const nameOf = (id: string) => clients.find((c) => c.id === id)?.name || 'Cliente eliminado';
  const previewClient = clients.find((c) => c.id === selected[0]) || { id: '', name: 'Empresa de ejemplo', contact: 'Camila' };
  const signature = `${user || 'Maca & Paolo'}\nDiploy Studio`;

  const loadLog = useCallback(async () => {
    const r = await fetch('/api/email' + (logFilter ? '?client=' + encodeURIComponent(logFilter) : ''));
    if (r.ok) setLog((await r.json()).log);
  }, [logFilter]);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- loads history from the API
  useEffect(() => { loadLog(); }, [loadLog]);

  const pickTemplate = (id: string) => {
    const t = templates.find((x) => x.id === id);
    if (!t) return;
    setTemplateId(id);
    setSubject(t.subject);
    setBody(t.body);
  };
  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const allSelected = withEmail.length > 0 && withEmail.every((c) => selected.includes(c.id));

  async function send() {
    setBusy(true);
    setResult(null);
    try {
      const r = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientIds: selected, subject, body, templateId }),
      });
      const b = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(b.error || 'No se pudo enviar');
      const failedNames = (b.failed as { clientId: string; error: string }[]).map((f) => `${nameOf(f.clientId)} (${f.error})`);
      setResult({ ok: failedNames.length === 0, text: `Enviados: ${b.sent}.` + (failedNames.length ? ` Fallaron: ${failedNames.join(', ')}.` : '') });
      if (b.sent) setSelected([]);
      loadLog();
    } catch (e) {
      setResult({ ok: false, text: e instanceof Error ? e.message : 'No se pudo enviar' });
    } finally {
      setBusy(false);
      setConfirming(false);
    }
  }

  return (
    <>
      <div className="page-heading">
        <div className="eyebrow">CONVERSACIONES QUE ABREN PUERTAS</div>
        <h1>correos<span className="pink">._</span></h1>
      </div>

      <div className="email-layout">
        <section className="record email-recipients">
          <div className="section-head">
            <h2>Destinatarios</h2>
            <button onClick={() => setSelected(allSelected ? [] : withEmail.map((c) => c.id))} disabled={!withEmail.length}>
              {allSelected ? 'Ninguno' : 'Todos'}
            </button>
          </div>
          {clients.length === 0 && <p>Aún no hay clientes. Agrégalos en la pestaña Clientes.</p>}
          {clients.map((c) => {
            const ok = hasEmail(c);
            const on = selected.includes(c.id);
            return (
              <button key={c.id} className="line email-recipient" disabled={!ok} onClick={() => toggle(c.id)} aria-pressed={on}>
                <span className={on ? 'checkbox checked' : 'checkbox'}>{on && <Check size={12} />}</span>
                <span>
                  {c.name}
                  <small>{ok ? c.email : 'Sin correo'}</small>
                </span>
              </button>
            );
          })}
        </section>

        <section className="record email-compose">
          <label>
            Plantilla
            <select value={templateId} onChange={(e) => pickTemplate(e.target.value)}>
              {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </label>
          <label>
            Asunto
            <input value={subject} maxLength={200} onChange={(e) => setSubject(e.target.value.replace(/[\r\n]/g, ''))} />
          </label>
          <label>
            Mensaje
            <textarea value={body} rows={14} maxLength={10000} onChange={(e) => setBody(e.target.value)} />
          </label>
          <small className="muted">Variables: {'{{nombre}}'}, {'{{empresa}}'}, {'{{firma}}'}. Se reemplazan para cada cliente.</small>

          <div className="email-preview">
            <div className="eyebrow">VISTA PREVIA · {previewClient.name}</div>
            <strong>{fillTemplate(subject, previewClient, signature)}</strong>
            <pre>{fillTemplate(body, previewClient, signature)}</pre>
            <small className="muted">{unsubscribeNote}</small>
          </div>

          {result && <div className={result.ok ? 'notice success' : 'notice'} role="status">{result.text}</div>}

          {confirming ? (
            <div className="email-confirm">
              <span>¿Enviar a {selected.length} {selected.length === 1 ? 'cliente' : 'clientes'}?</span>
              <button onClick={() => setConfirming(false)} disabled={busy}>Cancelar</button>
              <button className="accent" onClick={send} disabled={busy}><Send size={15} /> {busy ? 'Enviando…' : 'Sí, enviar'}</button>
            </div>
          ) : (
            <button className="accent" disabled={!selected.length || !subject.trim() || !body.trim()} onClick={() => setConfirming(true)}>
              <Mail size={16} /> Enviar a {selected.length} {selected.length === 1 ? 'cliente' : 'clientes'}
            </button>
          )}
        </section>
      </div>

      <div className="section-head">
        <h2>Historial</h2>
        <select aria-label="Filtrar historial por cliente" value={logFilter} onChange={(e) => setLogFilter(e.target.value)}>
          <option value="">Todos los clientes</option>
          {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      {log.length === 0 ? (
        <p className="muted">Todavía no hay envíos{logFilter ? ' para este cliente' : ''}.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr><th>Fecha</th><th>Cliente</th><th>Correo</th><th>Asunto</th><th>Estado</th></tr></thead>
            <tbody>
              {log.map((l) => (
                <tr key={l.id}>
                  <td>{formatDate(l.sent_at)}</td>
                  <td>{nameOf(l.client_id)}</td>
                  <td>{l.to_email}</td>
                  <td>{l.subject}</td>
                  <td><span className={l.status === 'sent' ? 'badge green' : 'badge orange'} title={l.error || undefined}>{l.status === 'sent' ? 'Enviado' : 'Falló'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

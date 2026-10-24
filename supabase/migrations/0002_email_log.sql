-- Historial de correos enviados desde la pestaña Correos.

create table if not exists public.email_log (
  id uuid primary key default gen_random_uuid(),
  client_id text not null,
  to_email text not null,
  subject text not null,
  template_id text,
  status text not null check (status in ('sent', 'failed')),
  resend_id text,
  error text,
  sent_by uuid not null default auth.uid() references auth.users(id),
  sent_at timestamptz not null default now()
);

create index if not exists email_log_sent_at_idx on public.email_log (sent_at desc);
create index if not exists email_log_client_idx on public.email_log (client_id, sent_at desc);

alter table public.email_log enable row level security;

create policy "team reads email log" on public.email_log
  for select to authenticated using (true);

create policy "team logs own sends" on public.email_log
  for insert to authenticated with check (sent_by = auth.uid());

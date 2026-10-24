-- Diploy Studio: workspace JSON (un solo equipo) + bucket privado de archivos.
-- Cualquier usuario autenticado es miembro del equipo: desactiva el registro
-- público en Supabase (Authentication → Sign In / Providers → "Allow new users to sign up")
-- y crea las cuentas desde el panel.

create table if not exists public.workspaces (
  id text primary key,
  data jsonb not null,
  revision integer not null default 0,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.workspaces enable row level security;

create policy "team reads workspace" on public.workspaces
  for select to authenticated using (true);

-- Guardado con bloqueo optimista: devuelve la nueva revisión o null si hubo conflicto.
create or replace function public.save_workspace(p_id text, p_data jsonb, p_revision integer)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_revision integer;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  insert into workspaces (id, data, revision) values (p_id, p_data, 0)
  on conflict (id) do nothing;

  update workspaces
     set data = p_data, revision = revision + 1, updated_at = now(), updated_by = auth.uid()
   where id = p_id and revision = p_revision
  returning revision into new_revision;

  return new_revision;
end;
$$;

revoke execute on function public.save_workspace(text, jsonb, integer) from public, anon;
grant execute on function public.save_workspace(text, jsonb, integer) to authenticated;

insert into storage.buckets (id, name, public, file_size_limit)
values ('files', 'files', false, 20000000)
on conflict (id) do nothing;

create policy "team reads files" on storage.objects
  for select to authenticated using (bucket_id = 'files');

create policy "team uploads files" on storage.objects
  for insert to authenticated with check (bucket_id = 'files');

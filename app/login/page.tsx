import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

async function signIn(formData: FormData) {
  'use server';
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: String(formData.get('email') || ''),
    password: String(formData.get('password') || ''),
  });
  if (error) redirect('/login?error=1');
  redirect('/');
}

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <main className="login">
      <form action={signIn}>
        <h1>diploy._<small>/ studio</small></h1>
        <label>Correo<input name="email" type="email" autoComplete="email" required /></label>
        <label>Contraseña<input name="password" type="password" autoComplete="current-password" required /></label>
        {error && <p role="alert">Correo o contraseña incorrectos.</p>}
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}

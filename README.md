# Diploy Studio

CRM privado del equipo (Next.js 16) desplegado en **Vercel** con **Supabase** (Postgres, Auth y Storage).

## Configuración inicial

1. **Supabase:** crea un proyecto (o instala la integración Supabase desde el Marketplace de Vercel, que inyecta las variables).
   - En *SQL Editor* ejecuta `supabase/migrations/0001_init.sql`.
   - En *Authentication → Sign In / Providers* desactiva **Allow new users to sign up**. El acceso es solo para el equipo.
   - En *Authentication → Users* crea las cuentas (correo y contraseña).
2. **Variables:** copia `.env.example` a `.env.local` con la URL y la anon key del proyecto, o ejecuta `vercel env pull .env.local`.
3. **Local:**
   ```bash
   npm install
   npm run dev
   ```
   Abre http://localhost:3000.
4. **Vercel:** importa el repo `diploycl/diploy-studio`. Agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (si no usaste la integración). Cada push genera un preview.

## Correos (Resend)

1. En [resend.com](https://resend.com) agrega el dominio en *Domains* y crea en tu DNS los registros SPF, DKIM y DMARC que indica, hasta que aparezca **Verified**.
2. Crea una API key con permiso *Sending access*.
3. En Vercel, en *Settings → Environment Variables*, agrega (sin prefijo `NEXT_PUBLIC_`):
   - `RESEND_API_KEY`
   - `RESEND_FROM`, por ejemplo `Diploy <hola@diploy.cl>`
   - `RESEND_REPLY_TO` (opcional)
4. Ejecuta `supabase/migrations/0002_email_log.sql` en el SQL Editor de Supabase.

Los destinatarios se toman siempre de los clientes guardados (nunca del navegador), con un máximo de 50 por envío y 200 cada 24 horas. Las plantillas están en `lib/email/templates.ts`.

## Estructura

- `app/studio.tsx`: interfaz del CRM (proyectos, clientes, cotizaciones, finanzas, calendario).
- `app/api/workspace`: lee y guarda el espacio de trabajo con bloqueo optimista (RPC `save_workspace`).
- `app/api/files`: sube y descarga archivos del bucket privado `files`.
- `app/login`, `app/auth/signout`, `proxy.ts`: sesión con Supabase Auth.
- `app/api/email`, `components/email-view.tsx`: pestaña Correos (Resend) e historial de envíos.
- `supabase/migrations`: esquema SQL y políticas RLS.

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

## Estructura

- `app/studio.tsx`: interfaz del CRM (proyectos, clientes, cotizaciones, finanzas, calendario).
- `app/api/workspace`: lee y guarda el espacio de trabajo con bloqueo optimista (RPC `save_workspace`).
- `app/api/files`: sube y descarga archivos del bucket privado `files`.
- `app/login`, `app/auth/signout`, `proxy.ts`: sesión con Supabase Auth.
- `supabase/migrations`: esquema SQL y políticas RLS.

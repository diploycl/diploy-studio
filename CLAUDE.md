# Diploy Studio: contexto del proyecto

CRM privado del estudio Diploy (Maca y Paolo). UI en español (es-CL, CLP, `America/Santiago`). Responder al usuario en español.
**Tareas pendientes y su estado: [PENDIENTES.md](PENDIENTES.md).** Leerlo antes de proponer trabajo nuevo y marcar ítems al completarlos.

## Stack y despliegue
- **Stack:** Next.js 16.4 (App Router, Turbopack), React 19, TypeScript, Tailwind 4 más CSS propio, zod 4, npm. No hay pnpm instalado.
- **Repo:** `github.com/diploycl/diploy-studio`, **público**. Rama única: `main`.
- **Hosting:** Vercel, cuenta `diploycl`, plan Hobby. Push a `main` hace deploy automático a producción en unos 40 s.
  - URL: https://diploy-studio-one.vercel.app
  - El repo se hizo público porque Hobby bloquea deploys de commits de colaboradores en repos privados. El autor git local es `speqio`.
- **Backend:** Supabase (región São Paulo), integrado vía Vercel Marketplace. Postgres, Auth (email y contraseña) y Storage.
- **Historia:** el proyecto venía de una plantilla OpenAI Sites sobre Cloudflare Workers (vinext, D1, R2, wrangler). Se eliminó todo eso en el PR #1. No reintroducir nada de Cloudflare ni Sites.

## Arquitectura
- **`app/studio.tsx`:** toda la UI del CRM en un componente cliente de unos 40 KB, **minificado en pocas líneas**. Editar con reemplazos exactos (Edit o un script node con conteo de coincidencias), nunca reformatear.
  - Vistas por estado `view`: Inicio, Proyectos, Clientes, Cotizaciones, Finanzas, Calendario, Correos, Configuración.
- **`app/model.ts`:** `initialData`, estados, etapas, `money()` y `quoteTotal()` (IVA 1.19).
- **Datos:** todo el workspace es **un JSON** en `public.workspaces` (id `'studio'`, `data jsonb`, `revision`).
  - Guardado con bloqueo optimista vía RPC `save_workspace(p_id, p_data, p_revision)`, que devuelve null si hay conflicto (409).
  - Entidades dentro del JSON: `projects` (con stages, tasks, references, deliveries, decisions), `clients` (`name`, `contact`, `email`, `phone`, `website`, `notes`), `quotes`, `payments`, `expenses`, `activity`, `templates`.
- **`app/api/workspace/route.ts`:** GET y PUT del workspace, con validación zod del esquema completo y límite de 2 MB antes de parsear.
- **`app/api/files/route.ts`:** subida y descarga en el bucket privado `files` de Supabase Storage (20 MB).
- **`app/api/email/route.ts`:** envío con Resend y el historial `email_log`.
  - Los destinatarios se resuelven en el servidor a partir de `clientIds`, nunca se toman emails del navegador.
  - Máximo 50 por envío y 200 cada 24 h.
- **`lib/email/templates.ts`:** plantillas por servicio (branding, editorial, ux-ui, web, marketing, seguimiento), `fillTemplate` con `{{nombre}}`, `{{empresa}}` y `{{firma}}`, y `renderEmail`, que escapa el HTML y agrega el pie de baja.
- **`components/email-view.tsx`:** la pestaña Correos. `components/theme-toggle.tsx`: el cambio de tema claro/oscuro (next-themes, `data-theme`).
- **Auth:**
  - `lib/supabase/server.ts` expone `createClient()` y `getUser()`.
  - `proxy.ts` (equivalente a middleware en Next 16) refresca la sesión y redirige a `/login`.
  - `app/login/page.tsx` usa una server action. `app/auth/signout/route.ts` es POST.
  - Cualquier usuario autenticado es del equipo. El registro público debe estar desactivado en Supabase.
- **SQL:** `supabase/migrations/` (0001 workspace y storage, 0002 email_log). Se ejecutan **a mano** en el SQL Editor de Supabase.
- **Estilos:** `app/globals.css` (minificado) con tokens en `:root` (oscuro, por defecto) y `:root[data-theme=light]`. **No usar colores fijos:** usar variables como `--bg`, `--ink`, `--muted`, `--line`, `--surface`, `--pink` y las `--*-text` para texto de color. Fuente IBM Plex Mono.
- **Favicon:** `app/icon.svg`, dos esferas rosa (`#f5a2fa`) y violeta (`#8061ff`).
- **Cabeceras de seguridad:** en `next.config.ts`.

## Variables de entorno (en Vercel; local en `.env.local`, ver `.env.example`)
- `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`: las crea la integración.
- `RESEND_API_KEY`, `RESEND_FROM` y `RESEND_REPLY_TO`: solo servidor, **nunca** con `NEXT_PUBLIC_`. Pendientes de configurar.

## Comandos
`npm run dev` (http://localhost:3000) · `npm run build` · `npm run lint` · `npm audit`
- `npm run lint` da unos 150 errores **preexistentes** de `any` en `studio.tsx`, `model.ts` y la ruta del workspace. Correr lint solo sobre los archivos tocados.
- **Prueba rápida sin Supabase real:** `NEXT_PUBLIC_SUPABASE_URL=https://example.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=x npx next start -p 3123`. Las APIs sin sesión deben responder 401.
- **Scripts de prueba con tsx:** crearlos dentro del repo (por ejemplo `.tcheck.mts`), porque desde `%TEMP%` no resuelven `node_modules`, y borrarlos al terminar.

## Reglas de trabajo (acordadas con el usuario)
- **Commits y push:** cambios pequeños directo a `main` con commit y push. Avisar antes de cambios grandes o riesgosos (migraciones, auth).
- **Seguridad antes de cada push:**
  - Revisar el diff en busca de secretos (claves `re_…`, JWT `eyJ…`, `service_role`, contraseñas, URLs reales).
  - `npm audit` debe quedar en 0.
  - Mantener chequeo de sesión, validación de Origin, límites de tamaño antes de parsear, RLS y cabeceras.
  - Como el repo es público, nunca commitear `.env*` (salvo `.env.example`).
- **Metodología:** ODD (Organic Driven Development) de gentle-ai para features grandes, con especificación en `odd/tasks/<feature>.md`.
- **Atribución:** commits con el trailer `Co-Authored-By` indicado por el sistema.

# Diploy Studio — VS Code

Esta es la copia editable del código fuente publicado. Stack: React + Vinext + Cloudflare D1 y R2. No es una versión Astro/Supabase.

## Ver en vivo desde VS Code (Windows)

Si el servidor ya está activo, abre http://127.0.0.1:5173 o presiona F5
y selecciona `Diploy: ver en vivo` para abrir Microsoft Edge.

Para iniciarlo, usa **Terminal > Ejecutar tarea > Diploy: iniciar vista en vivo**.
También puedes ejecutar en PowerShell:

```powershell
npm.cmd run db:local
npm.cmd run dev
```

`npm.cmd` evita el bloqueo de `npm.ps1` por la política de ejecución de
PowerShell. La tarea usa Node directamente y no requiere cambiar esa política.
Mantén la terminal abierta: los cambios se actualizan al guardar los archivos.
Si aparece «Another vinext dev server is already running», abre la dirección
indicada; el servidor existente ya está disponible.

## Iniciar en Windows, macOS o Linux

1. Instala Node.js 22.13 o superior (recomendado Node 22 LTS) y pnpm.
2. Descomprime y abre la carpeta `diploy-studio` en VS Code.
3. En la terminal de esa carpeta ejecuta:

```bash
pnpm install
pnpm db:local
pnpm dev
```

Abre http://localhost:5173. El entorno local utiliza un inicio de sesión de desarrollo, no una cuenta real de ChatGPT. Usa sólo localhost para ese modo. Los datos locales son independientes de los datos publicados.

`pnpm db:local` prepara la tabla local sin requerir un build previo. Puedes repetirlo: conserva los datos existentes. En las siguientes sesiones basta `pnpm dev`.

## Archivos principales

- `app/studio.tsx`: pantallas y funciones del CRM.
- `app/globals.css`: identidad visual y responsive.
- `app/model.ts`: proyecto inicial y cálculos.
- `app/api/workspace/route.ts`: lectura y guardado compartido.
- `app/api/files/route.ts`: subida y descarga de archivos.
- `db/schema.ts` y `drizzle/`: base de datos y migraciones.
- `vite.config.ts`: configuración del entorno y bindings.

## Validar cambios

```bash
pnpm exec tsc --noEmit
pnpm build
```

La copia conserva el identificador del sitio original en `.openai/hosting.json`, pero no incluye credenciales ni permisos de despliegue. Modificar esta carpeta no cambia automáticamente el sitio publicado.

El acceso real mediante ChatGPT depende de la plataforma de hosting de Sites. Para alojarlo fuera de ella tendrás que configurar un proveedor de autenticación real y los recursos D1/R2. El login local no es un sistema de autenticación de producción.

No se incluyen node_modules, builds, bases de datos, archivos subidos ni datos privados. El CRM arranca con Edición de libro y sus etapas vacías. Revisa README.md para las funciones y límites de la entrega.

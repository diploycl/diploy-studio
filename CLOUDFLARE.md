# Publicar Diploy Studio en Cloudflare Workers

La aplicación usa un Worker con React/Vinext, D1 (`DB`) y R2 (`BUCKET`).
Cloudflare Access controla el inicio de sesión en este despliegue. El Worker
valida la firma, el emisor, el AUD y la vigencia del token antes de acceder al CRM.
La vista local y el despliegue original de Sites conservan su configuración.

## 1. Conectar la cuenta y crear recursos

En PowerShell, desde esta carpeta:

```powershell
npm.cmd run cf -- login
npm.cmd run cf -- d1 create diploy-studio-db
npm.cmd run cf -- r2 bucket create diploy-studio-files
```

Copia el `database_id` que devuelve D1 en `wrangler.json`. Si ya tienes recursos,
usa sus nombres y el ID real. R2 debe estar habilitado en tu cuenta.
No incluyas contraseñas ni tokens de la cuenta en el repositorio.

## 2. Configurar el acceso privado

En Cloudflare Zero Trust configura el equipo y crea una aplicación Access de
tipo Self-hosted para el dominio donde publicarás el CRM. Puedes usar un dominio
propio o el hostname previsto `diploy-studio.<tu-subdominio>.workers.dev`.
Protege todo el hostname, incluidas `/api/*`, y añade una política Allow con los
correos reales de las personas autorizadas. Puedes habilitar One-time PIN para
recibir un código por correo. No añadas una política Bypass.

Completa las variables de `wrangler.json`:

- `ACCESS_TEAM_DOMAIN`: `https://tu-equipo.cloudflareaccess.com`, sin barra final.
- `ACCESS_AUD`: Application Audience (AUD) que muestra la aplicación Access.

Para usar un dominio propio, añade en `wrangler.json`:

```json
"workers_dev": false,
"routes": [{ "pattern": "studio.tudominio.cl", "custom_domain": true }]
```

La zona del dominio debe estar en la misma cuenta de Cloudflare. Configura
Access para ese mismo hostname. Sin token válido, el Worker rechaza la petición
incluso si alguien intenta enviar cabeceras de identidad falsas.

## 3. Verificar y desplegar

```powershell
npm.cmd run check:cloudflare
npm.cmd run deploy:cloudflare
```

`check:cloudflare` compila el Worker y hace un dry-run sin publicar.
`deploy:cloudflare` comprueba la configuración, compila, aplica las migraciones
pendientes en D1 remoto y despliega el Worker con sus archivos estáticos.
Requiere una sesión de Wrangler autorizada. En Cloudflare Workers Builds usa
`npm run deploy:cloudflare` como comando de despliegue.

Si sólo necesitas compilar: `npm.cmd run build:cloudflare`.
El artefacto se genera en `dist/server/wrangler.json` y `dist/client`.
El `npm run build` original sigue destinado a la compilación portable de Vinext.

## 4. Comprobar la publicación

Abre el dominio en una ventana privada. Access debe solicitar el código de
inicio de sesión. Con un correo permitido, comprueba que carga el CRM, guarda
un proyecto y permite subir y descargar un archivo. Un correo no autorizado
debe ser rechazado. Los datos y archivos locales no se copian a producción:
D1 remoto arranca con la estructura y el proyecto inicial de la aplicación.

Los archivos de R2 se sirven mediante la API autenticada; mantén el bucket
privado, sin acceso público por r2.dev. El cierre de sesión utiliza la ruta de
logout de Cloudflare Access.

Documentación:
[validación de JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/),
[configuración generada por Vite](https://developers.cloudflare.com/workers/vite-plugin/reference/migrating-from-wrangler-dev/).

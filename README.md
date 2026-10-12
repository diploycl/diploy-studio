# Diploy Studio
CRM privado con React/Vinext, Cloudflare D1 y R2. Autenticación administrada por Sites mediante ChatGPT; no se usa Supabase ni Astro en esta edición alojada.

## Operación
El primer proyecto es Edición de libro, sin cliente, fechas, presupuesto o avance inventados. Las etapas no cuentan como tareas terminadas. Los datos se guardan en una base compartida mediante revisión optimista: un cambio concurrente no sobrescribe otro. Archivos de hasta 20 MB, sólo accesibles con sesión autenticada.

Incluye proyectos, etapas y plantillas, tareas con checklist y comentarios, referencias con imágenes, cotizaciones con versiones e IVA opcional, impresión para guardar PDF, pagos recibidos o programados, gastos, entregas con versiones y calendario. Las cotizaciones no son facturas tributarias. Contratado se toma del presupuesto acordado; recibido sólo cuenta pagos marcados Recibido. Los pagos pendientes son planificación y no se suman al efectivo.

El sitio se publica inicialmente sólo para su propietaria. Maca y Paolo son responsables de tareas, no cuentas ficticias. Hace falta autorizar la cuenta real de Paolo para que pueda iniciar sesión. La cuenta propietaria ya tiene acceso.

## Desarrollo
Instalar con el helper de Sites. Generar migraciones con npm run db:generate. Validar con tsc --noEmit y compilar con el helper build-site.mjs. Las migraciones sólo contienen estructura; el proyecto inicial se establece en runtime y se persiste en el primer guardado.

## Límites de esta entrega
PDF mediante diálogo de impresión del navegador; no descarga PDF automática. No facturación electrónica, correos automáticos ni integraciones externas. Los archivos subidos sin guardar un registro pueden quedar sin referencia. Los avisos de vencimiento se muestran en el dashboard; no hay notificaciones push. No hay sincronización en tiempo real; recargar obtiene cambios del otro usuario. Esta entrega usa la plataforma Sites y no constituye el repositorio Astro/Supabase propuesto originalmente.

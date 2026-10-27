# Tareas pendientes

## Dominio crm.diploy.cl
Bloqueado: el DNS de `diploy.cl` está en otra cuenta de Vercel.

- [ ] Pedir al dueño de esa cuenta que agregue en Vercel → Domains → diploy.cl → DNS Records:
  - TXT `_vercel` (autoriza el subdominio en este proyecto)
  - CNAME `crm` (valor que entregue Vercel al agregar `crm.diploy.cl` en Settings → Domains)
- [ ] Alternativa: transferir el proyecto a esa cuenta (Settings → General → Transfer Project)
- [ ] Supabase → Authentication → URL Configuration: Site URL `https://crm.diploy.cl` y agregar `https://crm.diploy.cl/**` a Redirect URLs
- [ ] Opcional: redirigir `diploy-studio-one.vercel.app` → `crm.diploy.cl` (308)

## Correos con Resend
El código ya está en producción. Falta la configuración.

- [ ] Ejecutar `supabase/migrations/0002_email_log.sql` en Supabase
- [ ] Crear cuenta y API key en Resend (Sending access)
- [ ] Variables en Vercel: `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_REPLY_TO` (opcional), luego Redeploy
- [ ] Prueba sin dominio: `RESEND_FROM=Diploy <onboarding@resend.dev>`; solo envía al correo de la cuenta Resend
- [ ] Verificar `diploy.cl` en Resend (SPF, DKIM, DMARC). Lo debe agregar el dueño del DNS. Si ya existe un SPF, fusionarlo en vez de crear otro
- [ ] Cambiar `RESEND_FROM` a `Diploy <hola@diploy.cl>` y probar el envío real

## Seguridad en GitHub
- [ ] Activar Secret scanning, Push protection y Dependabot alerts en Settings → Code security

## Proyectos en curso (revisar con el equipo)
- [ ] Memoria Lonko Kilapan: las fechas del sitio de descarga (16 nov–4 dic) son estimadas, el PDF no las da. La publicación llega al 11 dic y la entrega cargada es el 28 nov: decidir cuál manda
- [ ] Memoria Lonko Kilapan: completar lo "por definir" del PDF (título, apellido del responsable, N° de propuestas y rondas de portada, costo del hosting, condiciones de pago, cantidad de imágenes)
- [ ] Robles Camper: las tareas tienen fechas reales desde el lunes 26 oct; si cambia el inicio acordado, mover las barras o usar "Inicio referencial" solo para simular
- [ ] Probar en producción el Cronograma (arrastrar barras, diálogo, filtros), Validación y entrega y el modal de Archivos: aún no se verificaron en navegador

- [x] Cronograma: Exportar/Importar JSON de tareas (actualiza por id, agrega nuevas, no borra). Lógica probada con script; falta probar en navegador con sesión

- [x] Responsive: menú off-canvas en móvil, riel de íconos en tablet, tabla de Proyectos como tarjetas, Kanban apilado, pestañas del proyecto en cuadrícula, modal de actividad con márgenes, objetivos táctiles de 44 px
- [x] Lista del cronograma: subtareas (checklist) con progreso y casillas bajo cada tarea
- [x] Gantt: cuadrícula que crece con los días y columna "Hoy" que se mueve sola
- [ ] Probar en navegador con sesión (celular real o 375 px y 800 px): menú lateral, tarjetas de Proyectos, Gantt hasta el último día, columna Hoy, subtareas y modal de actividad. Nada de lo anterior se verificó en pantalla
- [ ] Reordenar etapas en la Lista no funciona con el dedo (arrastre HTML5): agregar botones subir/bajar
- [ ] Hay una versión nueva de la skill Impeccable (v4.8.0, instalada 4.5.2): actualizar con `npx impeccable update` en una sesión nueva

## Siguiente feature
- [ ] F4: CRM relacional (clientes, contactos, oportunidades por etapa, actividades), con ODD (gentle-ai)

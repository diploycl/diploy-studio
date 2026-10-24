export type EmailTemplate = { id: string; service: string; name: string; subject: string; body: string };

export type Recipient = { name?: string; contact?: string };

// Bodies are plain text; {{nombre}}, {{empresa}} and {{firma}} are replaced per recipient.
export const templates: EmailTemplate[] = [
  {
    id: 'branding',
    service: 'Branding',
    name: 'Branding: identidad de marca',
    subject: '{{empresa}}, ¿tu marca cuenta lo que hacen?',
    body: `Hola {{nombre}},

Somos Diploy, un estudio creativo de dos miradas y una idea. Te escribimos porque creemos que {{empresa}} tiene una historia que merece verse tan bien como se vive.

Diseñamos identidades de marca completas:
- Logotipo y sistema visual (colores, tipografías, iconografía)
- Manual de marca para usarla con coherencia en todos lados
- Aplicaciones: papelería, redes sociales, packaging y señalética

Partimos con una conversación para entender quiénes son, a quién le hablan y hacia dónde van. De ahí sale una propuesta pensada para ustedes, no una plantilla.

¿Te parece si agendamos 20 minutos esta semana para conversarlo?

{{firma}}`,
  },
  {
    id: 'editorial',
    service: 'Editorial',
    name: 'Editorial: libros y publicaciones',
    subject: 'Diseño editorial para {{empresa}}',
    body: `Hola {{nombre}},

En Diploy acompañamos proyectos editoriales de principio a fin: desde que llega el manuscrito hasta que el archivo está listo para imprenta o formato digital.

Podemos ayudarte con:
- Diseño de portada e interiores
- Maquetación y diagramación de libros, revistas, catálogos y memorias
- Corrección de pruebas y preparación de archivos para impresión y ebook

Trabajamos por etapas claras, con revisiones en cada paso, para que siempre sepas en qué va tu publicación.

Si tienes un proyecto en mente, cuéntanos y te enviamos una propuesta sin compromiso.

{{firma}}`,
  },
  {
    id: 'ux-ui',
    service: 'UX/UI',
    name: 'UX/UI: productos digitales',
    subject: '{{empresa}}: interfaces que la gente disfruta usar',
    body: `Hola {{nombre}},

Te escribimos desde Diploy. Diseñamos experiencias digitales que se entienden a la primera y que hacen que los usuarios vuelvan.

Lo que hacemos en UX/UI:
- Investigación de usuarios y arquitectura de información
- Wireframes y prototipos navegables para validar antes de desarrollar
- Diseño de interfaces y sistemas de diseño listos para tu equipo de desarrollo

Si {{empresa}} tiene una app, una plataforma o un sitio que podría funcionar mejor, nos encantaría revisarlo contigo y proponerte mejoras concretas.

¿Coordinamos una llamada corta?

{{firma}}`,
  },
  {
    id: 'web',
    service: 'Desarrollo Web',
    name: 'Desarrollo Web: sitios a medida',
    subject: 'Un sitio web a la altura de {{empresa}}',
    body: `Hola {{nombre}},

En Diploy diseñamos y desarrollamos sitios web rápidos, seguros y fáciles de administrar.

Te podemos ayudar con:
- Sitios corporativos, landing pages y portafolios
- Tiendas online y formularios conectados a tus herramientas
- Optimización de velocidad, SEO básico y adaptación a celulares

Nos encargamos de todo: diseño, desarrollo, publicación y soporte después del lanzamiento, para que tú te enfoques en tu negocio.

Si quieres renovar tu sitio o partir uno desde cero, respóndenos este correo y te contamos cómo trabajamos.

{{firma}}`,
  },
  {
    id: 'marketing',
    service: 'Marketing',
    name: 'Marketing: contenido y redes',
    subject: 'Ideas para hacer crecer a {{empresa}}',
    body: `Hola {{nombre}},

Somos Diploy. Creamos contenido y estrategias de marketing que conectan marcas con las personas correctas.

Algunas cosas en las que podemos apoyar a {{empresa}}:
- Estrategia y calendario de contenidos para redes sociales
- Diseño de piezas gráficas, carruseles y campañas
- Newsletters y material para lanzamientos o promociones

Siempre partimos de tus objetivos y medimos resultados para ir ajustando.

¿Te gustaría que te preparemos una propuesta con ideas para los próximos meses?

{{firma}}`,
  },
  {
    id: 'seguimiento',
    service: 'General',
    name: 'Seguimiento',
    subject: 'Retomando nuestra conversación',
    body: `Hola {{nombre}},

Te escribimos para retomar nuestra conversación sobre {{empresa}}. Sabemos que los días se llenan rápido, así que queríamos saber si sigue en pie la idea y si tienes alguna duda sobre nuestra propuesta.

Quedamos atentos para coordinar una reunión o ajustar lo que necesites.

{{firma}}`,
  },
];

export const unsubscribeNote =
  'Si no quieres recibir más correos de Diploy, responde a este mensaje con la palabra BAJA y no te escribiremos más.';

export function fillTemplate(text: string, recipient: Recipient, signature: string) {
  const contact = recipient.contact?.trim();
  const values: Record<string, string> = {
    nombre: contact ? contact.split(/\s+/)[0] : recipient.name?.trim() || '',
    empresa: recipient.name?.trim() || 'tu empresa',
    firma: signature,
  };
  return text.replace(/\{\{\s*(nombre|empresa|firma)\s*\}\}/g, (_, key: string) => values[key]);
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Renders a personalized plain-text body into branded HTML. All user text is escaped.
export function renderEmail(body: string) {
  const text = `${body.trim()}\n\n--\n${unsubscribeNote}`;
  const paragraphs = body
    .trim()
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 16px">${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('');
  const html = `<!doctype html><html lang="es"><body style="margin:0;background:#f4f2ed;padding:24px 12px;font-family:'IBM Plex Mono',Menlo,Consolas,monospace;color:#111">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #d9d6cf">
<tr><td style="padding:24px 28px;background:#0a0a0a;color:#f4f2ed;font-size:20px;font-weight:600;letter-spacing:-1px"><span style="color:#f5a2fa">●</span><span style="color:#8061ff">●</span> diploy._<span style="font-size:11px;color:#a0a09a;font-weight:400"> / studio</span></td></tr>
<tr><td style="padding:28px;font-size:14px;line-height:1.6">${paragraphs}</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #d9d6cf;font-size:11px;color:#5f5e58">${escapeHtml(unsubscribeNote)}</td></tr>
</table></td></tr></table></body></html>`;
  return { html, text };
}

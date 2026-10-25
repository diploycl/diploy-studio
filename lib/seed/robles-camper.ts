// Datos del plan de trabajo de Robles Camper (propuesta Diploy, 21 de octubre de 2026).
export const ROBLES_TEMPLATE_ID='seed-robles-camper';
export const robles:any={
 "name": "Robles Camper: sitio web (14 días hábiles)",
 "stages": [
  {
   "name": "Revisión y construcción",
   "range": "Etapa 01 · Días 1 a 7",
   "description": "Accesos, respaldo, estilos globales, catálogo y primeras configuraciones de pago y contenido."
  },
  {
   "name": "Validación y entrega",
   "range": "Etapa 02 · Días 8 a 14",
   "description": "Finalización de plantillas, pruebas integrales, manuales y revisión final junto al cliente."
  }
 ],
 "areas": [
  {
   "name": "Identidad visual y navegación",
   "description": "Estilos globales: Configuraremos Anton en títulos principales y Montserrat en subtítulos, lectura, precios, botones y formularios. Los estilos comunes permitirán realizar correcciones sin repetir ajustes página por página.\n\nIdentidad de Robles Camper: Se conserva el logotipo original, el verde #126140 y los fondos claros. Se definirán tamaños, márgenes, interlineados, alturas de botones y separación entre secciones.\n\nAplicación completa: Revisión de encabezado, menú, pie, formularios, fichas, fuentes y jerarquías en computador, tablet y móvil. Se validarán enlaces, botones y contenido de todas las secciones.",
   "priority": "Normal"
  },
  {
   "name": "Tienda y medios de pago",
   "description": "Catálogo y proceso de compra: Revisaremos precios, stock, productos agotados, categorías, filtros, cantidades y totales. Se corregirá el acceso a los productos de Repuestos.\n\nWebpay y transferencia: Configuración de Webpay con los datos de comercio autorizados y pruebas antes de publicar. Transferencia con instrucciones, identificación del pedido y confirmación manual.\n\nDocumentos y correos: Selección de boleta o factura y recopilación de sus datos. Emisión manual fuera del sitio. Configuración y pruebas de confirmaciones, estados del pedido y pagos fallidos. La clasificación de los mensajes depende también del proveedor de correo.",
   "priority": "Normal"
  },
  {
   "name": "Blog y contenidos autoadministrables",
   "description": "Listado y artículo: Listado con introducción, imagen, título, subtítulo, extracto, fecha y nombre del autor, acceso al artículo y paginación o carga adicional. Plantilla individual con destacada, categoría, párrafos, subtítulos, listas, imágenes y enlaces.\n\nEdición sencilla: Publicación desde WordPress sin modificar Elementor ni las plantillas. Se entregarán dos entradas de ejemplo e instrucciones.\n\nDifusión: Opciones para compartir en Facebook y LinkedIn y contacto con ventas por WhatsApp. Para Instagram y TikTok se definirá una alternativa compatible, como copiar el enlace. Artículos relacionados sujetos a la funcionalidad existente.",
   "priority": "Normal"
  },
  {
   "name": "Servicios, Camping y contacto",
   "description": "Servicios coherentes: Corregir la ficha de sistemas de agua y normalizar la jerarquía de los servicios, sus imágenes, descripciones y botones, manteniendo los textos comerciales aprobados.\n\nCamping reutilizable: Crear una plantilla que presente automáticamente los datos cargados en WordPress, sin diseñar cada ficha desde cero. Validar enlaces a productos y categorías.\n\nContacto ordenado: Presentar datos de empresa y sucursales con claridad. Validar correos @roblescamper.com autorizados, formularios y números de WhatsApp de ventas y servicio técnico.",
   "priority": "Normal"
  },
  {
   "name": "Gestión de vehículos vendidos",
   "description": "Estado visible: Etiqueta roja vertical VENDIDA en el costado derecho de la imagen, conservando la fotografía. Aplicación en las tarjetas del catálogo y la ficha individual.\n\nAdministración desde WordPress: Mecanismo sencillo para marcar casas rodantes y motorhomes como vendidos. Se retirará la opción de cotizar en las unidades vendidas y se permitirá conservar, mostrar u ocultar sus fichas históricas.",
   "priority": "Normal"
  },
  {
   "name": "Calidad, seguridad y documentación",
   "description": "Revisión técnica: SEO básico, indexación, enlaces permanentes y sitemap. Revisión de usuarios, permisos, respaldo previo, actualizaciones e imágenes. No se comprometen métricas de rendimiento sin medición.\n\nEntrega y capacitación: Pruebas integrales, corrección de incidencias críticas, listado de cambios y manual PDF por perfiles. Revisión de cierre con Robles Camper y registro de pendientes.",
   "priority": "Normal"
  }
 ],
 "tasks": [
  {
   "name": "Reunión de inicio y alcance",
   "description": "Confirmar alcance, responsables, canales de coordinación y accesos necesarios para intervenir el sitio.",
   "output": "Alcance y responsables confirmados.",
   "who": "Diploy + Robles Camper",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Coordinación",
   "stageIdx": 0,
   "startOff": 0,
   "dueOff": 0
  },
  {
   "name": "Respaldo y revisión de soporte",
   "description": "Confirmar el respaldo previo a la intervención y revisar las condiciones de garantía o soporte vigente.",
   "output": "Respaldo verificado y condiciones de soporte identificadas.",
   "who": "Diploy",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Coordinación",
   "stageIdx": 0,
   "startOff": 0,
   "dueOff": 0
  },
  {
   "name": "Estilos globales y diseño adaptable",
   "description": "Configurar Anton y Montserrat, colores, tamaños, espaciados y componentes globales. Verificar la jerarquía en escritorio, tablet y móvil.",
   "output": "Estilos coherentes en encabezado, menú, pie, formularios y plantillas.",
   "who": "Diploy",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Diseño",
   "stageIdx": 0,
   "startOff": 0,
   "dueOff": 3
  },
  {
   "name": "Auditoría del carrito y Webpay",
   "description": "Revisar carrito, finalización de compra, plugin y estado de la integración de Webpay.",
   "output": "Diagnóstico del proceso de compra y correcciones necesarias.",
   "who": "Diploy",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Tienda y pagos",
   "stageIdx": 0,
   "startOff": 0,
   "dueOff": 2
  },
  {
   "name": "Configuración de Webpay",
   "description": "Confirmar los datos del comercio y el entorno autorizado; completar la integración y comprobar el retorno al sitio. La habilitación está sujeta a la validación de Transbank.",
   "output": "Webpay configurado para su validación y pruebas autorizadas.",
   "who": "Diploy + Administración",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Tienda y pagos",
   "stageIdx": 0,
   "startOff": 1,
   "dueOff": 9
  },
  {
   "name": "Transferencia bancaria",
   "description": "Configurar instrucciones de transferencia, identificación de pedido y estado pendiente hasta confirmar manualmente el abono.",
   "output": "Flujo de transferencia documentado y configurado.",
   "who": "Diploy + Administración",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Tienda y pagos",
   "stageIdx": 0,
   "startOff": 1,
   "dueOff": 7
  },
  {
   "name": "Solicitud de boleta o factura",
   "description": "Definir la selección y los campos necesarios, incluyendo RUT y razón social cuando corresponda. La emisión será manual mediante el SII y el envío por correo.",
   "output": "Datos del documento recopilados y proceso de emisión manual definido.",
   "who": "Administración o contador + Diploy",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Tienda y pagos",
   "stageIdx": 0,
   "startOff": 0,
   "dueOff": 3
  },
  {
   "name": "Productos, stock y filtros",
   "description": "Revisar precios, disponibilidad, agotados, categorías, filtros, cantidades y totales del carrito.",
   "output": "Catálogo revisado y principales incidencias corregidas.",
   "who": "Diploy + Contenidos",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Catálogo",
   "stageIdx": 0,
   "startOff": 1,
   "dueOff": 8
  },
  {
   "name": "Corrección de Repuestos",
   "description": "Restablecer la apertura de los productos y validar enlaces, botones e información de las fichas.",
   "output": "Productos accesibles desde la sección Repuestos.",
   "who": "Diploy",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Páginas",
   "stageIdx": 0,
   "startOff": 1,
   "dueOff": 7
  },
  {
   "name": "Normalización de Servicios",
   "description": "Unificar tipografía, interlineado, espaciado e imágenes. Corregir la ficha de instalación y mantención de sistemas de agua y validar botones de consulta.",
   "output": "Servicios consistentes con el diseño del sitio.",
   "who": "Diploy",
   "priority": "Media",
   "owner": "Ambos",
   "area": "Páginas",
   "stageIdx": 0,
   "startOff": 2,
   "dueOff": 8
  },
  {
   "name": "Plantilla reutilizable de Camping",
   "description": "Crear una plantilla que presente los datos ingresados desde WordPress sin diseñar una nueva página para cada carga. Revisar categorías y enlaces.",
   "output": "Plantilla de Camping reutilizable y preparada para nuevos contenidos.",
   "who": "Diploy",
   "priority": "Media",
   "owner": "Ambos",
   "area": "Contenidos",
   "stageIdx": 0,
   "startOff": 2,
   "dueOff": 9
  },
  {
   "name": "Plantillas de Blog",
   "description": "Diseñar el listado y la publicación individual con autor, fechas, categoría y contenido estructurado. Permitir edición sin modificar la plantilla en Elementor.",
   "output": "Plantillas editoriales implementadas.",
   "who": "Diploy",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Contenidos",
   "stageIdx": 0,
   "startOff": 1,
   "dueOff": 11
  },
  {
   "name": "Dos artículos de ejemplo y guía",
   "description": "Publicar dos entradas de ejemplo y explicar el procedimiento para agregar nuevas publicaciones.",
   "output": "Dos publicaciones de demostración e instrucciones de edición.",
   "who": "Diploy + Contenidos",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Contenidos",
   "stageIdx": 1,
   "startOff": 10,
   "dueOff": 14
  },
  {
   "name": "Contacto, formularios y correos",
   "description": "Ordenar datos de empresa y sucursales. Revisar formularios, cuentas autorizadas y WhatsApp de ventas o servicio técnico.",
   "output": "Información de contacto clara y formularios verificados.",
   "who": "Diploy + Administración",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Páginas",
   "stageIdx": 0,
   "startOff": 1,
   "dueOff": 8
  },
  {
   "name": "Estado de vehículos vendidos",
   "description": "Añadir la etiqueta roja vertical VENDIDA al costado derecho de las imágenes, en catálogo y ficha. Deshabilitar la cotización en unidades vendidas y permitir mostrar u ocultar su registro histórico.",
   "output": "Estado vendido administrable desde WordPress.",
   "who": "Diploy",
   "priority": "Media",
   "owner": "Ambos",
   "area": "Catálogo",
   "stageIdx": 0,
   "startOff": 4,
   "dueOff": 11
  },
  {
   "name": "Evaluación de Bluexpress",
   "description": "Revisar cuenta, pesos, medidas, volumen, cobertura y tarifas. Confirmar con administración la decisión y el alcance antes de habilitar despachos.",
   "output": "Decisión documentada; integración sujeta al alcance acordado.",
   "who": "Administración + Diploy",
   "priority": "Media",
   "owner": "Ambos",
   "area": "Despachos",
   "stageIdx": 0,
   "startOff": 0,
   "dueOff": 3
  },
  {
   "name": "SEO básico e indexación",
   "description": "Revisar títulos, descripciones, enlaces permanentes, sitemap e indexación de páginas.",
   "output": "Revisión SEO básica y registro de ajustes.",
   "who": "Diploy",
   "priority": "Media",
   "owner": "Ambos",
   "area": "Revisión técnica",
   "stageIdx": 1,
   "startOff": 9,
   "dueOff": 14
  },
  {
   "name": "Seguridad y rendimiento",
   "description": "Revisar usuarios individuales, permisos, respaldos y actualizaciones controladas. Optimizar imágenes y comprobar la carga en móvil y tablet.",
   "output": "Incidencias corregidas o registradas para seguimiento.",
   "who": "Diploy",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Revisión técnica",
   "stageIdx": 0,
   "startOff": 0,
   "dueOff": 14
  },
  {
   "name": "Políticas e información comercial",
   "description": "Revisar privacidad, condiciones de compra, despacho, cambios y devoluciones y datos de empresa. La aprobación corresponde a Robles Camper y su asesoría.",
   "output": "Textos revisados y aprobados por el cliente.",
   "who": "Administración + asesoría si aplica",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Legal y operación",
   "stageIdx": 0,
   "startOff": 1,
   "dueOff": 9
  },
  {
   "name": "Pruebas integrales",
   "description": "Probar navegación, filtros, enlaces, formularios, pedidos y pagos en móvil y escritorio. Revisar Chrome, Firefox y Safari en las versiones acordadas.",
   "output": "Registro de pruebas con resultados e incidencias.",
   "who": "Diploy + Robles Camper",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Validación y entrega",
   "stageIdx": 1,
   "startOff": 11,
   "dueOff": 16
  },
  {
   "name": "Manual PDF por perfiles",
   "description": "Preparar una guía para desarrollador, vendedor y administrador: artículos, Camping, productos, pedidos y vehículos vendidos.",
   "output": "Manual de uso y administración entregado.",
   "who": "Diploy",
   "priority": "Media",
   "owner": "Ambos",
   "area": "Validación y entrega",
   "stageIdx": 1,
   "startOff": 10,
   "dueOff": 17
  },
  {
   "name": "Correcciones y aceptación",
   "description": "Resolver incidencias críticas, entregar el listado de cambios y revisar el sitio junto al cliente. Registrar pendientes y condiciones de cierre.",
   "output": "Revisión final y constancia de aceptación o pendientes.",
   "who": "Diploy + Robles Camper",
   "priority": "Alta",
   "owner": "Ambos",
   "area": "Validación y entrega",
   "stageIdx": 1,
   "startOff": 16,
   "dueOff": 17
  }
 ],
 "validation": [
  {
   "name": "Pruebas de funcionamiento",
   "description": "Navegación, filtros, formularios, enlaces y compras. Revisión en móvil, tablet y computador, y en Chrome, Firefox y Safari dentro de las versiones acordadas.",
   "checklist": [
    {
     "name": "Navegación y enlaces"
    },
    {
     "name": "Filtros y formularios"
    },
    {
     "name": "Compras"
    },
    {
     "name": "Móvil, tablet y computador"
    },
    {
     "name": "Chrome, Firefox y Safari"
    }
   ]
  },
  {
   "name": "Pagos y pedidos",
   "description": "Pruebas de respuesta de Webpay, retorno al sitio, pagos aprobados y fallidos y estados del pedido. Verificación de transferencia y correos de confirmación.",
   "checklist": [
    {
     "name": "Pagos aprobados y fallidos"
    },
    {
     "name": "Retorno al sitio"
    },
    {
     "name": "Estados del pedido"
    },
    {
     "name": "Verificación de transferencia"
    },
    {
     "name": "Correos de confirmación"
    }
   ]
  },
  {
   "name": "Manual y registro de cambios",
   "description": "Manual PDF para desarrollador, vendedor y administrador. Instrucciones para artículos, Camping, productos, pedidos y vehículos vendidos, junto al listado de cambios y pendientes.",
   "checklist": [
    {
     "name": "Manual para desarrollador"
    },
    {
     "name": "Manual para vendedor"
    },
    {
     "name": "Manual para administrador"
    },
    {
     "name": "Listado de cambios y pendientes"
    }
   ]
  },
  {
   "name": "Revisión técnica",
   "description": "Usuarios y permisos, respaldos y actualizaciones controladas. Optimización básica de imágenes y revisión de títulos, descripciones, enlaces permanentes, indexación y sitemap.",
   "checklist": [
    {
     "name": "Usuarios y permisos"
    },
    {
     "name": "Respaldos"
    },
    {
     "name": "Actualizaciones controladas"
    },
    {
     "name": "Optimización básica de imágenes"
    },
    {
     "name": "SEO: títulos, descripciones, enlaces permanentes, indexación y sitemap"
    }
   ]
  }
 ],
 "duties": [
  {
   "who": "Diploy",
   "text": "Implementar las mejoras, informar avances y dependencias, realizar las pruebas y entregar la documentación acordada."
  },
  {
   "who": "Cliente",
   "text": "Facilitar accesos y datos comerciales; aprobar contenidos y políticas con asesoría cuando corresponda; emitir documentos tributarios y confirmar transferencias."
  }
 ],
 "faq": [
  {
   "name": "¿Cuándo comienza el plazo?",
   "notes": "Los catorce días hábiles se cuentan desde la fecha de inicio acordada, una vez disponibles los accesos, la información y las aprobaciones necesarias. Si una validación externa o un cambio de alcance afecta el calendario, Diploy informará su impacto y acordará el ajuste con Robles Camper."
  },
  {
   "name": "¿Qué requiere Webpay?",
   "notes": "La cuenta de comercio, las credenciales y el entorno autorizado por Robles Camper. La habilitación depende también de las validaciones de Transbank. Flow o Mercado Pago se evalúan por separado si se requiere un medio adicional."
  },
  {
   "name": "¿Cómo se emitirán boletas y facturas?",
   "notes": "El sitio recopilará la selección del documento, RUT, razón social y otros datos necesarios. Administración o contador emitirá el documento manualmente mediante el SII y lo enviará por correo; el formulario no realiza la emisión tributaria."
  },
  {
   "name": "¿Se habilitarán despachos con Bluexpress?",
   "notes": "Primero se evaluarán la cuenta del cliente, los pesos, las medidas, el volumen, la cobertura y las tarifas. Su habilitación se decidirá con administración al confirmar el alcance. No se presenta como una integración ya comprometida."
  },
  {
   "name": "El siguiente paso",
   "notes": "Confirmar el alcance, designar a la persona de contacto y reunir los accesos para acordar la fecha de inicio."
  }
 ]
};

const DAY=864e5;
const dstr=(n:number)=>new Date(n*DAY).toISOString().slice(0,10);
export function nextMonday(today:string){let d=Date.parse(today+'T00:00:00Z')/DAY;do d++;while(new Date(d*DAY).getUTCDay()!==1);return dstr(d)}

/** Cliente, plantilla, proyecto y cotización de Robles Camper listos para insertar en el workspace. */
export function seedRobles(uid:()=>string,today:string){
  const start=nextMonday(today),s0=Date.parse(start+'T00:00:00Z')/DAY,at=(o:number)=>dstr(s0+o);
  const client={id:uid(),name:'Robles Camper',contact:'',email:'',phone:'',website:'',notes:'Casas rodantes, motorhomes, repuestos y servicios. Plan de trabajo de 14 días hábiles.'};
  const template={id:ROBLES_TEMPLATE_ID,...robles};
  const stages=robles.stages.map((x:any)=>({...x,id:uid()}));
  const id=uid();
  const project={id,name:'Robles Camper: sitio web',category:'Desarrollo Web',owner:'Ambos',status:'Cotizado',client:client.id,start,due:at(Math.max(...robles.tasks.map((t:any)=>t.dueOff))),budget:300000,
    description:'Plan de trabajo para completar el sitio de Robles Camper, unificar su presentación y habilitar las compras en línea. Diploy coordina la implementación, las pruebas y la documentación; Robles Camper entrega los accesos y valida contenidos y decisiones comerciales.\n\nPunto de partida: Inicio, Nosotros, Casas Rodantes y Motorhome tienen accesos operativos. Lo pendiente se concentra en Repuestos, Servicios, Camping, Blog, Contacto y los medios de pago. El estado técnico se verifica al iniciar.',
    stages,references:[],deliveries:[],decisions:[],files:[],
    areas:robles.areas.map((x:any)=>({...x,id:uid(),status:'Pendiente'})),
    validation:robles.validation.map((v:any)=>({...v,id:uid(),status:'Pendiente',checklist:v.checklist.map((c:any)=>({name:c.name,done:false}))})),
    duties:robles.duties.map((x:any)=>({...x,id:uid()})),
    faq:robles.faq.map((x:any)=>({...x,id:uid()})),
    tasks:robles.tasks.map((t:any)=>({id:uid(),name:t.name,description:t.description,output:t.output,who:t.who,priority:t.priority,owner:t.owner,area:t.area,stage:stages[t.stageIdx].id,status:'Pendiente',checklist:[],comments:[],start:at(t.startOff),due:at(t.dueOff)}))};
  const items=[{name:'Implementación del sitio: 22 actividades, pruebas de funcionamiento, manual de uso y revisión final (14 días hábiles)',qty:1,price:300000}];
  const quote={id:uid(),name:'Propuesta de implementación Robles Camper',project:id,status:'Enviada',discount:0,iva:true,items,version:1,
    notes:'Valor en pesos chilenos más IVA; se emite factura por el servicio. Medios de pago o integraciones adicionales, como Flow, Mercado Pago o Bluexpress, se evalúan y cotizan por separado.',
    history:[{version:1,date:new Date().toISOString(),total:357000,items,discount:0,iva:true,status:'Enviada'}]};
  return {client,template,project,quote};
}

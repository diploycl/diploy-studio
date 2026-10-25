// Fases 2 (Diseño editorial) y 3 (Publicación digital) de la cotización del libro de memoria
// de Longko Kilapang (1 de octubre de 2026). La Fase 1, corrección de textos, es de Constanza Mori.
// Las fechas salen del apartado PLAZOS; las del sitio de descarga son estimadas porque la cotización no las indica.

const DESCRIPTION=`Libro de memoria de la organización Longko Kilapang, con entrega proyectada para su aniversario en noviembre de 2026. Diploy se encarga de la Fase 2 (diseño editorial: maqueta digital, maqueta impresa y portada) y de la Fase 3 (sitio web de descarga). La Fase 1, corrección de textos, está a cargo de Constanza Mori.

Versión digital con el contenido completo (179 páginas de manuscrito: Primera parte 79 y Segunda parte 100). Versión impresa solo con la Primera parte (79 páginas). Se prioriza la Primera parte para llegar con el libro impreso al aniversario.

Plazos de la cotización: envío a imprenta desde el 12 de noviembre; sitio web y libro digital publicados hasta el 11 de diciembre.

Por definir: título del manuscrito, apellido del responsable (Julio), cantidad de propuestas y rondas de ajuste de la portada, costo anual del hosting, condiciones de pago y cantidad final de imágenes (puede ajustar el valor de la Fase 2). La impresión se cotiza aparte con una imprenta.`;

const AREAS=[
 ['Maqueta digital','Libro completo (las dos partes). Definición de grilla, tipografías, jerarquía de títulos y estilos de página. Composición con imágenes, tablas y notas, índice navegable y marcadores. Se entrega en PDF preparado para lectura en pantalla y descarga web.'],
 ['Maqueta impresa','Solo la Primera parte. Adaptación al formato de imprenta: tamaño final, márgenes y sangrado, imágenes en alta resolución, perfil de color, paginación propia y archivos finales según las especificaciones de la imprenta.'],
 ['Diseño de portada','Portada y contraportada vinculadas a la identidad visual de Longko Kilapang (logo, tipografía, color y elementos gráficos) y diseño del lomo para la versión impresa. Una ilustración o fotografía encargada especialmente se cotiza aparte.'],
 ['Sitio web de descarga','Landing page para difundir el libro y descargar gratis su versión digital: presentación del libro y de la organización, portada, índice o resumen, botón de descarga del PDF, créditos editoriales y datos de contacto. Adaptada a celulares y computadores, con la línea gráfica del libro. No incluye dominio ni hosting.']
];

// [nombre, área, participantes, owner, prioridad, etapa, inicio, fin, descripción, entregable]
const TASKS:any[][]=[
 ['Recibir Primera parte corregida y aprobada','Coordinación','Ediciones Verso + organización','Cliente','Alta','s0','2026-10-19','2026-10-23','La organización revisa y aprueba la Primera parte (79 páginas) tras la corrección de estilo y ortotipográfica. Es la condición para comenzar a diagramar.','Primera parte aprobada en Word.'],
 ['Recibir imágenes con pies de foto y créditos','Coordinación','Ediciones Verso + organización','Cliente','Alta','s0','2026-10-19','2026-10-26','Las imágenes se envían por separado, en alta resolución, con sus pies de foto y créditos. La cantidad final puede ajustar el valor de la Fase 2.','Carpeta de imágenes completa.'],
 ['Recibir Segunda parte corregida','Coordinación','Ediciones Verso + organización','Cliente','Media','s0','2026-10-19','2026-11-06','La Segunda parte (100 páginas) se corrige hasta el 6 de noviembre y es la base de la maqueta digital completa.','Segunda parte corregida lista para diagramar.'],
 ['Brief de identidad visual y especificaciones de imprenta','Diseño de portada','Diploy + Ediciones Verso','Ambos','Alta','s1','2026-10-26','2026-10-27','Reunir el logo y la línea gráfica de Longko Kilapang y definir con la imprenta el tamaño final, el sangrado y el perfil de color.','Brief y especificaciones de imprenta definidos.'],
 ['Propuestas de portada','Diseño de portada','Diploy','Ambos','Alta','s4','2026-10-28','2026-11-03','Portada y contraportada trabajadas con tipografía, color y elementos gráficos ligados a la identidad de Longko Kilapang. La cantidad de propuestas iniciales está por definir.','Propuestas iniciales de portada.'],
 ['Ajustes de portada y diseño del lomo','Diseño de portada','Diploy + organización','Ambos','Alta','s4','2026-11-03','2026-11-06','Rondas de ajuste sobre la propuesta elegida (cantidad por definir) y diseño del lomo para la versión impresa.','Portada, contraportada y lomo aprobados.'],
 ['Maqueta impresa de la Primera parte','Maqueta impresa','Diploy','Ambos','Alta','s5','2026-10-26','2026-11-06','Diagramación de la Primera parte en formato de imprenta: tamaño final, márgenes y sangrado, imágenes en alta resolución, perfil de color y paginación propia.','Maqueta impresa lista para corrección de pruebas.'],
 ['Corrección de pruebas y aprobación de la maqueta impresa','Maqueta impresa','Constanza Mori + Diploy + organización','Ambos','Alta','s6','2026-11-09','2026-11-11','Corrección de pruebas sobre el PDF diagramado (erratas, cortes de palabra, viudas y huérfanas, paginación, índice, pies de imagen y créditos) y aprobación de la organización.','Maqueta impresa aprobada.'],
 ['Correcciones finales de la maqueta impresa','Maqueta impresa','Diploy','Ambos','Alta','s7','2026-11-11','2026-11-11','Aplicar las correcciones de la prueba y las observaciones de la organización.','Maqueta impresa con correcciones aplicadas.'],
 ['Archivos finales y envío a imprenta','Maqueta impresa','Diploy + organización','Ambos','Alta','s8','2026-11-12','2026-11-13','Archivos finales según las especificaciones de la imprenta (impresión digital). La impresión se cotiza directamente con la imprenta, según papel, tamaño, imágenes y ejemplares.','Archivos entregados a la imprenta.'],
 ['Maqueta digital del libro completo','Maqueta digital','Diploy','Ambos','Alta','s5','2026-11-09','2026-11-27','Composición de las dos partes con grilla, tipografías, jerarquía de títulos, imágenes, tablas y notas, más índice navegable y marcadores.','PDF para lectura en pantalla y descarga web.'],
 ['Corrección de pruebas y aprobación de la versión digital','Maqueta digital','Constanza Mori + Diploy + organización','Ambos','Alta','s6','2026-11-30','2026-12-04','Revisión final del PDF digital completo y aprobación de la organización antes de publicar.','Versión digital aprobada.'],
 ['Correcciones finales de la versión digital','Maqueta digital','Diploy','Ambos','Media','s7','2026-12-04','2026-12-07','Aplicar las correcciones de la prueba digital y generar el PDF definitivo.','PDF definitivo del libro digital.'],
 ['Contenidos y estructura del sitio de descarga','Sitio web de descarga','Diploy + Ediciones Verso','Ambos','Media','s5','2026-11-16','2026-11-20','Presentación del libro y de la organización, índice o resumen de contenidos, créditos editoriales y datos de contacto. Fechas estimadas: la cotización no las indica.','Estructura y textos del sitio definidos.'],
 ['Diseño del sitio de descarga','Sitio web de descarga','Diploy','Ambos','Media','s5','2026-11-23','2026-11-27','Landing adaptable a celulares y computadores, siguiendo la línea gráfica del libro. Fechas estimadas.','Diseño del sitio aprobado.'],
 ['Construcción del sitio y botón de descarga','Sitio web de descarga','Diploy','Ambos','Media','s8','2026-11-30','2026-12-04','Puesta en línea del sitio con el botón de descarga del PDF. Si la organización ya tiene un sitio web, la página puede integrarse a él. Fechas estimadas.','Sitio funcionando con descarga del PDF.'],
 ['Dominio y hosting','Sitio web de descarga','Organización','Cliente','Media','s8','2026-11-16','2026-11-27','El dominio y el alojamiento corren por cuenta de la organización, con un costo anual aproximado por definir.','Dominio y hosting disponibles.'],
 ['Publicación del sitio y del libro digital','Sitio web de descarga','Diploy + organización','Ambos','Alta','s9','2026-12-07','2026-12-11','Publicación del sitio web y del libro digital, a más tardar el 11 de diciembre.','Sitio y libro digital publicados.']
];

const VALIDATION:any[][]=[
 ['Maqueta impresa','Primera parte lista para imprenta.',['Tamaño final, márgenes y sangrado','Imágenes en alta resolución','Perfil de color','Paginación propia de la edición','Índice y pies de imagen','Archivos según las especificaciones de la imprenta']],
 ['Maqueta digital','Libro completo para lectura en pantalla.',['PDF liviano para pantalla y descarga web','Índice navegable y marcadores','Imágenes, tablas y notas completas','Correspondencia del índice con la paginación','Viudas, huérfanas y cortes de palabra']],
 ['Sitio de descarga','Landing lista para publicar.',['Se ve bien en celular y computador','Botón de descarga del PDF funciona','Presentación, portada e índice o resumen','Créditos editoriales y datos de contacto','Enlaces y textos revisados']]
];

const DUTIES=[
 ['Diploy','Diseño editorial (maqueta digital, maqueta impresa y portada) y sitio web de descarga, con la línea gráfica del libro.'],
 ['Cliente','Entregar los textos aprobados (Primera y Segunda parte) y las imágenes en alta resolución con pies de foto y créditos; aprobar cada etapa dentro del plazo.'],
 ['Cliente','Dominio, hosting e impresión corren por cuenta de la organización. La corrección de textos (Fase 1) está a cargo de Constanza Mori y debe aprobarse antes de diagramar.']
];

/** Rellena el proyecto "libro" sin pisar lo ya escrito. Devuelve null si ya se cargó o no corresponde. */
export function seedLongko(uid:()=>string,p:any){
  if(!p||p.seeded==='longko')return null;
  const have=new Set((p.tasks||[]).map((t:any)=>String(t.name).trim().toLowerCase()));
  const stageOk=(id:string)=>(p.stages||[]).some((s:any)=>s.id===id);
  const newTasks=TASKS.filter(t=>!have.has(t[0].toLowerCase())&&stageOk(t[5])).map(t=>({id:uid(),name:t[0],area:t[1],who:t[2],owner:t[3],priority:t[4],stage:t[5],start:t[6],due:t[7],description:t[8],output:t[9],status:'Pendiente',checklist:[],comments:[]}));
  return {...p,
    budget:p.budget===''||p.budget==null?649000:p.budget,
    description:p.description?.trim()?p.description:DESCRIPTION,
    tasks:[...(p.tasks||[]),...newTasks],
    areas:p.areas?.length?p.areas:AREAS.map(([name,description])=>({id:uid(),name,description,priority:'Normal',status:'Pendiente'})),
    validation:p.validation?.length?p.validation:VALIDATION.map(([name,description,items])=>({id:uid(),name,description,status:'Pendiente',checklist:items.map((n:string)=>({name:n,done:false}))})),
    duties:p.duties?.length?p.duties:DUTIES.map(([who,text])=>({id:uid(),who,text})),
    seeded:'longko'};
}

export const statuses=['Por cotizar','Cotizado','Aprobado','En proceso','En revisión','Finalizado','Archivado'];
export const taskStatuses=['Pendiente','En curso','Bloqueada','En revisión','Completada'];
export const editorial=['Recepción del manuscrito','Brief editorial','Investigación visual','Moodboard y referencias','Propuesta de diseño','Maquetación y edición','Revisión de pruebas','Correcciones finales','Preparación de archivos para impresión y digital','Entrega y cierre'];
export const stages=['Brief y levantamiento','Investigación y referencias','Moodboard','Propuesta creativa','Producción y desarrollo','Revisión del cliente','Correcciones','Entrega final','Cierre y pago'];
export const initialData={projects:[{id:'libro',name:'Edición de libro',category:'Editorial',owner:'Ambos',status:'En proceso',client:'',start:'',due:'',budget:'',description:'',stages:editorial.map((name,i)=>({id:'s'+i,name})),tasks:[],references:[],deliveries:[],decisions:[]}],clients:[],quotes:[],payments:[],expenses:[],activity:[]};
export const money=(n:number|string)=>new Intl.NumberFormat('es-CL',{style:'currency',currency:'CLP',maximumFractionDigits:0}).format(Number(n)||0);
export const quoteTotal=(q:any)=>Math.round(Math.max(0,q.items.reduce((sum:number,i:any)=>sum+Number(i.qty)*Number(i.price),0)-Number(q.discount||0))*(q.iva?1.19:1));

export const CONTACT={whatsapp:'59898907603',email:'SGM.gonzalomartinez@gmail.com',portal:'https://sgm-consulta.pages.dev/?portal=access'};
export const PRODUCTS={automotor:'Seguro automotor',hogar:'Seguro de hogar',viaje:'Viaje y asistencia',vida:'Vida y ahorro',alquiler:'Garantía de alquiler',comercio:'Comercio y empresa',otro:'Otra consulta'};
export function requestedDocuments(product){return product==='automotor'?['foto legible de tu cédula','foto de la libreta de propiedad del vehículo']:product==='alquiler'?['foto legible de tu cédula','los últimos cuatro recibos de sueldo']:['foto legible de tu cédula'];}
export function documentGuidance(product){return 'Para preparar una cotización más ajustada, podés adjuntar '+requestedDocuments(product).join(' y ')+'. Si no los tenés a mano, enviá primero la consulta y completamos la documentación después.'+(product==='alquiler'?' Si no contás con recibos de sueldo, consultanos qué documentación corresponde a tu situación.':'');}
const clean=(value,max=250)=>{const s=String(value??'').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g,'').trim();if(s.length>max)throw Error('La información supera la extensión permitida.');return s;};
export function normalizePhone(value){const s=clean(value,40);if(!/^[+\d().\s-]+$/.test(s))throw Error('Revisá el número de celular.');const digits=s.replace(/\D/g,'');if(digits.length<8||digits.length>15)throw Error('Indicá un celular válido, con código de país si corresponde.');return s;}
export function campaignSource(search=''){const p=new URLSearchParams(search);const allowed=['utm_source','utm_medium','utm_campaign','utm_content'];return Object.fromEntries(allowed.flatMap(k=>{const v=(p.get(k)||'').replace(/[^\p{L}\p{N}_. -]/gu,'').trim().slice(0,70);return v?[[k,v]]:[];}));}
export function makeReference(date=new Date(),uuid=globalThis.crypto.randomUUID()){const day=new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Montevideo',year:'numeric',month:'2-digit',day:'2-digit'}).format(date).replaceAll('-','');return 'SGM-'+day+'-'+uuid.replaceAll('-','').slice(0,8).toUpperCase();}
export function validateDetails(product,details,year=new Date().getFullYear()){
 if(!Object.hasOwn(PRODUCTS,product))throw Error('Elegí el seguro que te interesa.');
 if(product==='automotor'&&details.anio&&(!/^\d{4}$/.test(details.anio)||+details.anio<1900||+details.anio>year+1))throw Error('Revisá el año del vehículo.');
 if(product==='automotor'&&details.edadConductor&&(!/^\d{1,3}$/.test(details.edadConductor)||+details.edadConductor<1||+details.edadConductor>120))throw Error('Revisá la edad del conductor principal.');
 if(product==='viaje'){
  if(!details.fechaSalida||!details.fechaRegreso)throw Error('Completá las fechas del viaje.');
  for(const s of [details.fechaSalida,details.fechaRegreso]){const d=new Date(s+'T12:00:00Z');if(!/^\d{4}-\d{2}-\d{2}$/.test(s)||!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==s)throw Error('Revisá las fechas del viaje.');}
  if(details.fechaRegreso<details.fechaSalida)throw Error('El regreso debe ser el mismo día o después de la salida.');
  if(!/^\d{1,2}$/.test(details.viajeros||'')||+details.viajeros<1||+details.viajeros>50)throw Error('Indicá entre 1 y 50 viajeros.');
 }
 if(product==='vida'&&(!/^\d{1,3}$/.test(details.edad||'')||+details.edad<1||+details.edad>120))throw Error('Revisá la edad.');
 if(product==='alquiler'&&details.cantidadSolicitantes&&(!/^\d{1,2}$/.test(details.cantidadSolicitantes)||+details.cantidadSolicitantes<1))throw Error('Revisá la cantidad de solicitantes.');
 return details;
}
export function buildRequest(input,{reference,source={}}={}){
 const name=clean(input.name,100).replace(/[\r\n]+/g,' '),phone=normalizePhone(input.phone),email=clean(input.email,254),message=clean(input.message,1000);
 if(name.length<3)throw Error('Indicá tu nombre y apellido.');
 if(!Object.hasOwn(PRODUCTS,input.product))throw Error('Elegí el seguro que te interesa.');
 if(input.consent!==true)throw Error('Autorizá el contacto para responder esta consulta.');
 if(!['whatsapp','email','direct'].includes(input.channel))throw Error('Elegí WhatsApp o correo.');
 if(email&&!/^[^\s@<>;,]+@[^\s@<>;,]+\.[^\s@<>;,]+$/.test(email))throw Error('Revisá tu correo.');
 if((input.channel==='email'||input.preference==='Email')&&!email)throw Error('Indicá tu correo para poder responderte por ese medio.');
 if(!/^SGM-\d{8}-[A-Z0-9]{8}$/.test(reference||''))throw Error('No se pudo preparar la referencia. Reintentá.');
 const details=Object.fromEntries(Object.entries(input.details||{}).map(([k,v])=>[clean(k,60),clean(v,250)]));
 if(input.kind==='quote')validateDetails(input.product,details);
 return {kind:input.kind==='quote'?'quote':'quick',reference,name,phone,email,product:input.product,message,details,channel:input.channel,preference:clean(input.preference||'WhatsApp',30),source,consent:true};
}
export const DETAIL_LABELS={marca:'Marca',modelo:'Modelo',anio:'Año',uso:'Uso',departamento:'Departamento',coberturaActual:'Seguro actual',localidad:'Localidad',tipoVivienda:'Tipo de vivienda',condicion:'Relación con la vivienda',superficie:'Superficie aproximada',destino:'Destino',fechaSalida:'Salida',fechaRegreso:'Regreso',viajeros:'Viajeros',edades:'Edades',edad:'Edad',objetivo:'Objetivo',capitalOrientativo:'Capital o aporte orientativo',tipoInmueble:'Tipo de inmueble',alquilerEstimado:'Alquiler estimado',situacionLaboral:'Situación laboral',cantidadSolicitantes:'Solicitantes',actividad:'Actividad de la empresa',necesidad:'Qué querés proteger'};
export function requestText(r){return [r.kind==='quote'?'SOLICITUD DE COTIZACIÓN · SGM SEGUROS':'CONSULTA · SGM SEGUROS','Referencia: '+r.reference,'Nombre: '+r.name,'Celular: '+r.phone,r.email?'Correo: '+r.email:'','Seguro: '+PRODUCTS[r.product],...Object.entries(r.details).filter(([,v])=>v).map(([k,v])=>(DETAIL_LABELS[k]||k)+': '+v),r.message?'Consulta: '+r.message:'','Respuesta preferida: '+r.preference,r.kind==='quote'?'Documentación indicada para evaluar la cotización: '+requestedDocuments(r.product).join(' y ')+'.':'','Autorizo el contacto para responder y dar seguimiento a esta solicitud.',...Object.entries(r.source).map(([k,v])=>k+': '+v)].filter(Boolean).join('\n');}
export function destination(r){const body=requestText(r);return r.channel==='email'?'mailto:'+CONTACT.email+'?subject='+encodeURIComponent('SGM · '+PRODUCTS[r.product]+' · '+r.reference)+'&body='+encodeURIComponent(body):'https://wa.me/'+CONTACT.whatsapp+'?text='+encodeURIComponent(body);}

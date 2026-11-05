const VERSION='SGM_WEB_CONTACT_V1';
function problem(message,code){return Object.assign(new Error(message),{code});}
function randomHex(n){return [...crypto.getRandomValues(new Uint8Array(n))].map(b=>b.toString(16).padStart(2,'0')).join('');}
export function validGoogleEndpoint(url){return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]{10,}\/exec$/.test(url||'');}
const keys=new Map();
export async function readGoogleReceipt(endpoint,params,{timeoutMs=12000}={}){
 if(!validGoogleEndpoint(endpoint))throw problem('Falta comprobar el receptor de SGM.','configuration');
 return new Promise((resolve,reject)=>{const callback='SGM_CB_'+randomHex(12),script=document.createElement('script'),url=new URL(endpoint);for(const[k,v]of Object.entries({...params,callback}))url.searchParams.set(k,v);const clean=()=>{clearTimeout(timer);script.remove();delete window[callback];};window[callback]=data=>{clean();resolve(data);};script.referrerPolicy='no-referrer';script.src=url.href;script.onerror=()=>{clean();reject(problem('No se pudo consultar la recepción.','uncertain'));};const timer=setTimeout(()=>{clean();reject(problem('El receptor no confirmó su estado a tiempo.','uncertain'));},timeoutMs);document.head.append(script);});
}
function base64(bytes){let text='';for(let i=0;i<bytes.length;i+=32768)text+=String.fromCharCode(...bytes.subarray(i,i+32768));return btoa(text);}
export async function submitGoogle(request,files,config){
 if(!validGoogleEndpoint(config.endpoint))throw problem('El receptor de SGM todavía está en preparación.','not_configured');
 const health=await readGoogleReceipt(config.endpoint,{mode:'health'});if(health.version!==VERSION||health.enabled!==true)throw problem('SGM todavía no habilitó la recepción web. Tus datos no se enviaron.','not_configured');
 if(!keys.has(request.reference))keys.set(request.reference,randomHex(32));const secret=keys.get(request.reference),attachments=[];for(const f of files)attachments.push({name:f.name,mime:f.type,base64:base64(new Uint8Array(await f.arrayBuffer()))});
 const body=JSON.stringify({version:VERSION,receiptSecret:secret,request,attachments});
 // The opaque POST is never treated as success. Only the capability-protected receipt confirms it.
 try{await fetch(config.endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=UTF-8'},body,signal:AbortSignal.timeout(30000)});}catch{}
 const start=Date.now();while(Date.now()-start<45000){let result;try{result=await readGoogleReceipt(config.endpoint,{reference:request.reference,token:secret},{timeoutMs:8000});}catch{await new Promise(r=>setTimeout(r,2000));continue;}
  if(result.found){const r=result.receipt;if(r.reference!==request.reference||r.version!==VERSION)throw problem('La confirmación no corresponde a tu consulta.','uncertain');if(r.state==='accepted')return {accepted:true,reference:request.reference,provider:'Google',emailDeliveryConfirmed:false};if(r.state==='uncertain')throw problem('No se confirmó el resultado. Consultá a SGM con tu referencia antes de repetir.','uncertain');throw problem('SGM no pudo recibir el envío en este momento. Conservamos tus datos para que puedas reintentarlo o comunicarte directamente.','rejected');}
  await new Promise(r=>setTimeout(r,2000));
 }
 throw problem('No se confirmó la recepción. Conservá tu referencia y consultá a SGM antes de repetir el envío.','uncertain');
}

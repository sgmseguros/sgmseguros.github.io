import{CONTACT,PRODUCTS,requestText}from'./funnel.js?v=20261105-6';
import{deliveryConfig}from'./delivery-config.js?v=20261105-6';
import{submitGoogle}from'./google-delivery.js?v=20261105-6';
const failure=(message,code)=>Object.assign(new Error(message),{code});
export function checkAttachments(files,config=deliveryConfig){
 if(files.length>config.maxFiles)throw failure('Podés adjuntar hasta '+config.maxFiles+' archivos. También podés enviar la consulta y completar los documentos después.','files');
 if(files.reduce((sum,f)=>sum+f.size,0)>config.maxBytes)throw failure('Los adjuntos superan los 8 MB. Elegí archivos más livianos o enviá primero la consulta sin documentos.','files');
 if(files.some(f=>!f.size||!['image/jpeg','image/png','application/pdf','image/heic','image/heif'].includes(f.type)))throw failure('Elegí fotos JPG, PNG, HEIC o documentos PDF.','files');
}
export function deliveryPayload(request,files=[],config=deliveryConfig){
 checkAttachments(files,config);const body=new FormData();
 for(const[k,v]of Object.entries({name:request.name,email:request.email,Telefono:request.phone,Referencia:request.reference,Seguro:PRODUCTS[request.product],Preferencia_de_respuesta:request.preference,Resumen:requestText(request),_subject:'SGM · '+PRODUCTS[request.product]+' · '+request.reference,_template:'table',_url:'https://sgmseguros.github.io/',_honey:''}))if(v)body.append(k,v);
 if(request.email)body.append('_replyto',request.email);
 for(const[fileIndex,file]of files.entries())body.append('attachment_'+(fileIndex+1),file,file.name);
 return body;
}
export async function submitDirect(request,files=[],{config=deliveryConfig,fetcher=fetch}={}){
 if(config.enabled!==true)throw failure('El envío directo todavía está en preparación. Podés revisar el resumen o comunicarte con SGM por WhatsApp.','not_configured');
 if(config.provider==='google'){checkAttachments(files,config);return submitGoogle(request,files,config);}
 if(config.endpoint!=='https://formsubmit.co/ajax/'+CONTACT.email)throw failure('No se pudo comprobar el destino. No se enviaron los datos.','configuration');
 const body=deliveryPayload(request,files,config);let response;
 try{response=await fetcher(config.endpoint,{method:'POST',headers:{Accept:'application/json'},body,signal:AbortSignal.timeout(config.timeoutMs)});}catch{throw failure('No pudimos confirmar la recepción. Conservamos tus datos en esta página. Para evitar repetir la solicitud, consultá a SGM indicando tu referencia.','uncertain');}
 let result;try{result=await response.json();}catch{throw failure('El servicio no devolvió una confirmación válida. Consultá a SGM con tu referencia antes de repetir el envío.','uncertain');}
 if(/activat|confirm your email|verif.{0,25}email/i.test(String(result.message||'')))throw failure('Falta confirmar el correo receptor de SGM. Podés conservar el resumen y comunicarte por WhatsApp.','activation_required');
 if(!response.ok||![true,'true'].includes(result.success))throw failure('El servicio no confirmó el envío. Tus datos siguen disponibles para revisar o compartir con SGM.','rejected');
 return {accepted:true,reference:request.reference,provider:'FormSubmit',emailDeliveryConfirmed:false};
}

export const DEPARTMENTS=['Artigas','Canelones','Cerro Largo','Colonia','Durazno','Flores','Florida','Lavalleja','Maldonado','Montevideo','Paysandú','Río Negro','Rivera','Rocha','Salto','San José','Soriano','Tacuarembó','Treinta y Tres'];
const multi=choices=>({choices,multiple:true});
export const QUOTE_CONFIGS={
 automotor:[
  ['marca','Marca','text','Ej.: Volkswagen'],['modelo','Modelo y versión','text','Ej.: Gol 1.6 Power'],['anio','Año','number','Ej.: 2020'],
  ['combustible','Combustible',['Nafta','Diésel','Híbrido','Eléctrico','Otro / no estoy seguro']],['caja','Transmisión',['Manual','Automática','No estoy seguro']],
  ['uso','Uso principal',['Particular','Comercial','Trabajo / reparto','Otro']],['edadConductor','Edad del conductor principal','number','Ej.: 38'],
  ['departamento','Departamento de circulación habitual',DEPARTMENTS],['zonaCirculacion','Zona de circulación habitual','text','Ej.: Montevideo, Pocitos y Centro'],
  ['matricula','Matrícula (si ya tiene)','text','Ej.: ABC1234',false],['accesorios','Equipamiento adicional','text','Ej.: aire, ABS, airbags, llantas',false],
  ['coberturasDeseadas','¿Qué coberturas querés comparar?',multi(['Responsabilidad civil','Parcial','Total','Quiero asesoramiento'])],
  ['coberturaActual','¿Tiene seguro actualmente?',['Sí','No','No estoy seguro']],['companiaActual','Compañía actual (si tiene)','text','Ej.: compañía de tu póliza',false],
  ['inicioDeseado','Fecha de inicio o vencimiento actual','date','',false]
 ],
 hogar:[
  ['tipoVivienda','Tipo de vivienda',['Casa','Apartamento','Otro']],['condicion','Relación con la vivienda',['Propietario/a','Inquilino/a','Otra']],
  ['departamento','Departamento',DEPARTMENTS],['localidad','Localidad o barrio','text','Ej.: Pocitos'],['construccion','Tipo de construcción',['Tradicional','Liviana / mixta','No estoy seguro']],
  ['uso','Uso de la vivienda',['Vivienda permanente','Vivienda temporal','Alquiler','Otro']],['superficie','Superficie aproximada (m²)','text','Ej.: 80',false],
  ['proteccionHogar','¿Qué querés proteger?',multi(['Vivienda','Contenido','Responsabilidad civil','Quiero asesoramiento'])],
  ['monedaCapital','Moneda de los valores indicados',['UYU · pesos uruguayos','USD · dólares','Necesito orientación']],
  ['valorVivienda','Valor aproximado de la vivienda','text','Si lo conocés',false],['valorContenido','Valor aproximado del contenido','text','Si lo conocés',false],
  ['seguridad','Medidas de seguridad',multi(['Alarma','Rejas / cerramientos','Vigilancia / portería','No tengo / no sé']),'',false],['inicioDeseado','Fecha de inicio solicitada','date','',false]
 ],
 viaje:[
  ['destino','País o países de destino','text','Ej.: España e Italia'],['residencia','País de residencia',['Uruguay','Otro país']],
  ['viajeros','Cantidad de viajeros','number','Ej.: 2'],['fechaSalida','Fecha de salida','date',''],['fechaRegreso','Fecha de regreso','date',''],
  ['edades','Edades de todos los viajeros','text','Ej.: 35, 32 y 8; para bebés indicá los meses'],['objetivo','Tipo de viaje',['Turismo','Trabajo','Estudio','Otro']],
  ['interesesViaje','¿Qué te interesa comparar?',multi(['Asistencia médica','Equipaje','Cancelación / interrupción','Quiero asesoramiento'])],
  ['actividades','¿Vas a realizar actividades especiales?',['Sin actividades especiales','Deportes recreativos','Aventura / competición','Quiero asesoramiento']]
 ],
 vida:[
  ['edad','Edad de la persona a asegurar','number','Ej.: 38'],['ocupacion','Ocupación o actividad','text','Ej.: administrativo'],['departamento','Departamento',DEPARTMENTS],
  ['objetivosVida','¿Qué buscás en el seguro?',multi(['Protección familiar','Ahorro','Respaldo de ingresos','Quiero asesoramiento'])],
  ['monedaCapital','Moneda del capital o aporte',['UYU · pesos uruguayos','USD · dólares','Necesito orientación']],['capitalOrientativo','Capital o aporte orientativo','text','Si lo conocés',false],
  ['frecuenciaAporte','Forma de aporte que te interesa',['Mensual','Anual','Quiero asesoramiento']],['inicioDeseado','Fecha de inicio solicitada','date','',false]
 ],
 alquiler:[
  ['tipoInmueble','Tipo de inmueble',['Vivienda','Local comercial','Otro']],['departamento','Departamento',DEPARTMENTS],['localidad','Localidad o barrio','text','Ej.: Centro'],
  ['alquilerEstimado','Importe del alquiler mensual','text','Ej.: 28000'],['monedaAlquiler','Moneda del alquiler',['UYU · pesos uruguayos','USD · dólares']],
  ['situacionLaboral','Situación laboral',['Dependiente','Independiente','Jubilado/a','Otra']],['antiguedadLaboral','Antigüedad laboral',['Menos de 6 meses','De 6 a 12 meses','Más de un año','Quiero asesoramiento']],
  ['cantidadSolicitantes','Cantidad de solicitantes','number','Ej.: 1'],['ingresoAproximado','Ingreso mensual aproximado y moneda','text','Opcional',false],
  ['estadoAlquiler','Situación del alquiler',['Ya elegí el inmueble','Estoy buscando','Quiero renovar una garantía']],['inicioDeseado','Fecha prevista de inicio','date','',false]
 ],
 comercio:[
  ['razonSocial','Nombre de la empresa o actividad','text','Opcional',false],['actividad','Actividad principal','text','Ej.: comercio de artículos de hogar'],
  ['departamento','Departamento',DEPARTMENTS],['localidad','Localidad o barrio','text','Ej.: Ciudad de la Costa'],['tipoLocal','Situación del local',['Propio','Alquilado','Sin local','Otra']],
  ['necesidadesEmpresa','¿Qué necesitás proteger?',multi(['Local y mercadería','Vehículos','Responsabilidad civil','Personal / accidentes del trabajo','Quiero asesoramiento'])],
  ['monedaCapital','Moneda del capital indicado',['UYU · pesos uruguayos','USD · dólares','Necesito orientación']],['capitalOrientativo','Capital aproximado a proteger','text','Si lo conocés',false],
  ['cantidadPersonal','Cantidad de personas que trabajan','number','Opcional',false],['coberturaActual','¿Tiene seguro actualmente?',['Sí','No','No estoy seguro']],['inicioDeseado','Fecha de inicio o renovación','date','',false]
 ]
};
export const QUOTE_LABELS={matricula:'Matrícula',coberturasDeseadas:'Coberturas a comparar',edadConductor:'Edad del conductor principal',zonaCirculacion:'Zona de circulación habitual',companiaActual:'Compañía actual',construccion:'Construcción',ocupacion:'Ocupación',inicioDeseado:'Fecha de inicio o renovación',combustible:'Combustible',caja:'Transmisión',accesorios:'Equipamiento adicional',proteccionHogar:'Qué quiere proteger del hogar',monedaCapital:'Moneda de los valores',valorVivienda:'Valor de la vivienda',valorContenido:'Valor del contenido',seguridad:'Medidas de seguridad',residencia:'País de residencia',interesesViaje:'Opciones de viaje a comparar',actividades:'Actividades durante el viaje',objetivosVida:'Objetivos del seguro de vida',frecuenciaAporte:'Frecuencia del aporte',monedaAlquiler:'Moneda del alquiler',antiguedadLaboral:'Antigüedad laboral',ingresoAproximado:'Ingreso mensual aproximado',estadoAlquiler:'Situación del alquiler',razonSocial:'Empresa / razón social',tipoLocal:'Situación del local',necesidadesEmpresa:'Necesidades de la empresa',cantidadPersonal:'Cantidad de personas que trabajan'};

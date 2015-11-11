/** ----- NUEVA RAMPA ----- **/
function altaRampa(){
	cerrarTodo();
	var rampa = {};
	rampa.latitud = ubicacion.lat();
	rampa.longitud = ubicacion.lng();
	rampa.barrio = obtenerBarrioDeUnaNuevaRampa(ubicacion);
	if (rampa.barrio == null){
		alerta("Por el momento Más Rampas funciona únicamente en el ámbito de la Ciudad de Buenos Aires. Próximamente se ampliará la cobertura del sistema.","Disculpe");
	}else{
		/*
		MARTINCITO --> No se que se deberia hacer aca. 
		Que funcion se tendria que llamar para cancelar todo?
		 o este chequeo se tendria que hacer antes?
		*/
		rampa.tieneInformacion = true;
		rampa.tieneRampas = document.getElementById("tieneRampaA").checked;
		rampa.buenEstado = document.getElementById("buenEstadoA").checked;
		rampa.crucesAccesibles = document.getElementById("crucesAccesiblesA").checked;
		if (!unUsuario.administrador)
			rampa.reportada = true;
		else
			rampa.reportada = false;
		//rampa.reportes = "Nueva";
		var autor = unUsuario.nombre + " " + unUsuario.apellido;
		var reportes = [{"autor": autor,"rampa": {"tieneRampas":rampa.tieneRampas,"crucesAccesibles":rampa.crucesAccesibles,"buenEstado":rampa.buenEstado},"modificada": false,"comentario":"Nueva" }];
		rampa.reportes = JSON.stringify(reportes);
		nuevaRampa(rampa);
		actualizarMarcadorRampa(ubicacion,rampa,false);
	}
}

function nuevaRampa(rampa){
	mostrarLoading();
	console.log("A punto de guardar una rampa...");
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			ocultarLoading();
			alertaCompartir("La Rampa se dio de Alta correctamente");
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			409: function () { 
					alerta("Hubo un error al grabar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- MODIFICAR RAMPA ----- **/
function modRampa(){
	var marcador = ubicacion;
	ubicacion = bru(ubicacion.getPosition().lat(),ubicacion.getPosition().lng()); //Esto es variable Global ID
	cerrarTodo();
	var rampa = {};
	rampa=ubicacion;//Esto es variable Global
	if(rampa.reportes=="Nueva")//ESTO SE DEBERIA HACER CUANDO SE CARGA EN LA BASE DE DATOS
		rampa.reportes=JSON.stringify([{"autor": "Mas Rampas","rampa": {"tieneRampas":false,"crucesAccesibles":false,"buenEstado":false},"modificada": false,"comentario":"Nueva" }]);
	rampa.tieneInformacion = true;
	rampa.tieneRampas = $("#tieneRampaM").is(':checked');
	rampa.buenEstado = $("#buenEstadoM").is(':checked');
	rampa.crucesAccesibles = $("#crucesAccesiblesM").is(':checked');
	rampa.reportada = false;
	var reportes = JSON.parse(rampa.reportes);
	$.each(reportes, function(index, unReporte){
		unReporte.modificada=true;
	});
	rampa.reportes = JSON.stringify(reportes);
	modificarRampaa(rampa);
	actualizarMarcadorRampa(marcador,rampa,true);
}

function modificarRampaa(rampa){
	mostrarLoading();
	console.log("A punto de modificar una rampa...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			ocultarLoading();
			alerta("Se modifico la rampa correctamente.");// + JSON.stringify(rampa) + "-- " + data.toString());
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			409: function () { 
				alerta("Hubo un error al modificar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- REPORTAR RAMPA ----- **/
function repRampa(){
	cerrarTodo();
	var rampa = {};
	var marcador = ubicacion;
	rampa = bru(ubicacion.getPosition().lat(),ubicacion.getPosition().lng()); //Esto es variable Global ID
	if(rampa.reportes=="Nueva")//ESTO SE DEBERIA HACER CUANDO SE CARGA EN LA BASE DE DATOS
		rampa.reportes=JSON.stringify([{"autor": "Mas Rampas","rampa": {"tieneRampas":false,"crucesAccesibles":false,"buenEstado":false},"modificada": false,"comentario":"Nueva" }]);	
	var mt =$("#selectMotivo").prop("value");
	if (mt=="Otros")
		mt = $("#motivoPersonalizado").prop("value");
	if (mt=="")
		mt="Sin Comentarios";
	var tieneRampas = false; //document.getElementById("tieneRampaR").checked;
	var crucesAccesibles = false; //document.getElementById("crucesAccesiblesR").checked;
	var buenEstado = false; //document.getElementById("buenEstadoR").checked;
	var autor = unUsuario.nombre + " " + unUsuario.apellido;
	var reportes = JSON.parse(rampa.reportes);
	reportes[reportes.length]={"autor": autor,"rampa": {"tieneRampas":tieneRampas,"crucesAccesibles":crucesAccesibles,"buenEstado":buenEstado},"modificada": false,"comentario":mt };
	rampa.reportes = JSON.stringify(reportes);
	rampa.reportada = true;
	reportarRampaa(rampa);
	actualizarMarcadorRampa(marcador,rampa,true);
}

function reportarRampaa(rampa){
	mostrarLoading();
	console.log("A punto de reportar una rampa...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			ocultarLoading();
			alertaCompartir("Se reporto la rampa Correctamente.","Exito");
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			409: function () { 
				alerta("Hubo un error al reportar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR RAMPA POR UBICACION ----- **/
function bru(latitud, longitud){
	mostrarLoading();
	var r={};
	console.log("A punto de buscar rampas por ubicacion...");
	$.ajax({
		async:false, //Si no lo hago sincronico resulve mal
		type: "GET",
		dataType: "json",
		url: "/rampas/Rampas/latlng/"+ latitud + "/" + longitud,
		success: function (rampa) {
			ocultarLoading();
			r=rampa;
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			404: function () { alerta("Hubo un error al buscar la rampa");
			 
			}
		}
	});
	return r;
}

function borrarRampaPorUbicacion(latitud, longitud){
	mostrarLoading();
	console.log("A punto de borrar rampa por ubicacion...");
	$.ajax({
		type: "DELETE",
		dataType: "json",
		url: "/rampas/Rampas/latlng/" + latitud + "/" + longitud,
		statusCode: {
    		200: function (){
				console.log("Borrar Rampa: Success");
				alerta("Se elimino la rampa correctamente.");
				ocultarLoading();
    		},
			404: function () { 
				console.log("Borrar Rampa: No existe");	
				ocultarLoading();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("Borrar Rampa: Hubo un error en el servidor");
	    	console.log(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + ". " + JSON.stringify(errorThrown));
	    }
	});
}

/** ----- BORRAR RAMPA ----- **/
function borrarRampa(rampa){
	mostrarLoading();
	console.log("A punto de borrar una rampa...");
	$.ajax({
		type: "DELETE",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			ocultarLoading();
			alerta("Se elimino la rampa correctamente.");// + JSON.stringify(rampa) + "-- " + data.toString());
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			409: function () { 
				alerta("Hubo un error al eliminar la rampa en la base de datos.");
			}
		}
	});
}

function actualizarMarcadorRampa(marcador,rampa,borrar){//marcador o LatLng | rampa | bool (borrar Marcador)
	var unMarcador;
	var latLng;
	if(borrar){
		marcador.setMap(null);
		latLng=marcador.getPosition();
	}
	else latLng=marcador;
	unMarcador = crearMarcadorConColor(latLng, calcularColorSegunRampa(rampa).icono, listenerClickEnMarcador);
	unMarcador.tieneInformacion = rampa.tieneInformacion;
	unMarcador.tieneRampas = rampa.tieneRampas; 
	unMarcador.buenEstado = rampa.buenEstado;
	unMarcador.crucesAccesibles = rampa.crucesAccesibles;
	unMarcador.reportada = rampa.reportada;
	unMarcador.setMap(map);
	arrayRampasCercanas.push(unMarcador);//GLOBAL
}

/** ----- BUSCAR RAMPAS REPORTADAS ----- **/
function buscarRampasReportadas(){
	mostrarLoading();
	console.log("A punto de buscar rampas reportadas...");
	$.ajax({
		type:"GET",
		dataType: "json",
		url: "/rampas/Rampas/reportadas",
		success: function(rampas){
			ocultarLoading();
			mostraMarcadoresReportados(rampas);
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			404: function () { 
			alerta("No se ha encontrado ninguna rampa reportada.");
			}
		}
	});
}

function mostraMarcadoresReportados(rampasReportadas){
	borrarRutasPrevias();
	ocultarRampasCercanas();
	borrarBarriosPrevios();
	$.each(rampasReportadas, function(indice, punto){
		if(typeof (punto.coordenadas) === 'undefined')
			latlng = new google.maps.LatLng(punto.latitud,punto.longitud);
		else
			latlng = new google.maps.LatLng(punto.coordenadas[0],punto.coordenadas[1]);
		unMarcador = crearMarcadorConColor(latlng, calcularColorSegunRampa(punto).icono, listenerClickEnMarcador);
		unMarcador.tieneInformacion = punto.tieneInformacion;
		unMarcador.tieneRampas = punto.tieneRampas; 
		unMarcador.buenEstado = punto.buenEstado;
		unMarcador.crucesAccesibles = punto.crucesAccesibles;
		unMarcador.reportada = punto.reportada;
		unMarcador.setMap(map);
		arrayRampasCercanas.push(unMarcador);//USO EL MISMO VECTOR GLOBAL  crucesBarrioElegido
	});			
}

/** ----- BUSCAR RAMPAS POR BARRIO ----- 
function buscarRampasPorBarrio(barrio,cantidad){
	console.log("A punto de buscar rampas por barrio...");
	$.ajax({
		type:"GET",
		dataType: "json",
		url: "/rampas/Rampas/barrios/" + barrio,
		success: function(rampas){
			limpiarHTMLRampas();
			if(rampas.length > 10){ //Para que no me muestre las 500 rampas por barrio.
				rampas = rampas.slice(0, 11);
			}
			$('#resultadoBuscarRampasPorBarrio').html(JSON.stringify(rampas));
		},
		statusCode: {
			404: function () { 
				limpiarHTMLRampas();
				$('#resultadoBuscarRampasPorBarrio').html("No se ha encontrado ninguna rampa con ese barrio.");
			}
		}
	});
}
**/

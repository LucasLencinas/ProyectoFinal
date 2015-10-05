/** ---------- RAMPA ---------- **/
/** ----- NUEVA RAMPA ----- **/
function altaRampa(){
	cerrarTodo();
	var rampa = {};
	rampa.latitud = ubicacion.lat();
	rampa.longitud = ubicacion.lng();
	rampa.barrio = "xxx";//ACA FALTA SABER COMO SACAR EL BARRIO	
	rampa.tieneInformacion = true;
	rampa.tieneRampas = document.getElementById("tieneRampaA").checked;
	rampa.buenEstado = document.getElementById("buenEstadoA").checked;
	rampa.crucesAccesibles = document.getElementById("crucesAccesiblesA").checked;
	rampa.reportada = true;
	rampa.reportes = "Nueva";
	nuevaRampa(rampa);
		actualizarMarcadorRampa(ubicacion,rampa,false);
}
function nuevaRampa(rampa){
	console.log("A punto de guardar una rampa...");
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
					alerta("La Rampa se dio de Alta correctamente");
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
	rampa.tieneInformacion = true;
	rampa.tieneRampas = $("#tieneRampaM").is(':checked');
	rampa.buenEstado = $("#buenEstadoM").is(':checked');
	rampa.crucesAccesibles = $("#crucesAccesiblesM").is(':checked');
	rampa.reportada = false;
	rampa.reportes = "";
	
	modificarRampaa(rampa);
		actualizarMarcadorRampa(marcador,rampa,true);
}

function modificarRampaa(rampa){
	console.log("A punto de modificar una rampa...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			alerta("Se modifico la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
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

	var mt =$("#selectMotivo").prop("value");
	if (rampa.peportes == "")
		rampa.reportes = rampa.reportes + "Motivo: " + mt
		else rampa.reportes = rampa.reportes + ". Motivo: " + mt;
	if (mt="Otros")
		rampa.reportes = rampa.reportes + ": " + $("#motivoPersonalizado").prop("value");

	if (ubicacion.tieneRampas != document.getElementById("tieneRampaR").checked)
		rampa.reportes = rampa.reportes + " ; TieneRampas: " + document.getElementById("tieneRampaR").checked;

	if (ubicacion.buenEstado != document.getElementById("buenEstadoR").checked)
		rampa.reportes = rampa.reportes + " ; BuenEstado: " + document.getElementById("buenEstadoR").checked;

	if (ubicacion.crucesAccesibles != document.getElementById("crucesAccesiblesR").checked) 
		rampa.reportes = rampa.reportes + " ; CrucesAccesibles: " + document.getElementById("crucesAccesiblesR").checked;

	rampa.reportada = true;
	reportarRampaa(rampa);
			actualizarMarcadorRampa(marcador,rampa,true);

}

function reportarRampaa(rampa){
	console.log("A punto de reportar una rampa...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			alerta("Se reporto la rampa Correctamente.","Exito");			
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
	var r={};
	console.log("A punto de buscar rampas por ubicacion...");
	$.ajax({
		async:false, //Si no lo hago sincronico resulve mal
		type: "GET",
		dataType: "json",
		url: "/rampas/Rampas/latlng/"+ latitud + "/" + longitud,
		success: function (rampa) {
			r=rampa;
		},
		statusCode: {
			404: function () { alert("Rampa eeror");
			 
			}
		}
	});
	return r;
}


/** ----- BORRAR RAMPA ----- **/
function borrarRampa(rampa){
	console.log("A punto de borrar una rampa...");
	$.ajax({
		type: "DELETE",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			alert("Se borro la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
		},
		statusCode: {
			409: function () { 
				alert("Hubo un error al desreportar la rampa en la base de datos.");
			}
		}
	});
}
function actualizarMarcadorRampa(marcador,rampa,borrar){//marcador o LatLng | rampa | bool (borrar Marcador)
	var unMarcador;
	var latLng;
	if(borrar)
	 {marcador.setMap(null);
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
	console.log("A punto de buscar rampas reportadas...");
	$.ajax({
		type:"GET",
		dataType: "json",
		url: "/rampas/Rampas/reportadas",
		success: function(rampas){
			mostraMarcadoresReportados(rampas);
		},
		statusCode: {
			404: function () { 
			alert("No se ha encontrado ninguna rampa REPORTADA.");
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

/** ---------- USUARIO ---------- **/

/** ----- NUEVO USUARIO POR MAIL ----- **/

function nuevoUsuarioMail(usuario){
	console.log("A punto de guardar un usuario...");
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			alert("Se dio de alta el usuario: " + JSON.stringify(usuario) + "-- " + data.toString());
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Nuevo Usuario. ";
			resultado += "Contenido jqHR:" + jqXHR + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				alert("Hubo un error al grabar el usuario en la base de datos.");
			}
		}
	});
}

/** ----- NUEVO USUARIO POR FACEBOOK ----- **/
/*
function generarRampaDesdeLosInputDeNuevoUsuarioFacebook(){
	var usuario = {};
	usuario.nombre = $("#nuevoFacebook").val();
	return usuario;
}

function nuevoUsuarioFacebook(usuario){
	console.log("A punto de guardar un usuario...");
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			$('#resultadoNuevoUsuarioFacebook').html("Se dio de alta el usuario: " + JSON.stringify(usuario) + "-- " + data.toString());
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Nuevo Usuario. ";
			resultado += "Contenido jqHR:" + jqXHR + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoNuevoUsuarioFacebook').html("Hubo un error al grabar el usuario en la base de datos.");
			}
		}
	});
}
*/
var idSesion = -1;									//Sesion cerrada
var unUsuario;										//Usuario GLOBAL
/** ----- BUSCAR USUARIO POR MAIL ----- **/
function autenticar(mail,pass){
	var encontro = false;
	console.log("A punto de buscar usuario por mail...");
	$.ajax({
		async:false, //Si no lo hago sincronico resulve mal
		type: "GET",
		dataType: "json",
		url: "/rampas/Usuarios/mail/" + mail,
		success: function (usuario) {
			encontro = (usuario.contraseña == pass);//Esto se deberia hacer en dentro del query
			idSesion=usuario.id;					//identificador Usuario para poder Modificar
			unUsuario = usuario;
		},
		statusCode: {
			404: function () { 
			
			}
		}
	});
return encontro;
}
function existeUsuarioRegistrado(mail,idUsuario){
	var encontro = false;
	console.log("A punto de buscar usuario por mail...");
	$.ajax({
		async:false, //Si no lo hago sincronico resulve mal
		type: "GET",
		dataType: "json",
		url: "/rampas/Usuarios/mail/" + mail,
		success: function (usuario) {
			encontro=(usuario.id != idUsuario);//true Existe usuario (registrar)|(modificar) NO se puede usar
		},
		statusCode: {
			404: function () { 
			
			}
		}
	});
return encontro;
}
/*
function limpiarHTMLUsuarios() {
	$("#modificarNombre").val("");
	$("#modificarApellido").val("");
	$("#modificarMail").val("");
	$("#modificarContrasenia").val("");
	$("#modificarBoton").prop("disabled",true);
	$("#borrarBoton").prop("disabled",true);
}

function buscarUsuarioPorMail(mail){
	console.log("A punto de buscar usuario por mail...");
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/rampas/Usuarios/mail/" + mail,
		success: function (usuario) {
			$('#resultadoBuscarUsuarioPorMail').html(JSON.stringify(usuario));
			$("modificarId").val(usuario.id);
			$("#modificarNombre").val(usuario.nombre);
			$("#modificarApellido").val(usuario.apellido);
			$("#modificarMail").val(usuario.mail);
			$("#modificarContrasenia").val(usuario.contraseña);
			$("#modificarBoton").prop("disabled",false);
			$("#borrarBoton").prop("disabled",false);
		},
		statusCode: {
			404: function () { 
				limpiarHTML();
				$('#resultadoBuscarUsuarioPorMail').html("No se ha encontrado ningun usuario con ese mail.");
			
			}
		}
	});
}
*/
/** ----- MODIFICAR USUARIO ----- **/

function modificarUsuarioMail(usuario){
	console.log("A punto de modificar un usuario...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			alert("Se modifico el usuario: " + JSON.stringify(usuario) + "-- " + data.toString());
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Modificar Usuario. ";
			resultado += "Contenido jqHR:" + jqXHR.toString() + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				alert("Hubo un error al modificar el usuario en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR USUARIO POR FACEBOOK ----- **/
/*
function buscarUsuarioPorFacebook(facebook){
	console.log("A punto de buscar usuario por facebook...");
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/rampas/Usuarios/facebook/" + facebook,
		success: function (usuario) {
			$('#resultadoBuscarUsuarioPorFacebook').html(JSON.stringify(usuario));
			$("#borrarFacebookBoton").prop("disabled",false);
		},
		statusCode: {
			404: function () { 
				$("#borrarFacebookBoton").prop("disabled",true);
				$('#resultadoBuscarUsuarioPorFacebook').html("No se ha encontrado ningun usuario con ese facebook.");
			
			}
		}
	});
}
*/
/** ----- BUSCAR USUARIOS ----- **/
/*
function buscarUsuarios(){
	console.log("A punto de buscar usuarios...");
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/rampas/Usuarios/usuarios",
		success: function (usuarios) {
			$('#resultadoBuscarUsuarios').html(JSON.stringify(usuarios));
		},
		statusCode: {
			404: function () { 
				$('#resultadoBuscarUsuarios').html("No se ha encontrado ningun usuario.");
			}
		}
	});
}
*/

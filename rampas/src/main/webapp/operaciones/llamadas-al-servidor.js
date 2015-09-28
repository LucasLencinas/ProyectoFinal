/** ----- Carga inicial de la base de datos ----- **/

function cargarDatos(){
  console.log("A punto de cargar los datos en la base de datos...");
  $.ajax({
	  type: "GET",
	  dataType: "json",
	  url: "/rampas/Rampas/admin/carga",
	  success: function (data) {
		  alert("Success - Carga inicial OK");
	      console.log("Success - Carga inicial OK");
	      $("#cargarBoton").prop("disabled",true);
	      $("#nuevaBoton").prop("disabled",false);
	      $("#buscarBoton").prop("disabled",false);
	      $("#barrioBoton").prop("disabled",false);
	  },
	  error: function (jqXHR, textStatus, errorThrown) {
	      var resultado = "Error - Carga inicial. ";
	      resultado += "Contenido jqHR:" + jqXHR + ". ";
	      resultado += "Contenido textStatus:" + textStatus + ". ";
	      resultado += "Contenido errorThrown:" + errorThrown + ". ";
	      alert(resultado);
	  },
  });
}

/** ---------- RAMPA ---------- **/

var rampaTotal = {};

/** ----- HTML ----- **/

function limpiarHTMLRampas() {
	$("#nuevaLat").val(""); 
	$("#nuevaLng").val("");
	$("#nuevaBarrio").val("");
	$("#nuevaTieneInformacion").prop("checked",false);
	$("#nuevaTieneRampas").prop("checked",false);
	$("#nuevaBuenEstado").prop("checked",false);
	$("#nuevaCrucesAccesibles").prop("checked",false);
	$("#modificarId").val("");
	$("#modificarLat").val("");
	$("#modificarLng").val("");
	$("#modificarBarrio").val("");
	$("#modificarTieneInformacion").prop("checked",false);
	$("#modificarTieneRampas").prop("checked",false);
	$("#modificarBuenEstado").prop("checked",false);
	$("#modificarCrucesAccesibles").prop("checked",false);
	$("#modificarReportada").prop("checked",false);
	$("#modificarReportes").val("");
	$("#modificarBoton").prop("disabled",true);
	$("#reportarBoton").prop("disabled",true);
	$("#borrarBoton").prop("disabled",true);
	$('#resultadoNuevaRampa').html("Todavia no se dio de alta una rampa.");
	$('#resultadoBuscarRampaPorUbicacion').html("Todavia no se busco rampa por Ubicacion.");
	$('#resultadoModificarRampa').html("Todavia no se modifico/reporto/borro una rampa.");
	$('#resultadoBuscarRampasPorBarrio').html("Todavia no se busco rampas por barrio.");
}

/** ----- NUEVA RAMPA ----- **/

function generarRampaDesdeLosInputDeNuevaRampa(){
	var rampa = {};
	rampa.latitud = $("#nuevaLat").val(); 
	rampa.longitud = $("#nuevaLng").val();
	rampa.barrio = $("#nuevaBarrio").val();
	rampa.tieneInformacion = $("#nuevaTieneInformacion").is(':checked');
	rampa.tieneRampas = $("#nuevaTieneRampas").is(':checked');
	rampa.buenEstado = $("#nuevaBuenEstado").is(':checked');
	rampa.crucesAccesibles = $("#nuevaCrucesAccesibles").is(':checked');
	rampa.reportada = true;
	rampa.reportes = "Nueva";
	return rampa;
}

function nuevaRampa(rampa){
	console.log("A punto de guardar una rampa...");
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			limpiarHTMLRampas();
			$('#resultadoNuevaRampa').html("Se dio de alta la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
		},
		statusCode: {
			409: function () { 
				limpiarHTMLRampas();
				$('#resultadoNuevaRampa').html("Hubo un error al grabar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR RAMPA POR UBICACION ----- **/

function buscarRampaPorUbicacion(latitud, longitud){
	console.log("A punto de buscar rampas por ubicacion...");
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/rampas/Rampas/latlng/"+ latitud + "/" + longitud,
		success: function (rampa) {
			limpiarHTMLRampas();
			$('#resultadoBuscarRampaPorUbicacion').html(JSON.stringify(rampa));
			rampaTotal = rampa;
			$("#modificarId").val(rampa.id);
			$("#modificarLat").val(rampa.latitud);
			$("#modificarLng").val(rampa.longitud);
			$("#modificarBarrio").val(rampa.barrio);
			$("#modificarTieneInformacion").prop("checked",rampa.tieneInformacion);
			$("#modificarTieneRampas").prop("checked",rampa.tieneRampas);
			$("#modificarBuenEstado").prop("checked",rampa.buenEstado);
			$("#modificarCrucesAccesibles").prop("checked",rampa.crucesAccesibles);
			$("#modificarReportada").prop("checked",rampa.reportada);
			$("#modificarReportes").val(rampa.reportes);
			$("#modificarBoton").prop("disabled",false);
			$("#reportarBoton").prop("disabled",false);
			$("#borrarBoton").prop("disabled",false);
		},
		statusCode: {
			404: function () { 
				limpiarHTMLRampas();
				$('#resultadoBuscarRampaPorUbicacion').html("No se ha encontrado ninguna rampa en esa ubicacion.");
			}
		}
	});
}

/** ----- MODIFICAR RAMPA ----- **/

function generarRampaDesdeLosInputDeModificarRampa(){
	var rampa = {};
	rampa.id = rampaTotal.id;
	rampa.latitud = rampaTotal.latitud;
	rampa.longitud = rampaTotal.longitud;
	rampa.barrio = $("#modificarBarrio").val();
	rampa.tieneInformacion = $("#modificarTieneInformacion").is(':checked');
	rampa.tieneRampas = $("#modificarTieneRampas").is(':checked');
	rampa.buenEstado = $("#modificarBuenEstado").is(':checked');
	rampa.crucesAccesibles = $("#modificarCrucesAccesibles").is(':checked');
	rampa.reportada = false;
	rampa.reportes = "";
	return rampa;
}

function modificarRampa(rampa){
	console.log("A punto de modificar una rampa...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			limpiarHTMLRampas();
			$('#resultadoModificarRampa').html("Se modifico la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
		},
		statusCode: {
			409: function () { 
				limpiarHTMLRampas();
				$('#resultadoModificarRampa').html("Hubo un error al modificar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- REPORTAR RAMPA ----- **/

function generarRampaDesdeLosInputDeReportarRampa(){
	var rampa = {};
	rampa.id = rampaTotal.id;
	rampa.latitud = rampaTotal.latitud;
	rampa.longitud = rampaTotal.longitud;
	rampa.reportes = rampaTotal.reportes;
	if (rampaTotal.barrio != $("#modificarBarrio").val()) {
		if (rampa.reportes == "") {
			rampa.reportes = "Barrio: " + $("#modificarBarrio").val();
		}
		else {
			rampa.reportes = rampa.reportes + " ; Barrio: " + $("#modificarBarrio").val();
		}
	}
	rampa.barrio = rampaTotal.barrio;
	if (rampaTotal.tieneInformacion != $("#modificarTieneInformacion").is(':checked')) {
		if (rampa.reportes == "") {
			rampa.reportes = "TieneInformacion: " + $("#modificarTieneInformacion").is(':checked');
		}
		else {
			rampa.reportes = rampa.reportes + " ; TieneInformacion: " + $("#modificarTieneInformacion").is(':checked');
		}
	}
	rampa.tieneInformacion = rampaTotal.tieneInformacion;
	if (rampaTotal.tieneRampas != $("#modificarTieneRampas").is(':checked')) {
		if (rampa.reportes == "") {
			rampa.reportes = "TieneRampas: " + $("#modificarTieneRampas").is(':checked');
		}
		else {
			rampa.reportes = rampa.reportes + " ; TieneRampas: " + $("#modificarTieneRampas").is(':checked');
		}	
	}
	rampa.tieneRampas = rampaTotal.tieneRampas;
	if (rampaTotal.buenEstado != $("#modificarBuenEstado").is(':checked')) {
		if (rampa.reportes == "") {
			rampa.reportes = "BuenEstado: " + $("#modificarBuenEstado").is(':checked');
		}
		else {
			rampa.reportes = rampa.reportes + " ; BuenEstado: " + $("#modificarBuenEstado").is(':checked');
		}
	}	
	rampa.buenEstado = rampaTotal.buenEstado;
	if (rampaTotal.crucesAccesibles != $("#modificarCrucesAccesibles").is(':checked')) {
		if (rampa.reportes == "") {
			rampa.reportes = "CrucesAccesibles: " + $("#modificarCrucesAccesibles").is(':checked');
		}
		else {
			rampa.reportes = rampa.reportes + " ; CrucesAccesibles: " + $("#modificarCrucesAccesibles").is(':checked');
		}
	}
	rampa.crucesAccesibles = rampaTotal.crucesAccesibles;
	rampa.reportada = true;
	return rampa;
}

function reportarRampa(rampa){
	console.log("A punto de reportar una rampa...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			limpiarHTMLRampas();
			$('#resultadoModificarRampa').html("Se reporto la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
		},
		statusCode: {
			409: function () { 
				limpiarHTMLRampas();
				$('#resultadoModificarRampa').html("Hubo un error al reportar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- BORRAR RAMPA ----- **/

function generarRampaDesdeLosInputDeBorrarRampa(){
	var rampa = {};
	rampa.id = rampaTotal.id
	rampa.latitud = rampaTotal.latitud;
	rampa.longitud = rampaTotal.longitud;
	rampa.barrio = rampaTotal.barrio;
	rampa.tieneInformacion = rampaTotal.tieneInformacion;
	rampa.tieneRampas = rampaTotal.tieneRampas;
	rampa.buenEstado = rampaTotal.buenEstado;
	rampa.crucesAccesibles = rampaTotal.crucesAccesibles;
	rampa.reportada = rampaTotal.reportada;
	rampa.reportes = rampaTotal.reportes;
	return rampa;
}

function borrarRampa(rampa){
	console.log("A punto de borrar una rampa...");
	$.ajax({
		type: "DELETE",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			limpiarHTMLRampas();
			$('#resultadoModificarRampa').html("Se borro la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
		},
		statusCode: {
			409: function () { 
				limpiarHTMLRampas();
				$('#resultadoModificarRampa').html("Hubo un error al desreportar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR RAMPAS POR BARRIO ----- **/

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

/** ---------- USUARIO ---------- **/

/** ----- NUEVO USUARIO POR MAIL ----- **/

function generarRampaDesdeLosInputDeNuevoUsuarioMail(){
	var usuario = {};
	usuario.nombre = $("#nuevoNombre").val();
	usuario.apellido = $("#nuevoApellido").val();
	usuario.mail = $("#nuevoMail").val();
	usuario.contraseña = $("#nuevoContrasenia").val();
	return usuario;
}

function nuevoUsuarioMail(usuario){
	console.log("A punto de guardar un usuario...");
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Usuarios",
		success: function (data) {
			$('#resultadoNuevoUsuarioMail').html("Se dio de alta el usuario: " + JSON.stringify(rampa) + "-- " + data.toString());
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Nuevo Usuario. ";
			resultado += "Contenido jqHR:" + jqXHR + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoNuevoUsuarioMail').html("Hubo un error al grabar el usuario en la base de datos.");
			}
		}
	});
}

/** ----- NUEVO USUARIO POR FACEBOOK ----- **/

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

/** ----- BUSCAR USUARIO POR MAIL ----- **/

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

/** ----- MODIFICAR USUARIO ----- **/

function generarRampaDesdeLosInputDeModificarUsuario(){
	var usuario = {};
	usuario.id = $("modificarId").val();
	usuario.nombre = $("#modificarNombre").val();
	usuario.apellido = $("#modificarApellido").val();
	usuario.mail = $("#modificarMail").val();
	usuario.contraseña = $("#modificarContrasenia").val();
	return usuario;
}

function modificarUsuario(usuario){
	console.log("A punto de modificar un usuario...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			$('#resultadoModificarUsuario').html("Se modifico el usuario: " + JSON.stringify(usuario) + "-- " + data.toString());
			$("#modificarBoton").prop("disabled",true);
			$("#borrarBoton").prop("disabled",true);
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Modificar Usuario. ";
			resultado += "Contenido jqHR:" + jqXHR.toString() + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoModificarUsuario').html("Hubo un error al modificar el usuario en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR USUARIO POR FACEBOOK ----- **/

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

/** ----- BUSCAR USUARIOS ----- **/

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
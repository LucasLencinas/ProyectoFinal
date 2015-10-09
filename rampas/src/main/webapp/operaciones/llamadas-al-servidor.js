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
	      // Operaciones con Rampas
	      $("#nuevaBoton").prop("disabled",false);
	      $("#buscarBoton").prop("disabled",false);
	      $("#barrioBoton").prop("disabled",false);
	      $("#reportadasBoton").prop("disabled",false);
	      // Operaciones con Usuarios
	      $("#nuevoUsuarioMailBoton").prop("disabled",false);
	      $("#nuevoUsuarioFacebookBoton").prop("disabled",false);
	      $("#buscarUsuarioMailBoton").prop("disabled",false);
	      $("#buscarUsuarioFacebookBoton").prop("disabled",false);
	      $("#buscarUsuariosBoton").prop("disabled",false);
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
	$('#resultadoBuscarRampa').html("Todavia no se busco una rampa.");
	$('#resultadoModificarRampa').html("Todavia no se modifico/reporto/borro una rampa.");
	$('#resultadoBuscarRampasPorBarrio').html("Todavia no se buscaron rampas por barrio.");
	$('#resultadoBuscarRampasReportadas').html("Todavia no se buscaron rampas reportadas.");
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
				$('#resultadoNuevaRampa').html("Hubo un error al guardar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR RAMPA ----- **/

function buscarRampa(latitud, longitud){
	console.log("A punto de buscar rampa...");
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/rampas/Rampas/latlng/"+ latitud + "/" + longitud,
		success: function (rampa) {
			limpiarHTMLRampas();
			$('#resultadoBuscarRampa').html(JSON.stringify(rampa));
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
				$('#resultadoBuscarRampa').html("No se ha encontrado ninguna rampa.");
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
	rampa.id = rampaTotal.id;
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
				$('#resultadoModificarRampa').html("Hubo un error al borrar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR RAMPAS REPORTADAS ----- **/

function buscarRampasReportadas(cantidad){
	console.log("A punto de buscar rampas reportadas...");
	$.ajax({
		type:"GET",
		dataType: "json",
		url: "/rampas/Rampas/reportadas",
		success: function(rampas){
			limpiarHTMLRampas();
			if(rampas.length > 10){ //Para que no me muestre las 500 rampas
				rampas = rampas.slice(0, 11);
			}
			$('#resultadoBuscarRampasReportadas').html(JSON.stringify(rampas));
		},
		statusCode: {
			404: function () { 
				limpiarHTMLRampas();
				$('#resultadoBuscarRampasReportadas').html("No se ha encontrado ninguna rampa con ese barrio.");
			}
		}
	});
}

/** ----- BUSCAR RAMPAS POR BARRIO ----- **/

function buscarRampasPorBarrio(barrio){
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

var usuarioTotal = {}

/** ----- HTML ----- **/

function limpiarHTMLUsuarios() {
	$("#nuevoNombreMail").val(""); 
	$("#nuevoApellidoMail").val("");
	$("#nuevoMail").val("");
	$("#nuevoContrasenia").val("");
	$("#nuevoNombreFacebook").val("");
	$("#nuevoApellidoFacebook").val("");
	$("#nuevoFacebook").val("");
	$("#modificarIdMail").val("");
	$("#modificarNombreMail").val("");
	$("#modificarApellidoMail").val("");
	$("#modificarMail").val("");
	$("#modificarContrasenia").val("");
	$("#modificarIdFacebook").val("");
	$("#modificarNombreFacebook").val("");
	$("#modificarApellidoFacebook").val("");
	$("#modificarFacebook").val("");
	$("#modificarUsuarioMailBoton").prop("disabled",true);
	$("#borrarUsuarioMailBoton").prop("disabled",true);
	$("#modificarUsuarioFacebookBoton").prop("disabled",true);
	$("#borrarUsuarioFacebookBoton").prop("disabled",true);
	$('#resultadoNuevoUsuarioMail').html("Todavia no se dio de alta un usuario por mail.");
	$('#resultadoBuscarUsuarioMail').html("Todavia no se busco un usuario por mail.");
	$('#resultadoModificarUsuarioMail').html("Todavia no se modifico/borro un usuario por mail.");
	$('#resultadoNuevoUsuarioFacebook').html("Todavia no se dio de alta un usuario por facebook.");
	$('#resultadoBuscarUsuarioFacebook').html("Todavia no se busco un usuario por facebook.");
	$('#resultadoModificarUsuarioFacebook').html("Todavia no se modifico/borro un usuario por facebook.");
	$('#resultadoBuscarUsuarios').html("Todavia no se buscaron usuarios.");
}

/** ----- NUEVO USUARIO POR MAIL ----- **/

function generarUsuarioDesdeLosInputDeNuevoUsuarioMail(){
	var usuario = {};
	usuario.nombre = $("#nuevoNombreMail").val();
	usuario.apellido = $("#nuevoApellidoMail").val();
	usuario.mail = $("#nuevoMail").val();
	usuario.contraseña = $("#nuevoContrasenia").val();
	return usuario;
}

function nuevoUsuarioMail(usuario){
	console.log("A punto de guardar un usuario...");
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			limpiarHTMLUsuarios();
			$('#resultadoNuevoUsuarioMail').html("Se dio de alta el usuario: " + JSON.stringify(usuario) + "-- " + data.toString());
		},
		statusCode: {
			409: function () { 
				limpiarHTMLUsuarios();
				$('#resultadoNuevoUsuarioMail').html("Hubo un error al guardar el usuario en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR USUARIO POR MAIL ----- **/

function buscarUsuarioMail(mail){
	console.log("A punto de buscar usuario por mail...");
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/rampas/Usuarios/mail/" + mail,
		success: function (usuario) {
			limpiarHTMLUsuarios();
			$('#resultadoBuscarUsuarioMail').html(JSON.stringify(usuario));
			usuarioTotal = usuario;
			$("#modificarIdMail").val(usuario.id);
			$("#modificarNombreMail").val(usuario.nombre);
			$("#modificarApellidoMail").val(usuario.apellido);
			$("#modificarMail").val(usuario.mail);
			$("#modificarContrasenia").val(usuario.contraseña)
			$("#modificarUsuarioMailBoton").prop("disabled",false);
			$("#borrarUsuarioMailBoton").prop("disabled",false);
		},
		statusCode: {
			404: function () { 
				limpiarHTMLUsuarios();
				$('#resultadoBuscarUsuarioMail').html("No se ha encontrado ningun usuario con ese mail.");
			
			}
		}
	});
}

/** ----- MODIFICAR USUARIO POR MAIL ----- **/

function generarUsuarioDesdeLosInputDeModificarUsuarioMail(){
	var usuario = {};
	usuario.id = $("#modificarIdMail").val();
	usuario.nombre = $("#modificarNombreMail").val();
	usuario.apellido = $("#modificarApellidoMail").val();
	usuario.mail = $("#modificarMail").val();
	usuario.contraseña = $("#modificarContrasenia").val();
	return usuario;
}

function modificarUsuarioMail(usuario){
	console.log("A punto de modificar un usuario por mail...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			limpiarHTMLUsuarios();
			$('#resultadoModificarUsuarioMail').html("Se modifico el usuario: " + JSON.stringify(usuario) + "-- " + data.toString());
		},
		statusCode: {
			409: function () { 
				limpiarHTMLUsuarios();
				$('#resultadoModificarUsuarioMail').html("Hubo un error al modificar el usuario en la base de datos.");
			}
		}
	});
}

/** ----- BORRAR USUARIO POR MAIL ----- **/

function generarUsuarioDesdeLosInputDeBorrarUsuarioMail(){
	var usuario = {};
	usuario.id = usuarioTotal.id;
	usuario.nombre = usuarioTotal.nombre;
	usuario.apellido = usuarioTotal.apellido;
	usuario.mail = usuarioTotal.mail;
	usuario.contraseña = usuarioTotal.contraseña;
	return usuario;
}

function borrarUsuarioMail(usuario){
	console.log("A punto de borrar un usuario por mail...");
	$.ajax({
		type: "DELETE",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			limpiarHTMLUsuarios();
			$('#resultadoModificarUsuarioMail').html("Se borro el usuario: " + JSON.stringify(usuario) + "-- " + data.toString());
		},
		statusCode: {
			409: function () { 
				limpiarHTMLUsuarios();
				$('#resultadoModificarUsuarioMail').html("Hubo un error al borrar el usuario en la base de datos.");
			}
		}
	});
}

/** ----- NUEVO USUARIO POR FACEBOOK ----- **/

function generarUsuarioDesdeLosInputDeNuevoUsuarioFacebook(){
	var usuario = {};
	usuario.nombre = $("#nuevoNombreFacebook").val();
	usuario.apellido = $("#nuevoApellidoFacebook").val();
	usuario.facebook = $("#nuevoFacebook").val();
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
			limpiarHTMLUsuarios();
			$('#resultadoNuevoUsuarioFacebook').html("Se dio de alta el usuario: " + JSON.stringify(usuario) + "-- " + data.toString());
		},
		statusCode: {
			409: function () { 
				limpiarHTMLUsuarios();
				$('#resultadoNuevoUsuarioFacebook').html("Hubo un error al guardar el usuario en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR USUARIO POR FACEBOOK ----- **/

function buscarUsuarioFacebook(facebook){
	console.log("A punto de buscar usuario por facebook...");
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/rampas/Usuarios/facebook/" + facebook,
		success: function (usuario) {
			limpiarHTMLUsuarios();
			$('#resultadoBuscarUsuarioFacebook').html(JSON.stringify(usuario));
			usuarioTotal = usuario;
			$("#modificarIdFacebook").val(usuario.id);
			$("#modificarNombreFacebook").val(usuario.nombre);
			$("#modificarApellidoFacebook").val(usuario.apellido);
			$("#modificarFacebook").val(usuario.facebook);
			$("#modificarUsuarioFacebookBoton").prop("disabled",false);
			$("#borrarUsuarioFacebookBoton").prop("disabled",false);
		},
		statusCode: {
			404: function () { 
				limpiarHTMLUsuarios();
				$('#resultadoBuscarUsuarioFacebook').html("No se ha encontrado ningun usuario con ese facebook.");
			}
		}
	});
}

/** ----- MODIFICAR USUARIO POR FACEBOOK ----- **/

function generarUsuarioDesdeLosInputDeModificarUsuarioFacebook(){
	var usuario = {};
	usuario.id = $("#modificarIdFacebook").val();
	usuario.nombre = $("#modificarNombreFacebook").val();
	usuario.apellido = $("#modificarApellidoFacebook").val();
	usuario.facebook = $("#modificarFacebook").val();
	return usuario;
}

function modificarUsuarioFacebook(usuario){
	console.log("A punto de modificar un usuario por facebook...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			limpiarHTMLUsuarios();
			$('#resultadoModificarUsuarioFacebook').html("Se modifico el usuario: " + JSON.stringify(usuario) + "-- " + data.toString());
		},
		statusCode: {
			409: function () { 
				limpiarHTMLUsuarios();
				$('#resultadoModificarUsuarioFacebook').html("Hubo un error al modificar el usuario en la base de datos.");
			}
		}
	});
}

/** ----- BORRAR USUARIO POR FACEBOOK ----- **/

function generarUsuarioDesdeLosInputDeBorrarUsuarioFacebook(){
	var usuario = {};
	usuario.id = usuarioTotal.id;
	usuario.nombre = usuarioTotal.nombre;
	usuario.apellido = usuarioTotal.apellido;
	usuario.facebook = usuarioTotal.facebook;
	return usuario;
}

function borrarUsuarioFacebook(usuario){
	console.log("A punto de borrar un usuario por facebook...");
	$.ajax({
		type: "DELETE",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			limpiarHTMLUsuarios();
			$('#resultadoModificarUsuarioFacebook').html("Se borro el usuario: " + JSON.stringify(usuario) + "-- " + data.toString());
		},
		statusCode: {
			409: function () { 
				limpiarHTMLUsuarios();
				$('#resultadoModificarUsuarioFacebook').html("Hubo un error al borrar el usuario en la base de datos.");
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
			limpiarHTMLUsuarios();
			$('#resultadoBuscarUsuarios').html(JSON.stringify(usuarios));
		},
		statusCode: {
			404: function () { 
				limpiarHTMLUsuarios();
				$('#resultadoBuscarUsuarios').html("No se ha encontrado ningun usuario.");
			}
		}
	});
}
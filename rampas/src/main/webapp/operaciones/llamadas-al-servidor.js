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
	  },
	  error: function (jqXHR, textStatus, errorThrown) {
	      var resultado = "Error - Carga inicial. ";
	      resultado += "Contenido jqHR:" + jqXHR + ". ";
	      resultado += "Contenido textStatus:" + textStatus + ". ";
	      resultado += "Contenido errorThrown:" + errorThrown + ". ";
	      alert(resultado);
	  },
	  complete: function (jqXHR, textStatus) {
	      var resultado = "Complete - Carga inicial. ";
	      resultado += "Contenido jqHR:" + jqXHR + ". ";
	      resultado += "Contenido textStatus:" + textStatus + ". ";
	      alert(resultado);
	  }
  });
}

/** ---------- RAMPA ---------- **/

/** ----- NUEVA RAMPA ----- **/

function generarRampaDesdeLosInputDeNuevaRampa(){
	var rampa = {};
	rampa.latitud = $("#nuevaLat").val(); 
	rampa.longitud = $("#nuevaLng").val();
	rampa.barrio = $("#nuevaBarrio").val();
	rampa.tieneInformacion = $("#nuevaTieneInformacion").is(':checked');
	rampa.tieneRampas = $("#nuevaTieneRampas").is(':checked');
	rampa.buenEstado = $("#nuevaBuenEstado").is(':checked');
	rampa.todosCrucesAccesibles = $("#nuevaTodosCrucesAccesibles").is(':checked');
	rampa.reportada = $("#nuevaReportada").is(':checked');
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
			$('#resultadoNuevaRampa').html("Se dio de alta la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Nueva Rampa. ";
			resultado += "Contenido jqHR:" + jqXHR + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoNuevaRampa').html("Hubo un error al grabar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR RAMPA POR UBICACION ----- **/

function limpiarHTML() {
	$("#modificarId").val("");
	$("#modificarLat").val("");
	$("#modificarLng").val("");
	$("#modificarBarrio").val("");
	$("#modificarTieneInformacion").prop("checked",false);
	$("#modificarTieneRampas").prop("checked",false);
	$("#modificarBuenEstado").prop("checked",false);
	$("#modificarTodosCrucesAccesibles").prop("checked",false);
	$("#modificarReportada").prop("checked",false);
	$("#modificarBoton").prop("disabled",true);
	$("#reportarBoton").prop("disabled",true);
	$("#desreportarBoton").prop("disabled",true);
	$("#borrarBoton").prop("disabled",true);
}

function buscarRampaPorUbicacion(latitud, longitud){
	console.log("A punto de buscar rampas por ubicacion...");
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/rampas/Rampas/latlng/"+ latitud + "/" + longitud,
		success: function (rampa) {
			$('#resultadoBuscarRampaPorUbicacion').html(JSON.stringify(rampa));
			$("#modificarId").val(rampa.id);
			$("#modificarLat").val(rampa.latitud);
			$("#modificarLng").val(rampa.longitud);
			$("#modificarBarrio").val(rampa.barrio);
			$("#modificarTieneInformacion").prop("checked",rampa.tieneInformacion);
			$("#modificarTieneRampas").prop("checked",rampa.tieneRampas);
			$("#modificarBuenEstado").prop("checked",rampa.buenEstado);
			$("#modificarTodosCrucesAccesibles").prop("checked",rampa.todosCrucesAccesibles);
			$("#modificarReportada").prop("checked",rampa.reportada);
			$("#modificarBoton").prop("disabled",false);
			if (rampa.reportada) {
				$("#desreportarBoton").prop("disabled",false);
			}
			else {
				$("#reportarBoton").prop("disabled",false);
			}
			$("#borrarBoton").prop("disabled",false);
		},
		statusCode: {
			404: function () { 
				limpiarHTML();
				$('#resultadoBuscarRampaPorUbicacion').html("No se ha encontrado ninguna rampa en esa ubicacion.");
			
			}
		}
	});
}

/** ----- MODIFICAR RAMPA ----- **/

function generarRampaDesdeLosInputDeModificarRampa(){
	var rampa = {};
	rampa.id = $("#modificarId").val();
	rampa.latitud = $("#modificarLat").val(); 
	rampa.longitud = $("#modificarLng").val();
	rampa.barrio = $("#modificarBarrio").val();
	rampa.tieneInformacion = $("#modificarTieneInformacion").is(':checked');
	rampa.tieneRampas = $("#modificarTieneRampas").is(':checked');
	rampa.buenEstado = $("#modificarBuenEstado").is(':checked');
	rampa.todosCrucesAccesibles = $("#modificarTodosCrucesAccesibles").is(':checked');
	rampa.reportada = $("#modificarReportada").is(':checked');
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
			$('#resultadoModificarRampa').html("Se modifico la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
			$("#modificarBoton").prop("disabled",true);
			$("#reportarBoton").prop("disabled",true);
			$("#desreportarBoton").prop("disabled",true);
			$("#borrarBoton").prop("disabled",true);
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Modificar Rampa. ";
			resultado += "Contenido jqHR:" + jqXHR.toString() + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoModificarRampa').html("Hubo un error al modificar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- REPORTAR RAMPA ----- **/

function generarRampaDesdeLosInputDeReportarRampa(){
	
	var rampa = {};
	rampa.id = $("#modificarId").val();
	rampa.latitud = $("#modificarLat").val(); 
	rampa.longitud = $("#modificarLng").val();
	rampa.barrio = $("#modificarBarrio").val();
	rampa.tieneInformacion = $("#modificarTieneInformacion").is(':checked');
	rampa.tieneRampas = $("#modificarTieneRampas").is(':checked');
	rampa.buenEstado = $("#modificarBuenEstado").is(':checked');
	rampa.todosCrucesAccesibles = $("#modificarTodosCrucesAccesibles").is(':checked');
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
			$('#resultadoModificarRampa').html("Se reporto la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
			$("#modificarReportada").prop('checked',true);
			$("#modificarBoton").prop("disabled",true);
			$("#reportarBoton").prop("disabled",true);
			$("#desreportarBoton").prop("disabled",true);
			$("#borrarBoton").prop("disabled",true);
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Reportar Rampa. ";
			resultado += "Contenido jqHR:" + jqXHR.toString() + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoModificarRampa').html("Hubo un error al reportar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- DESREPORTAR RAMPA ----- **/

function generarRampaDesdeLosInputDeDesreportarRampa(){
	var rampa = {};
	rampa.id = $("#modificarId").val();
	rampa.latitud = $("#modificarLat").val(); 
	rampa.longitud = $("#modificarLng").val();
	rampa.barrio = $("#modificarBarrio").val();
	rampa.tieneInformacion = $("#modificarTieneInformacion").is(':checked');
	rampa.tieneRampas = $("#modificarTieneRampas").is(':checked');
	rampa.buenEstado = $("#modificarBuenEstado").is(':checked');
	rampa.todosCrucesAccesibles = $("#modificarTodosCrucesAccesibles").is(':checked');
	rampa.reportada = false;
	return rampa;
}

function desreportarRampa(rampa){
	console.log("A punto de desreportar una rampa...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			$('#resultadoModificarRampa').html("Se desreporto la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
			$("#modificarReportada").prop('checked',false);
			$("#modificarBoton").prop("disabled",true);
			$("#reportarBoton").prop("disabled",true);
			$("#desreportarBoton").prop("disabled",true);
			$("#borrarBoton").prop("disabled",true);
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Desreportar Rampa. ";
			resultado += "Contenido jqHR:" + jqXHR.toString() + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoModificarRampa').html("Hubo un error al desreportar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- BORRAR RAMPA ----- **/

function generarRampaDesdeLosInputDeBorrarRampa(){
	var rampa = {};
	rampa.id = $("#modificarId").val();
	rampa.latitud = $("#modificarLat").val(); 
	rampa.longitud = $("#modificarLng").val();
	rampa.barrio = $("#modificarBarrio").val();
	rampa.tieneInformacion = $("#modificarTieneInformacion").is(':checked');
	rampa.tieneRampas = $("#modificarTieneRampas").is(':checked');
	rampa.buenEstado = $("#modificarBuenEstado").is(':checked');
	rampa.todosCrucesAccesibles = $("#modificarTodosCrucesAccesibles").is(':checked');
	rampa.reportada = $("#modificarReportada").is(':checked');
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
			$('#resultadoModificarRampa').html("Se borro la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
			$("#modificarBoton").prop("disabled",true);
			$("#reportarBoton").prop("disabled",true);
			$("#desreportarBoton").prop("disabled",true);
			$("#borrarBoton").prop("disabled",true);
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Borrar Rampa. ";
			resultado += "Contenido jqHR:" + jqXHR.toString() + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoModificarRampa').html("Hubo un error al desreportar la rampa en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR RAMPAS POR BARRIO ----- **/

function buscarRampaPorBarrio(barrio,cantidad){
  $.ajax({
    type:"GET",
    dataType: "json",
    url: "/rampas/Rampas/barrios/" + barrio,
    success: function(rampas){
      if(rampas.length > 10){ //Para que no me muestre las 500 rampas por barrio.
        rampas = rampas.slice(0, 11);
      }
      $('#resultadoBuscarRampaPorBarrio').html(JSON.stringify(rampas));
    },
    statusCode: {
      404: function () { 
        $('#resultadoBuscarRampaPorBarrio').html("No se ha encontrado ninguna rampa con ese barrio.");
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

function limpiarHTML() {
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
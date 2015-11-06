var usuarios = 
	[
		{"nombre": "Administrador", "apellido": "Administrador", "mail": "admin", "contraseña": "admin", "administrador": "true"},
		{"nombre": "Federico", "apellido": "Diaz", "mail": "fedee_vpc@hotmail.com", "contraseña": "federico", "administrador": "true"},
		{"nombre": "Matias", "apellido": "Dionisi", "mail": "matiasdionisi22@hotmail.com", "contraseña" : "matias", "administrador": "true"},
		{"nombre": "Lucas", "apellido": "Lencinas", "mail": "lllencinas@gmail.com", "contraseña": "lucas", "administrador": "true"},
		{"nombre": "Daniel", "apellido": "Ordoñez", "mail": "danivelez21@hotmail.com", "contraseña": "daniel", "administrador": "true"},
		{"nombre": "Martin", "apellido": "Soifer", "mail": "marsoifer.91@gmail.com", "contraseña": "martin", "administrador": "true"},
	]

var ubicacion;
	
function listarUsuarios(usuarios){
		var tabla = document.getElementById("usEliminar");
		limpiarTabla(tabla);
		$.each(usuarios, function(k,v){
			if(!v.administrador){
				var fila = tabla.insertRow(tabla.rows.length);
				var columnaCheck = fila.insertCell(0);
				var columnaNombre = fila.insertCell(1);
				var columnaApellido = fila.insertCell(2);
				var columnaId = fila.insertCell(3);
				var check = document.createElement("input");
				check.type = "checkbox";
				columnaCheck.appendChild(check);
				columnaNombre.innerHTML=v.nombre;
				columnaApellido.innerHTML=v.apellido;
				columnaId.innerHTML=v.id;
				columnaId.style.display="none";
			}
		});	
}

function limpiarTabla(tabla){
	while(tabla.rows.length){
		tabla.deleteRow(0);
	}
}

function eliminar(){
	var tabla = document.getElementById("usEliminar");
	var ue =[];
	var usEl={};
	for (var j=i=0; i<tabla.rows.length;i++ ){
		if(tabla.rows[i].cells[0].childNodes[0].checked){
			ue[j] = tabla.rows[i].cells[3].innerHTML;
			usEl.id=tabla.rows[i].cells[3].innerHTML;
//			borrarUsuario(usEl);
			borrarUsuarioPorId(usEl.id)
			tabla.deleteRow(i);
			i--;
			j++;
		}
	}
	if(!tabla.rows.length){
		cerrarTodo();
		alerta("No hay ningun usuario comun para eliminar.");
	}
}

/** ----- NUEVO USUARIO POR MAIL ----- **/
function nuevoUsuarioMail(usuario){
	mostrarLoading();
	console.log("A punto de guardar un usuario...");
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			ocultarLoading();
			mostrarMensajeBienvenidaRegistro();
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			409: function () {
			ocultarLoading();
				alerta("Hubo un error al registrar el usuario en la base de datos.");
			}
		}
	});
}

/** ----- NUEVO USUARIO POR FACEBOOK ----- **/
function nuevoUsuarioFacebook(usuario){
	mostrarLoading();
	console.log("A punto de guardar un usuario...");
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
				ocultarLoading();
				mostrarMensajeBienvenidaRegistro();
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			409: function () { 
				ocultarLoading();
				alerta("Hubo un error al registrar el usuario en la base de datos.");
			}
		}
	});
}

var idSesion = -1;									//Sesion cerrada
var unUsuario={};									//Usuario GLOBAL

/** ----- BUSCAR USUARIO POR MAIL ----- **/
function autenticar(mail,pass){
	mostrarLoading();
	var encontro = false;
	console.log("A punto de buscar usuario por mail...");
	$.ajax({
		async:false, //Si no lo hago sincronico resulve mal
		type: "GET",
		dataType: "json",
		url: "/rampas/Usuarios/mail/" + mail,
		success: function (usuario) {
			ocultarLoading();
			encontro = (usuario.contraseña == pass);//Esto se deberia hacer en dentro del query
			idSesion=usuario.id;					//identificador Usuario para poder Modificar
			unUsuario = usuario;
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			404: function () { 
			ocultarLoading();
			}
		}
	});
	return encontro;
}

function existeUsuarioRegistrado(mail,idUsuario){
	mostrarLoading();
	var encontro = false;
	console.log("A punto de buscar usuario por mail...");
	$.ajax({
		async:false, //Si no lo hago sincronico resulve mal
		type: "GET",
		dataType: "json",
		url: "/rampas/Usuarios/mail/" + mail,
		success: function (usuario) {
			ocultarLoading();
			unUsuario =  usuario;
			encontro=(usuario.id != idUsuario);//true Existe usuario (registrar)|(modificar) NO se puede usar
		},
		complete:function (){
			ocultarLoading();
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
	mostrarLoading();
	console.log("A punto de modificar un usuario...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			ocultarLoading();
			alerta("Se modifico el usuario correctamente.");// + JSON.stringify(usuario) + "-- " + data.toString());
		},
		complete: function (jqXHR, textStatus) {
//			var resultado = "Complete - Modificar Usuario. ";
//			resultado += "Contenido jqHR:" + jqXHR.toString() + ". ";
//			resultado += "Contenido textStatus:" + textStatus + ". ";
			ocultarLoading();
		},
		statusCode: {
			409: function () { 
				alerta("Hubo un error al modificar el usuario en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR USUARIO POR FACEBOOK ----- **/
function buscarUsuarioFacebook(facebook){
	mostrarLoading();
	var encontro = false;
	console.log("A punto de buscar usuario por facebook...");
	$.ajax({
		async:false, //Si no lo hago sincronico resulve mal
		type: "GET",
		dataType: "json",
		url: "/rampas/Usuarios/facebook/" + facebook,
		success: function (usuario) {
			ocultarLoading();
			unUsuario = usuario;	//GLOBAL
			encontro = true;
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			404: function () { 
				
			}
		}
	});
	return encontro;
}

/** ----- MODIFICAR USUARIO POR FACEBOOK ----- **/
function modificarUsuarioFacebook(usuario){
	mostrarLoading();
	console.log("A punto de modificar un usuario por facebook...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			ocultarLoading();
			alerta("Se modifico el usuario correctamente según su cuenta en Facebook.");// + JSON.stringify(usuario) + "-- " + data.toString());
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			409: function () { 
				alerta("Hubo un error al modificar el usuario en la base de datos.");
			}
		}
	});
}

/** ----- BUSCAR USUARIOS ----- **/
function buscarUsuarios(){
	mostrarLoading();
	console.log("A punto de buscar usuarios...");
	$.ajax({
			async:false, //Si no lo hago sincronico resulve mal
		type: "GET",
		dataType: "json",
		url: "/rampas/Usuarios/usuarios",
		success: function (usuarios) {
			ocultarLoading();
			listarUsuarios(usuarios);
			$('#resultadoBuscarUsuarios').html(JSON.stringify(usuarios));
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			404: function () { 
				$('#resultadoBuscarUsuarios').html("No se ha encontrado ningun usuario.");
			}
		}
	});
}

/** ----- BORRAR USUARIO ----- **/
function borrarUsuario(usuario){
	mostrarLoading();
	console.log("A punto de borrar un usuario ...");
	$.ajax({
		type: "DELETE",
		contentType: "application/json",
		data: JSON.stringify(usuario),
		url: "/rampas/Usuarios",
		success: function (data) {
			ocultarLoading();
			alerta("Se elimino el usuario correctamente.");// + JSON.stringify(usuario) + "-- " + data.toString());
		},
		complete:function (){
			ocultarLoading();
		},
		statusCode: {
			409: function () { 
				alerta("Hubo un error al borrar el usuario en la base de datos.");
			}
		}
	});
}

function borrarUsuarioPorId(id){
	mostrarLoading();
	console.log("A punto de borrar usuario por id...");
	$.ajax({
		type: "DELETE",
		dataType: "json",
		url: "/rampas/Usuarios/id/" + id,
		statusCode: {
    		200: function (){
				alerta("Se elimino el usuario correctamente.");
				console.log("Borrar Usuario: Success");	
				ocultarLoading();
    		},
			404: function () { 
				console.log("Borrar Usuario: No existe");	
				ocultarLoading();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("Borrar Usuario: Hubo un error en el servidor");
	    	console.log(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + ". " + JSON.stringify(errorThrown));
	    }
	});
}

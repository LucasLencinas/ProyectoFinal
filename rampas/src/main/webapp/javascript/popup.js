function cerrarTodo(){
	var whitebg = document.getElementById("white-background");
	var dlgboxRegistro = document.getElementById("dlgboxRegistro");
	var dlgboxRegistroMail = document.getElementById("dlgboxRegistroMail");
	var dlgboxIniciarMail = document.getElementById("dlgboxIniciarMail");
	var dlgboxCerrarSesion = document.getElementById("dlgboxCerrarSesion");
	var dlgboxIniciar = document.getElementById("dlgboxIniciar");
	var dlgboxeliminarUsuarios = document.getElementById("dlgboxeliminarUsuarios");
	var dlgboxModificarRampa = document.getElementById("dlgboxModificarRampa");
	var dlgboxAlerta = document.getElementById("dlgboxAlerta");
	var dlgboxModificarUsuario =  document.getElementById("dlgboxModificarUsuario");
	var dlgboxReportarRampa =  document.getElementById("dlgboxReportarRampa");
	var dlgboxEliminarRampa =  document.getElementById("dlgboxEliminarRampa");
	whitebg.style.display = "none";
	dlgboxRegistro.style.display = "none";
	dlgboxRegistroMail.style.display = "none";
	dlgboxIniciarMail.style.display = "none";
	dlgboxCerrarSesion.style.display = "none";
	dlgboxIniciar.style.display = "none";
	dlgboxeliminarUsuarios.style.display = "none";
	dlgboxNuevaRampa.style.display = "none";
	dlgboxModificarRampa.style.display = "none";
	dlgboxAlerta.style.display = "none";
	dlgboxModificarUsuario.style.display = "none";
	dlgboxReportarRampa.style.display = "none";
	dlgboxEliminarRampa.style.display = "none";
	cerrarReporte();
}
function showdlgboxIniciar(){
	var whitebg = document.getElementById("white-background");
	var dlgboxIniciar = document.getElementById("dlgboxIniciar");
	whitebg.style.display = "block";
	dlgboxIniciar.style.display = "block";
	centrar(dlgboxIniciar);
}
function showdlgboxRegistro(){
	var whitebg = document.getElementById("white-background");
	var dlgboxRegistro = document.getElementById("dlgboxRegistro");
	whitebg.style.display = "block";
	dlgboxRegistro.style.display = "block";
	centrar(dlgboxRegistro);
}
function showdlgboxRegistroMail(){
	var dlgboxRegistro = document.getElementById("dlgboxRegistro");
	var dlgboxRegistroMail = document.getElementById("dlgboxRegistroMail");
	dlgboxRegistro.style.display = "none";
	dlgboxRegistroMail.style.display = "block";
	centrar(dlgboxRegistroMail);
}
function showdlgboxIniciarMail(){
	var dlgboxIniciar = document.getElementById("dlgboxIniciar");
	var dlgboxIniciarMail = document.getElementById("dlgboxIniciarMail");
	dlgboxIniciar.style.display = "none";
	dlgboxIniciarMail.style.display = "block";
	centrar(dlgboxIniciarMail);
}
function showdlgboxCerrarSesion(){
	var whitebg = document.getElementById("white-background");
	var dlgboxCerrarSesion = document.getElementById("dlgboxCerrarSesion");
	whitebg.style.display = "block";
	dlgboxCerrarSesion.style.display = "block";
	centrar(dlgboxCerrarSesion);
}
function showdlgboxeliminarUsuarios(){
	var whitebg = document.getElementById("white-background");
	var dlgboxeliminarUsuarios = document.getElementById("dlgboxeliminarUsuarios");
	buscarUsuarios();
	var tabla = document.getElementById("usEliminar");
	if(!tabla.rows.length){
			alerta("No hay ningun usuario comun para eliminar.");
	}else{
		whitebg.style.display = "block";
		dlgboxeliminarUsuarios.style.display = "block";
		centrar(dlgboxeliminarUsuarios);
	}
}
function showdlgboxNuevaRampa(latLng){
	document.getElementById("tieneRampaA").checked=false;
	document.getElementById("crucesAccesiblesA").checked=false;
	document.getElementById("buenEstadoA").checked=false;
	tieneRampaCheck('A');
	var dlgboxNuevaRampa = document.getElementById("dlgboxNuevaRampa");
ubicacion=latLng;	
	dlgboxNuevaRampa.style.display = "block";
	centrar(dlgboxNuevaRampa);
}
function cerrarDlgboxNuevaRampa(){
	cerrarTodo();
	marcardorNuevaRampa(unMarcadorNuevaRampa,null,true);
}
function showdlgboxModificarRampa(marcador){
	var dlgboxModificarRampa = document.getElementById("dlgboxModificarRampa");
	document.getElementById("tieneRampaM").checked=marcador.tieneRampas;
	document.getElementById("crucesAccesiblesM").checked=marcador.crucesAccesibles;
	document.getElementById("buenEstadoM").checked=checked=marcador.buenEstado;
	tieneRampaCheck('M');
ubicacion=marcador;	//GLOBAL
	dlgboxModificarRampa.style.display = "block";
	centrar(dlgboxModificarRampa);
}
function showdlgboxAlerta(mensaje,titulo){
	var tituloAlerta = document.getElementById("tituloAlerta");
	if(typeof titulo == 'undefined')
		tituloAlerta.innerHTML = "Alerta";
		else tituloAlerta.innerHTML = titulo;
	var textAlerta = document.getElementById("textAlerta");
	textAlerta.innerHTML="</br>" + mensaje;
	var dlgboxAlerta = document.getElementById("dlgboxAlerta");
	dlgboxAlerta.style.display = "block";
	centrar(dlgboxAlerta);
}
function alerta(mensaje,titulo){
	showdlgboxAlerta(mensaje,titulo);
}
function cerrardlgboxAlerta(){
	var dlgboxAlerta = document.getElementById("dlgboxAlerta");
	dlgboxAlerta.style.display = "none";
}
function showdlgboxAlertaCompartir(mensaje,titulo){
	var tituloAlerta = document.getElementById("tituloAlertaCompartir");
	if(typeof titulo == 'undefined')
		tituloAlerta.innerHTML = "Alerta";
		else tituloAlerta.innerHTML = titulo;
	var textAlerta = document.getElementById("textAlertaCompartir");
	textAlerta.innerHTML="</br>" + mensaje;
	var dlgboxAlerta = document.getElementById("dlgboxAlertaCompartir");
	dlgboxAlerta.style.display = "block";
	centrar(dlgboxAlerta);
}
function alertaCompartir(mensaje,titulo){
	showdlgboxAlertaCompartir(mensaje,titulo);
}
function cerrardlgboxAlertaCompartir(){
	var dlgboxAlerta = document.getElementById("dlgboxAlertaCompartir");
	dlgboxAlerta.style.display = "none";
}
function showdlgboxModificarUsuario(){
	if(typeof(unUsuario.facebook)=="undefined"){
		var whitebg = document.getElementById("white-background");
		var dlgboxModificarUsuario = document.getElementById("dlgboxModificarUsuario");
		whitebg.style.display = "block";
		dlgboxModificarUsuario.style.display = "block";
		autocompletarModificar(unUsuario);	//GLOBAL
		centrar(dlgboxModificarUsuario);
	}else{
		//if (confirm("sincronizar Datos Con Facebook?"))
			sincronizarDatosConFacebook();
			
	}
}
function showdlgboxEliminarRampa(marcador){
	var whitebg = document.getElementById("white-background");
	var dlgboxEliminarRampa = document.getElementById("dlgboxEliminarRampa");
	whitebg.style.display = "block";
	dlgboxEliminarRampa.style.display = "block";
	centrar(dlgboxEliminarRampa);
	ubicacion=marcador;	//GLOBAL
}
function botonEliminarRampa(){
	var marcador = ubicacion;//GLOBAL
	var dlgboxEliminarRampa =  document.getElementById("dlgboxEliminarRampa");
	var whitebg = document.getElementById("white-background");
	whitebg.style.display = "none";
	dlgboxEliminarRampa.style.display = "none";
	borrarRampaPorUbicacion(marcador.getPosition().lat(),marcador.getPosition().lng());
	marcador.setMap(null);
}
function showdlgboxReportarRampa(marcador){
var motivos= [{"nombre":"Rampa Rota"},{"nombre":"Mal estado"},{"nombre":"No existe rampa"},{"nombre":"Obstaculo"},{"nombre":"Otros"}]
	var dlgboxReportarRampa = document.getElementById("dlgboxReportarRampa");
					if(!document.getElementById("selectMotivo").length)
					$.each(motivos, function (index, value) {
					$("#selectMotivo").append($('<option/>', { 
						value: value.nombre,
						text : value.nombre 
					}).data("stringCoordenadas", value.limites)/*Una negrada para asociarle el limite al option de cada select.*/);
				});
	dlgboxReportarRampa.style.display = "block";
//	document.getElementById("tieneRampaR").checked=marcador.tieneRampas;
//	document.getElementById("crucesAccesiblesR").checked=marcador.crucesAccesibles;
//	document.getElementById("buenEstadoR").checked=checked=marcador.buenEstado;
//	tieneRampaCheck('R');
	ubicacion=marcador;	//GLOBAL
	document.getElementById("motivoPersonalizado").value = "";
	centrar(dlgboxReportarRampa);
}
function activarPersonalizada(){
	var motivoPersonalizado = document.getElementById("motivoPersonalizado");
	if($("#selectMotivo").prop("value")=="Otros")
		motivoPersonalizado.style.display="block"
		else motivoPersonalizado.style.display="none";
}
function tieneRampaCheck(accion){ //Modificar(M) Alta(A) Reportar(R)
	var crucesAccesibles = document.getElementById("crucesAccesibles"+accion);
	var buenEstado = document.getElementById("buenEstado"+accion);
	if(document.getElementById("tieneRampa"+accion).checked)
		{crucesAccesibles.disabled=false;
		buenEstado.disabled=false;
		}
		else{ 
		crucesAccesibles.checked=false;
		buenEstado.checked=false;
		crucesAccesibles.disabled=true;
		buenEstado.disabled=true;
		}
}
/***************************************************************************************************/
function cerrarTodoM(){
	cerrarTodo();
	var sesion = document.getElementById("nombre");
	document.getElementById("sesion").innerHTML = unUsuario.nombre;		//GLOBAL

var cerrar=document.createElement('li');
var configuracion=document.createElement('li');
var admin=document.createElement('li');
var reportadas=document.createElement('li');

var loguear = document.getElementById("loguear");
var registrar = document.getElementById("registrar");

cerrar.id='cerrar';
configuracion.id='configuracion';
admin.id='admin';
reportadas.id='reportadas';

cerrar.innerHTML="<a href='#' onclick='hideSesion(); showdlgboxCerrarSesion()'>Cerrar Sesión</a>";
configuracion.innerHTML="<a href='#' onclick='hideSesion(); showdlgboxModificarUsuario()'>Configuración</a>";
admin.innerHTML="<a href='#' onclick='hideSesion(); showdlgboxeliminarUsuarios()'>Usuarios</a>";
reportadas.innerHTML="<a href='#' onclick='hideSesion(); buscarRampasReportadas()'>Reportadas</a>";

document.getElementById("lista").appendChild(configuracion);
if(unUsuario.administrador)
	{document.getElementById("lista").appendChild(admin);
	document.getElementById("lista").appendChild(reportadas);}

document.getElementById("lista").appendChild(cerrar);
document.getElementById("lista").removeChild(loguear);
document.getElementById("lista").removeChild(registrar);
}
function cerrarSesion(){
cerrarTodo();
var loguear = document.createElement('li');
var registrar = document.createElement('li');

loguear.id='loguear';
registrar.id='registrar';

loguear.innerHTML="<a href='#' onclick='showdlgboxIniciar()'>Loguear</a>";
registrar.innerHTML="<a href='#' onclick='showdlgboxRegistro()'>Registrar</a>";


document.getElementById("lista").appendChild(loguear);
document.getElementById("lista").appendChild(registrar);

var cerrar = document.getElementById("cerrar");
document.getElementById("lista").removeChild(cerrar);
var configuracion = document.getElementById("configuracion");
document.getElementById("lista").removeChild(configuracion);
if(unUsuario.administrador){
	var admin = document.getElementById("admin");
	document.getElementById("lista").removeChild(admin);
	var reportadas = document.getElementById("reportadas");
	document.getElementById("lista").removeChild(reportadas);
	}

	document.getElementById("sesion").innerHTML = 'Sesión';
	if (!(typeof(unUsuario.facebook)=="undefined"))
		logoutFacebook();
	unUsuario={};
	idSesion=-1;//GLOBAL Sesion
	limpiarTextbox();
	limpiarMapa();
	cerrarSesionGuardada();
}
/**********************************************************************************************/
function centrar (box){
	var x=350;
	var y=50;
	if(window.innerWidth<900)
		x=150;
	if(window.innerWidth < 500 || window.innerHeight < 400){
		box.style.left = "0px";
		box.style.top = "0px";
	}else{
		box.style.left = (x + (window.innerWidth - x)/2 - box.scrollWidth/2)  + "px";
		box.style.top = (y + (window.innerHeight - y )/2 - box.scrollHeight/2)  + "px";
	}
}

function carga()
{
	posicion=0; elMovimiento=null;
	
	// IE
	if(navigator.userAgent.indexOf("MSIE")>=0) navegador=0;
	// Otros
	else navegador=1;
}
function comienzoMovimiento(event, id)
{
	elMovimiento=document.getElementById(id);
	// Obtengo la posicion del cursor
	cursorComienzoX=event.clientX+window.scrollX;
	cursorComienzoY=event.clientY+window.scrollY;
	document.addEventListener("mousemove", enMovimiento, true); 
	document.addEventListener("mouseup", finMovimiento, true);
	elComienzoX=parseInt(elMovimiento.style.left);
	elComienzoY=parseInt(elMovimiento.style.top);
}
function enMovimiento(event){  
	var xActual, yActual;
	xActual=event.clientX+window.scrollX;
	yActual=event.clientY+window.scrollY;
	
	if((elComienzoX+xActual-cursorComienzoX > 0) && (elComienzoX+xActual-cursorComienzoX < window.innerWidth-elMovimiento.scrollWidth ))
		elMovimiento.style.left=(elComienzoX+xActual-cursorComienzoX)+"px";
	if((elComienzoY+yActual-cursorComienzoY > 0) && (elComienzoY+yActual-cursorComienzoY < window.innerHeight-elMovimiento.scrollHeight ))
		elMovimiento.style.top=(elComienzoY+yActual-cursorComienzoY)+"px";
}

function finMovimiento(event){
	document.removeEventListener("mousemove", enMovimiento, true);
	document.removeEventListener("mouseup", finMovimiento, true); 
}
//Esto es para hacer click con el celular y que se muestre/oculte.. 
function  showSesion() {
	var lista = document.getElementById("lista");
	if (	lista.style.display == "block")
		lista.style.display = "";
		else lista.style.display = "block";
}
function hideSesion(){
	document.getElementById("lista").style.display = "";
}
//Iniciar Sesion
function iniciarSesion(){
	var nombre = document.getElementById("nombre").value;
	var pass = document.getElementById("pass").value;
	if(autenticar(nombre,pass)){
		cerrarTodoM();
		mostrarMensajeBienvenida(unUsuario.nombre);
		guardarSesion(unUsuario);
	}
		else {
			alerta("El Email o la contraseña es invalida","Error Autenticación");
			document.getElementById("pass").value = "";
		}
}
function cerrarDlgboxIniciarMail(){
	cerrarTodo();
	document.getElementById("nombre").value = "";
	document.getElementById("pass").value = "";
}
//Registrar Mail
function registrarMail(){
	var nombre = document.getElementById("nombreR").value;
	var apellido = document.getElementById("apellidoR").value;
	var mail = document.getElementById("emailR").value;
	var pass1 = document.getElementById("pass1R").value;
	var pass2 = document.getElementById("pass2R").value;

	if (validarRegistro(mail,nombre,apellido,pass1,pass2,-1)){//(-1 idSesion)
		var usuario = {};
		usuario.nombre = nombre;
		usuario.apellido = apellido;
		usuario.mail = mail;
		usuario.contraseña = pass1;
		usuario.administrador = false;
		unUsuario=usuario; //GLOBAL
		cerrarTodoM();
		nuevoUsuarioMail(usuario);
		mostrarMensajeBienvenida(unUsuario.nombre);
		cerrarTodo();
		unUsuario.id = -2;// Id fantasma hasta que se genera y persiste
		//autenticar(document.getElementById("emailR").value,document.getElementById("pass1R").value);cerrarTodoM(); No funciona, pide el logueo antes de la persistencia que tarda como 1 minuto
	}
}
function modificarMail(){
	var nombre = document.getElementById("nombreM").value;
	var apellido = document.getElementById("apellidoM").value;
	var mail = document.getElementById("emailM").value;
	var pass1 = document.getElementById("pass1M").value;
	var pass2 = document.getElementById("pass2M").value;
	
	if (validarRegistro(mail,nombre,apellido,pass1,pass2,unUsuario.id)){
				var usuario = {};
				usuario.id = unUsuario.id; //GLOBAL
				usuario.nombre = nombre;
				usuario.apellido = apellido;
				usuario.mail = mail;
				usuario.contraseña = pass1;
				usuario.administrador=unUsuario.administrador;
				unUsuario=usuario;			//GLOBAL
				modificarUsuarioMail(usuario);
				cerrarTodo();
				document.getElementById("sesion").innerHTML = unUsuario.nombre;	
	}
}
function autocompletarModificar(usuario){
	document.getElementById("nombreM").value = usuario.nombre ;
	document.getElementById("apellidoM").value = usuario.apellido;
	document.getElementById("emailM").value = usuario.mail;
	document.getElementById("pass1M").value = usuario.contraseña;	//MUY Bisarro que se autocomplete
	document.getElementById("pass2M").value = usuario.contraseña;
}
function ordenarSelect(id_componente){ //codigo copiado
	var selectToSort = jQuery('#' + id_componente);
	var optionActual = selectToSort.val();
	selectToSort.html(selectToSort.children('option').sort(function (a, b) {
		return a.text === b.text ? 0 : a.text < b.text ? -1 : 1;
	})).val(optionActual);
}

function SortByNombre(x,y) {//ordenar Array Json barrios
		return ((x.nombre == y.nombre) ? 0 : ((x.nombre > y.nombre) ? 1 : -1 ));
}

function mostrarMensajeBienvenida(nombre){
	var dlgboxBienvenidos = document.getElementById("dlgboxBienvenidos");
	var textoBienvenidos = document.getElementById("textoBienvenidos");
	textoBienvenidos.innerHTML="Hola "+ nombre + "... Bienvenido a Mas Rampas";
	dlgboxBienvenidos.style.display = "block";
	setTimeout(function(){dlgboxBienvenidos.style.display = "none";}, 2000);
}
function mostrarMensajeBienvenidaRegistro(){
	var dlgboxBienvenidosRegistro = document.getElementById("dlgboxBienvenidosRegistro");
	var textoBienvenidos = document.getElementById("textoBienvenidos");
	dlgboxBienvenidosRegistro.style.display = "block";
	setTimeout(function(){dlgboxBienvenidosRegistro.style.display = "none";}, 2000);
}
function mostrarLoading(){
	$('#loading').html('<img src="imagen/ajax-loader.gif"><br> cargando...');
}
function ocultarLoading(){
	$('#loading').html('');
}
function cerrarRegistrar(){
	cerrarTodo();
	registroModificacionErrores=false;
	if ( $('#formRegistro').jVal({style:'pod',padding:3,border:1,wrap:true}) ) 
		;
}
function cerrarModificar(){
	cerrarTodo();
	registroModificacionErrores=false;
	if ( $('#formModificar').jVal({style:'pod',padding:3,border:1,wrap:true}) ) 
		;
}
function validacionMail(mail,idSesion){
	var r = "Incorrecto";
	if(verificarMail(mail)){
		if (verificarUsuarioRegistrado(mail,idSesion)){
			r = "";
		} else {
			r = "Ya existe un usuario Registrado con esa Direccion Email";
		}
	}else{
		r = "El Email es invalido";
	}
	return r;
}
function verificarMail(mail){
	var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var e = false;
	if(expr.test(mail)){
		e=true;
	}else{
//		alert("El Email es invalido");
	}
	return e;
}
function verificarContraseña(pass){
	var expr = /^[0-9A-Za-z]+$/;
	var e =  false;
    if (pass.length >= 8 && pass.length <= 50 && expr.test(pass)){
		e = true; 
	}else{
//		alert("La contraseña debe contener solo caracteres alfanumericos entre 8 y 50");
	}
	return e;
}
function verificarNombre(nombre){
	var expr = /^[A-Za-z]+$/;
	var e =  false;
    if (nombre.length >= 3 && nombre.length <= 30){
		e = expr.test(nombre); 
	}else{
//		alert("El nombre debe contener solo caracteres alfabeticos entre 3 y 30");
	}
	return e;
}
function verificarApellido(nombre){//Que son los caracteres especiales para le apellido
	var expr = /^[A-Za-z]+$/;
	var e =  false;
    if (nombre.length >= 3 && nombre.length <= 30){
		e = expr.test(nombre); 
	}else{
//		alert("El apellido debe contener solo caracteres alfabeticos y especiales (?) y entre 3 y 30");
	}
	return e;
}
function verificarContraseña2(pass1,pass2){
	var e = false;
	if (pass1 == pass2){
		e = true;
	}else{
//		alert("Las contraseñas no coinciden");
	}
	return e;
}
function verificarUsuarioRegistrado(mail,idSesion){
	var ur = false;
	if (!existeUsuarioRegistrado(mail,idSesion)){
		ur=true;
	}else{
//		alert("Ya existe un usuario Registrado con esa Direccion Email");
	}
	return ur;
}
function validarRegistro(mail,nombre,apellido,pass1,pass2,idSesion){
	var registro = false;
	registro = verificarNombre(nombre);
	registro = (verificarApellido(apellido) && registro);
	registro = (verificarMail(mail) && registro);
	registro = (verificarContraseña(pass1) && registro);
	registro = (verificarContraseña2(pass1,pass2) && registro);
	registro = (verificarUsuarioRegistrado(mail,idSesion) && registro);
	return registro;
}
function limpiarTextbox(){
	document.getElementById("nombreM").value = "";
	document.getElementById("apellidoM").value = "";
	document.getElementById("emailM").value = "";
	document.getElementById("pass1M").value = "";
	document.getElementById("pass2M").value = "";
	
	document.getElementById("nombreR").value = "";
	document.getElementById("apellidoR").value = "";
	document.getElementById("emailR").value = "";
	document.getElementById("pass1R").value = "";
	document.getElementById("pass2R").value = "";
	
	document.getElementById("nombre").value = "";
	document.getElementById("pass").value = "";
}
function guardarSesion(usuario){
	var user = JSON.stringify(usuario);
//	$.session.set("nombreSesion",user);
crearCookie("nombreSesion", user, 30);
}
function abrirSesionGuardada(){
//	var user = $.session.get("nombreSesion");
var user = obtenerCookie("nombreSesion");
	if (user != null && user != "undefined"){
			unUsuario = JSON.parse(user);
			if(typeof(unUsuario.facebook)=="undefined"){
				if (existeUsuarioRegistrado(unUsuario.mail,unUsuario.idUsuario))//Que siga registrado en el sistema
					cerrarTodoM();
				else
					cerrarSesionGuardada();
			}else{
				if (buscarUsuarioFacebook(unUsuario.facebook) )//&& verificarConectadoFacebook(unUsuario.facebook) ) //Que siga registrado en el sistema y conectado a facebook
					cerrarTodoM();
				else
					cerrarSesionGuardada();
			}
	}
}
function cerrarSesionGuardada(){
	crearCookie("nombreSesion",null, -1);
}
function crearCookie(clave, valor, diasexpiracion) {
    var d = new Date();
    d.setTime(d.getTime() + (diasexpiracion*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = clave + "=" + valor + "; " + expires;
}
 
function obtenerCookie(clave) {
    var name = clave + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return null;
}
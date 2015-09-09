function cerrarTodo(){
	var whitebg = document.getElementById("white-background");
	var dlgboxRegistro = document.getElementById("dlgboxRegistro");
	var dlgboxRegistroMail = document.getElementById("dlgboxRegistroMail");
	var dlgboxIniciarMail = document.getElementById("dlgboxIniciarMail");
	var dlgboxCerrarSesion = document.getElementById("dlgboxCerrarSesion");
	var dlgboxIniciar = document.getElementById("dlgboxIniciar");
	var dlgboxeliminarUsuarios = document.getElementById("dlgboxeliminarUsuarios");
	var dlgboxInformacionRampa = document.getElementById("dlgboxInformacionRampa");
	var dlgboxClick = document.getElementById("dlgboxClick");
	var dlgboxModificarRampa = document.getElementById("dlgboxModificarRampa");
	var dlgboxAlerta = document.getElementById("dlgboxAlerta");
	var dlgboxModificarUsuario =  document.getElementById("dlgboxModificarUsuario");
	var dlgboxReportarRampa =  document.getElementById("dlgboxReportarRampa");
	whitebg.style.display = "none";
	dlgboxRegistro.style.display = "none";
	dlgboxRegistroMail.style.display = "none";
	dlgboxIniciarMail.style.display = "none";
	dlgboxCerrarSesion.style.display = "none";
	dlgboxIniciar.style.display = "none";
	dlgboxeliminarUsuarios.style.display = "none";
	dlgboxInformacionRampa.style.display = "none";
	dlgboxClick.style.display = "none";
	dlgboxNuevaRampa.style.display = "none";
	dlgboxModificarRampa.style.display = "none";
	dlgboxAlerta.style.display = "none";
	dlgboxModificarUsuario.style.display = "none";
	dlgboxReportarRampa.style.display = "none";
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
	listarUsuarios();
	whitebg.style.display = "block";
	dlgboxeliminarUsuarios.style.display = "block";
	centrar(dlgboxeliminarUsuarios);
}
function showdlgboxInformacionRampa(){
	var dlgboxInformacionRampa = document.getElementById("dlgboxInformacionRampa");
	dlgboxInformacionRampa.style.display = "block";
	centrar(dlgboxInformacionRampa);
}
function showdlgboxClick(){
	var dlgboxClick = document.getElementById("dlgboxClick");
	dlgboxClick.style.display = "block";
	centrar(dlgboxClick);
}
function showdlgboxNuevaRampa(latLng){
	document.getElementById("crucesAccesiblesA").checked=false;
	document.getElementById("buenEstadoA").checked=false;
	var dlgboxNuevaRampa = document.getElementById("dlgboxNuevaRampa");
ubicacion=latLng;	
	dlgboxNuevaRampa.style.display = "block";
	centrar(dlgboxNuevaRampa);
}
function showdlgboxModificarRampa(marcador){
	var dlgboxModificarRampa = document.getElementById("dlgboxModificarRampa");
document.getElementById("crucesAccesiblesM").checked=marcador.crucesAccesibles;
document.getElementById("buenEstadoM").checked=checked=marcador.buenEstado;
ubicacion=marcador;	
	dlgboxModificarRampa.style.display = "block";
	centrar(dlgboxModificarRampa);
}
function showdlgboxAlerta(mensaje){
	var textAlerta = document.getElementById("textAlerta");
	textAlerta.innerHTML="</br>" + mensaje;
	var dlgboxAlerta = document.getElementById("dlgboxAlerta");
	dlgboxAlerta.style.display = "block";
	centrar(dlgboxAlerta);
}
function alerta(mensaje){
	showdlgboxAlerta(mensaje);
}
function showdlgboxModificarUsuario(){
	var whitebg = document.getElementById("white-background");
	var dlgboxModificarUsuario = document.getElementById("dlgboxModificarUsuario");
	whitebg.style.display = "block";
	dlgboxModificarUsuario.style.display = "block";
	centrar(dlgboxModificarUsuario);
}
function showdlgboxReportarRampa(marcador){
var motivos= [{"nombre":"Rampa Rota"},{"nombre":"Mal estado"},{"nombre":"Obstaculo"}]
	var dlgboxReportarRampa = document.getElementById("dlgboxReportarRampa");
					$.each(motivos, function (index, value) {
					$("#selectMotivo").append($('<option/>', { 
						value: value.nombre,
						text : value.nombre 
					}).data("stringCoordenadas", value.limites)/*Una negrada para asociarle el limite al option de cada select.*/);
				});
	dlgboxReportarRampa.style.display = "block";
	ubicacion=marcador;	
	centrar(dlgboxReportarRampa);
}
/***************************************************************************************************/
function cerrarTodoM(){
	cerrarTodo();
	var sesion = document.getElementById("nombre");
	document.getElementById("sesion").innerHTML = sesion.value;
	
var cerrar=document.createElement('li');
var configuracion=document.createElement('li');
var admin=document.createElement('li');

var loguear = document.getElementById("loguear");
var registrar = document.getElementById("registrar");

cerrar.id='cerrar';
configuracion.id='configuracion';
admin.id='admin';

cerrar.innerHTML="<a href='#' onclick='showdlgboxCerrarSesion()'>Cerrar Sesión</a>";
configuracion.innerHTML="<a href='#' onclick='showdlgboxModificarUsuario()'>Configuración</a>";
admin.innerHTML="<a href='#' onclick='showdlgboxeliminarUsuarios()'>Admin Task</a>";


document.getElementById("lista").appendChild(configuracion);
document.getElementById("lista").appendChild(admin);
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
var admin = document.getElementById("admin");
document.getElementById("lista").removeChild(admin);
	document.getElementById("sesion").innerHTML = 'Sesión';
}
/**********************************************************************************************/
function centrar (box){
	var x=350;
	var y=50;
	box.style.left = (x + (window.innerWidth - x)/2 - box.scrollWidth/2)  + "px";
	box.style.top = (y + (window.innerHeight - y )/2 - box.scrollHeight/2)  + "px";
}
function pan(){
alert(window.innerWidth 	);
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
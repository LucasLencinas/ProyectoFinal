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
	whitebg.style.display = "block";
	dlgboxeliminarUsuarios.style.display = "block";
	centrar(dlgboxeliminarUsuarios);
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
function showdlgboxModificarUsuario(){
	var whitebg = document.getElementById("white-background");
	var dlgboxModificarUsuario = document.getElementById("dlgboxModificarUsuario");
	whitebg.style.display = "block";
	dlgboxModificarUsuario.style.display = "block";
	autocompletarModificar(unUsuario);	//GLOBAL
	centrar(dlgboxModificarUsuario);
}
function showdlgboxReportarRampa(marcador){
var motivos= [{"nombre":"Rampa Rota"},{"nombre":"Mal estado"},{"nombre":"Obstaculo"},{"nombre":"Otros"}]
	var dlgboxReportarRampa = document.getElementById("dlgboxReportarRampa");
					if(!document.getElementById("selectMotivo").length)
					$.each(motivos, function (index, value) {
					$("#selectMotivo").append($('<option/>', { 
						value: value.nombre,
						text : value.nombre 
					}).data("stringCoordenadas", value.limites)/*Una negrada para asociarle el limite al option de cada select.*/);
				});
	dlgboxReportarRampa.style.display = "block";
	document.getElementById("tieneRampaR").checked=marcador.tieneRampas;
	document.getElementById("crucesAccesiblesR").checked=marcador.crucesAccesibles;
	document.getElementById("buenEstadoR").checked=checked=marcador.buenEstado;
	tieneRampaCheck('R');
	ubicacion=marcador;	//GLOBAL
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
var reportes=document.createElement('li');

var loguear = document.getElementById("loguear");
var registrar = document.getElementById("registrar");

cerrar.id='cerrar';
configuracion.id='configuracion';
admin.id='admin';
reportes.id='reportes';

cerrar.innerHTML="<a href='#' onclick='hideSesion(); showdlgboxCerrarSesion()'>Cerrar Sesión</a>";
configuracion.innerHTML="<a href='#' onclick='hideSesion(); showdlgboxModificarUsuario()'>Configuración</a>";
admin.innerHTML="<a href='#' onclick='hideSesion(); showdlgboxeliminarUsuarios()'>Usuarios</a>";
reportes.innerHTML="<a href='#' onclick='hideSesion(); buscarRampasReportadas()'>Reportadas</a>";

document.getElementById("lista").appendChild(configuracion);
document.getElementById("lista").appendChild(admin);
document.getElementById("lista").appendChild(reportes);
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
var reportes = document.getElementById("reportes");
document.getElementById("lista").removeChild(reportes);
	document.getElementById("sesion").innerHTML = 'Sesión';
	if (!unUsuario.usuarioPropio)
		logoutFacebook();
	unUsuario={};
	idSesion=-1;//GLOBAL Sesion
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
	if(autenticar(nombre,pass))
		{cerrarTodoM();}
		else alerta("El Email o la contraseña es invalida","Error Autenticación");
}
//Registrar Mail
function registrarMail(){
	if (document.getElementById("pass1R").value != document.getElementById("pass2R").value)
		{alert("Las contraseñas no coinciden");}
		else{
			var mail = document.getElementById("emailR").value;
			if (existeUsuarioRegistrado(mail,idSesion))
			{alert("Ya existe un usuario Registrado con esa Direccion Email");}
			else{
				var usuario = {};
				usuario.nombre = document.getElementById("nombreR").value;
				usuario.apellido = document.getElementById("apellidoR").value;
				usuario.mail = document.getElementById("emailR").value;
				usuario.contraseña = document.getElementById("pass1R").value;
				usuario.usuarioPropio = true;
				unUsuario=usuario;
				cerrarTodoM();
				nuevoUsuarioMail(usuario);
				cerrarTodo();
				//autenticar(document.getElementById("emailR").value,document.getElementById("pass1R").value);cerrarTodoM(); No funciona, pide el logueo antes de la persistencia que tarda como 1 minuto
			}
		}
}
function modificarMail(){
	if (document.getElementById("pass1M").value != document.getElementById("pass2M").value)
		{alert("Las contraseñas no coinciden");}
		else{
			var mail = document.getElementById("emailM").value;
			if (existeUsuarioRegistrado(mail,idSesion))
			{alert("Ya existe un usuario Registrado con esa Direccion Email");}
			else{
				var usuario = {};
				usuario.id = idSesion;
				usuario.nombre = document.getElementById("nombreM").value;
				usuario.apellido = document.getElementById("apellidoM").value;
				usuario.mail = document.getElementById("emailM").value;
				usuario.contraseña = document.getElementById("pass1M").value;
				usuario.usuarioPropio = true;
				unUsuario=usuario;			//GLOBAL
				modificarUsuarioMail(usuario);
				cerrarTodo();
			}
		}
}
function autocompletarModificar(usuario){
	document.getElementById("nombreM").value = usuario.nombre ;
	document.getElementById("apellidoM").value = usuario.apellido;
	document.getElementById("emailM").value = usuario.mail;
	document.getElementById("pass1M").value = usuario.contraseña;	//MUY Bisarro que se autocomplete
	document.getElementById("pass2M").value = usuario.contraseña;
}
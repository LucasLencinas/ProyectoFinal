function cerrarTodo(){
	var whitebg = document.getElementById("white-background");
	var dlgboxRegistro = document.getElementById("dlgboxRegistro");
	var dlgboxRegistroMail = document.getElementById("dlgboxRegistroMail");
	var dlgIniciarMail = document.getElementById("dlgboxIniciarMail");
	whitebg.style.display = "none";
	dlgboxRegistro.style.display = "none";
	dlgboxRegistroMail.style.display = "none";
	dlgboxIniciarMail.style.display = "none";
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
function showdlgboxIniciarMail(){dlgboxIniciarMail
	var whitebg = document.getElementById("white-background");
	var dlgboxIniciarMail = document.getElementById("dlgboxIniciarMail");
	whitebg.style.display = "block";
	dlgboxIniciarMail.style.display = "block";
	centrar(dlgboxIniciarMail);
	registraDivs(dlgboxIniciarMail);
}
function cerrarTodoM(){
	cerrarTodo();
	var sesion = document.getElementById("nombre");
	document.getElementById("sesion").innerHTML = sesion.value;
	
}
function centrar (box){
	var x=350;
	var y=50;
	box.style.left = (x + (window.innerWidth - x)/2 - box.scrollWidth/2)  + "px";
	box.style.top = (y + (window.innerHeight - y - 100)/2 - box.scrollHeight/2)  + "px";
}
var ans;
    function answer(val){
        if(val == ans){
            document.getElementsByTagName('h1')[0].innerHTML = "Correct!!!";
        }else{
            document.getElementsByTagName('h1')[0].innerHTML = "Wrong!!!";
        }
        dlgHide();
    }
    function dlgHide(){
        var whitebg = document.getElementById("white-background");
        var dlg = document.getElementById("dlgboxIniciarMail");
        whitebg.style.display = "none";
        dlg.style.display = "none";
    }
    function showDialog(){
        var whitebg = document.getElementById("white-background");
        var dlg = document.getElementById("dlgboxIniciarMail");
        whitebg.style.display = "block";
        dlg.style.display = "block";
        var winWidth = window.innerWidth;
        dlg.style.left = "calc(50% - " + (winWidth/2) + ")";
        dlg.style.padding = "auto";
        //math question
        var dlgbody = document.getElementById('dlg-body');
        var x = Math.floor(Math.random()*10)+1;
        var y = Math.floor(Math.random()*10)+1;
        ans = x+y;
        //display question
    //    dlgbody.innerHTML = x + "+" + y + " = ?";
        //assign option to buttons
   /*     if(Math.random()*5 < 3){
            document.getElementById('option1').innerHTML = ans.toString();
            document.getElementById('option2').innerHTML = (ans+1).toString();
        }else{
            document.getElementById('option2').innerHTML = ans.toString();
            document.getElementById('option1').innerHTML = (ans+1).toString();
        }
*/   
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
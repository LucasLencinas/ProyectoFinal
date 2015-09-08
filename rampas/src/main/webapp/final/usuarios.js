var usuarios = 
	
	[{"nombre": "Federico","apellido": "Diaz","qq": 1 },{"nombre": "Matias","apellido": "Dionisi","qq": 2 },{"nombre": "Lucas","apellido": "Lencinas","qq": 3 },{"nombre": "Daniel","apellido": "Ordoñez","qq": 4 },{"nombre": "Martin","apellido": "Soifer","qq": 5 }]

var ubicacion;	
function listarUsuarios(){
	if($("#servidorHabilitado").is(':checked')){
		alert("No estoy conectado con el servidor todavia.");
	}else{
		$.each(usuarios, function(k,v){
			var us=document.createElement('li');
			us.innerHTML="<input type='checkbox'>" + v.nombre + v.apellido + "</input>";
			document.getElementById("usEliminar").appendChild(us);
			
		});			
	
	}
}

function altaRampa(){
	cerrarTodo();
	var crucesAccesibles =  document.getElementById("crucesAccesiblesA").checked;
	var buenEstado =  document.getElementById("buenEstadoA").checked;
	
	alerta("La Rampa se dio de Alta</br>"+ crucesAccesibles + " " +  buenEstado + " " +  ubicacion);
}	
function modRampa(){
	cerrarTodo();
	var crucesAccesibles =  document.getElementById("crucesAccesiblesM").checked;
	var buenEstado =  document.getElementById("buenEstadoM").checked;
	
	alerta("La Rampa se Modifico</br>"+ crucesAccesibles + " " +  buenEstado + " " +  ubicacion.stringDireccion);
}
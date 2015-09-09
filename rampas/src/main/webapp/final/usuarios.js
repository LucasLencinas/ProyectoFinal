var usuarios = 
	
	[{"nombre": "Federico","apellido": "Diaz","qq": 1 },{"nombre": "Matias","apellido": "Dionisi","qq": 2 },{"nombre": "Lucas","apellido": "Lencinas","qq": 3 },{"nombre": "Daniel","apellido": "Ordoñez","qq": 4 },{"nombre": "Martin","apellido": "Soifer","qq": 5 }]

var ubicacion;	
function listarUsuarios(){
	if($("#servidorHabilitado").is(':checked')){
		alert("No estoy conectado con el servidor todavia.");
	}else{
		$.each(usuarios, function(k,v){
			var us=document.createElement('li');
			us.id=v.qq;
			us.innerHTML="<input type='checkbox' id='c" + v.qq + "'>" + v.nombre + v.apellido + "</input>";
			document.getElementById("usEliminar").appendChild(us);
		});			
	}
}


function eliminar(){	
	var el = document.getElementById("usEliminar").getElementsByTagName("li");
		for (var i=0; i<el.length; )
		{
		var ch = document.getElementById("c" + el[i].id);
		if (ch.checked==true)
			{
            node=document.getElementById(el[i].id);
            node.parentNode.removeChild(node);
			}
			else i++;
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
function repRampa(){
	cerrarTodo();
	var mt =  $("#selectMotivo").prop("value");
	alerta("La Rampa fue reportada por </br>"+ mt +  ubicacion.stringDireccion);
}
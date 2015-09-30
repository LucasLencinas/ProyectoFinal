var usuarios = 
	
	[{"nombre": "Federico","apellido": "Diaz","qq": 1 },{"nombre": "Matias","apellido": "Dionisi","qq": 2 },{"nombre": "Lucas","apellido": "Lencinas","qq": 3 },{"nombre": "Daniel","apellido": "Ordoñez","qq": 4 },{"nombre": "Martin","apellido": "Soifer","qq": 5 }]

var ubicacion;	
function listarUsuarios(){
	if($("#servidorHabilitado").is(':checked')){
		alert("No estoy conectado con el servidor todavia.");
	}else{
		
		$.each(usuarios, function(k,v){
			var tabla = document.getElementById("usEliminar");
			var fila = tabla.insertRow(tabla.rows.length);
			var columnaCheck = fila.insertCell(0);
			var columnaNombre = fila.insertCell(1);
			var columnaApellido = fila.insertCell(2);
			var check = document.createElement("input");
			check.type = "checkbox";
			columnaCheck.appendChild(check);
			columnaNombre.innerHTML=v.nombre;
			columnaApellido.innerHTML=v.apellido;
		});			
	}
}


function eliminar(){
	var tabla = document.getElementById("usEliminar");
	var ue =[];
		for (var j=i=0; i<tabla.rows.length;i++ ){
			if(tabla.rows[i].cells[0].childNodes[0].checked)
				ue[j] = tabla.rows[i].cells[1].innerHTML;
			j++;
		}
		alert(ue);
}


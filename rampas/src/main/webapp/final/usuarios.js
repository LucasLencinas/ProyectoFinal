var usuarios = 
	[
		{"nombre": "Federico", "apellido": "Diaz", "mail": "fedee_vpc@hotmail.com", "contraseña": "federico", "administrador": "true"},
		{"nombre": "Matias", "apellido": "Dionisi", "mail": "matiasdionisi22@hotmail.com", "contraseña" : "matias", "administrador": "true"},
		{"nombre": "Lucas", "apellido": "Lencinas", "mail": "lllencinas@gmail.com", "contraseña": "lucas", "administrador": "true"},
		{"nombre": "Daniel", "apellido": "Ordoñez", "mail": "danivelez21@hotmail.com", "contraseña": "daniel", "administrador": "true"},
		{"nombre": "Martin", "apellido": "Soifer", "mail": "marsoifer.91@gmail.com", "contraseña": "martin", "administrador": "true"},
	]

var ubicacion;	
function listarUsuarios(usuarios){
	if($("#servidorHabilitado").is(':checked')){
		alert("No estoy conectado con el servidor todavia.");
	}else{
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
			if(tabla.rows[i].cells[0].childNodes[0].checked)
				{ue[j] = tabla.rows[i].cells[3].innerHTML;
			usEl.id=tabla.rows[i].cells[3].innerHTML;
			borrarUsuario(usEl);
				tabla.deleteRow(i);
				i--;
				j++;}
		}
		alert(ue);
}


function getUsuarios(){
	console.log("A punto de pedir el nombre de un usuario");
	$.ajax({
        type: "GET",
        dataType: "json",
        url: "rampas/Usuarios",
        success: function (data) {
        	var items = "";
        	if(data[0] == null){
        		$('#espacioNombreUsuario').html("Error, no hay Usuarios");
        	}
        	else{
        		var usuarios="";
	        	data.forEach( function(usuario){
	        		usuarios += usuario.nombre + ", " + usuario.id + "<br/>";
	        	});
        		$('#espacioNombreUsuario').append(usuarios);
        	}
        }
    });
}

function getIntersecciones(){
	console.log("A punto de pedir el nombre de una interseccion");
	$.ajax({
        type: "GET",
        dataType: "json",
        url: "rampas/Intersecciones",
        success: function (data) {
        	var items = "";
        	if(data[0] == null){
        		$('#espacioNombreInterseccion').html("Error, no hay Intersecciones");
        	}
        	else{
        		var intersecciones="";
	        	data.forEach( function(interseccion){
	        		intersecciones += interseccion.calle1 + " y " + interseccion.calle2 + "<br/>";
	        	});
        		$('#espacioNombreInterseccion').append(intersecciones);
        	}
        }
    });
}
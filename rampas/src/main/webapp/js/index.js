function getMyUser(){
	console.log("A punto de pedir el nombre de un usuario");
	$.ajax({
        type: "GET",
        dataType: "json",
        url: "rampas/usuarios",
        success: function (data) {
        	var items = "";
        	if(data[0] == null){
        		$('#espacioNombreUsuario').html("Error, no hay Usuarios");
        	}
        	else{
        		var usuarios="";
	        	data.forEach( function(usuario){
	        		usuarios += usuario.nombre + "<br/>";
	        	});
        		$('#espacioNombreUsuario').append(usuarios);
        	}
        }
    });
}
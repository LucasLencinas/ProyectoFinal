function getMyUser(){
	console.log("A punto de pedir el nombre de un usuario");
	$.ajax({
        type: "GET",
        dataType: "json",
        url: "truequeLibre/usuarios",
        success: function (data) {
        	var items = "";
        	if(data[0] == null){
        		$('#espacioNombreUsuario').html("Error!! No esta ese usuario");
        	}
        	else{
        		$('#espacioNombreUsuario').html(data[0]);
        	}
        }
    });
}
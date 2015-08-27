/**Antes de este js hay que cargar jQuery**/

/** Campos que tiene una rampa

  @Expose @Id private long id;
  @Expose @Index private double latitud; 
  @Expose @Index private double longitud;
  @Expose @Index private String barrio;
  @Expose private boolean tieneInformacion;
  @Expose private boolean tieneRampas;
  @Expose private boolean buenEstado;
  @Expose private boolean todosCrucesAccesibles;
  @Expose private boolean reportada;

**/

/**--------NUEVA RAMPA-------**/

var rampaGeneral = {};

function cargarRampa(){
	
	
}

function generarRampaDesdeLosInputDeNuevaRampa(){
	var rampa = {};
	rampa.latitud = $("#nuevaLat").val(); 
	rampa.longitud = $("#nuevaLng").val();
	rampa.barrio = $("#nuevaBarrio").val();
	rampa.tieneInformacion = $("#nuevaTieneInformacion").is(':checked');
	rampa.tieneRampas = $("#nuevaTieneRampas").is(':checked');
	rampa.buenEstado = $("#nuevaBuenEstado").is(':checked');
	rampa.todosCrucesAccesibles = $("#nuevaTodosCrucesAccesibles").is(':checked');
	rampa.reportada = $("#nuevaReportada").is(':checked');
	return rampa;
}

function nuevaRampa(rampa){
	console.log("A punto de guardar una rampa...");
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			$('#resultadoNuevaRampa').html("Se dio de alta la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Nueva Rampa. ";
			resultado += "Contenido jqHR:" + jqXHR + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoNuevaRampa').html("Hubo un error al grabar la rampa en la base de datos.");
			}
		}
	});
}

/**--------BUSCAR RAMPA POR UBICACION-------**/

function buscarRampaPorUbicacion(latitud, longitud){
/*----- Ids que se usan en este query al servidor --------
id="PorUbicacionLat"
id="buscarPorUbicacionLng"
id="resultadoBuscarRampaPorUbicacion"
*/

	console.log("A punto de buscar rampas por ubicacion...");
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/rampas/Rampas/latlng/"+ latitud + "/" + longitud,
		success: function (rampa) {
			$('#resultadoBuscarRampaPorUbicacion').html(JSON.stringify(rampa));
			$("#modificarId").val(rampa.id);
			$("#modificarLat").val(rampa.latitud);
/*			$("#modificarLat").prop("disabled",true);*/
			$("#modificarLng").val(rampa.longitud);
/*			$("#modificarLng").prop("disabled",true);*/
			$("#modificarBarrio").val(rampa.barrio);
			$("#modificarTieneInformacion").prop("checked",rampa.tieneInformacion);
			$("#modificarTieneRampas").prop("checked",rampa.tieneRampas);
			$("#modificarBuenEstado").prop("checked",rampa.buenEstado);
			$("#modificarTodosCrucesAccesibles").prop("checked",rampa.todosCrucesAccesibles);
			$("#modificarReportada").prop("checked",rampa.reportada);
			if (rampa.reportada) {
				$("#desreportarBoton").prop("disabled",false);
			}
			else {
				$("#reportarBoton").prop("disabled",false);
			}
			$("#modificarReportada").prop("disabled",true);
			$("#modificarBoton").prop("disabled",false);
			$("#borrarBoton").prop("disabled",false);
/*			$("#reportarBoton").prop("disabled",false);*/
			
/*			$("#reportarLat").val(rampa.latitud);
			$("#reportarLat").prop("disabled",true);
			$("#reportarLng").val(rampa.longitud);
			$("#reportarLng").prop("disabled",true);
			$("#reportarBoton").prop("disabled",false);*/
		},
		statusCode: {
			404: function () { 
				$('#resultadoBuscarRampaPorBarrio').html("No se ha encontrado ninguna rampa en esa ubicacion.");
			}
		}
	});
}

/**--------MODIFICAR RAMPA-------**/

function generarRampaDesdeLosInputDeModificarRampa(){
	var rampa = {};
	rampa.id = $("#modificarId").val();
	rampa.latitud = $("#modificarLat").val(); 
	rampa.longitud = $("#modificarLng").val();
	rampa.barrio = $("#modificarBarrio").val();
	rampa.tieneInformacion = $("#modificarTieneInformacion").is(':checked');
	rampa.tieneRampas = $("#modificarTieneRampas").is(':checked');
	rampa.buenEstado = $("#modificarBuenEstado").is(':checked');
	rampa.todosCrucesAccesibles = $("#modificarTodosCrucesAccesibles").is(':checked');
	rampa.reportada = $("#modificarReportada").is(':checked');
	return rampa;
}

function modificarRampa(rampa){
	console.log("A punto de modificar una rampa...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			$('#resultadoModificarRampa').html("Se modifico la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
			$("#modificarBoton").prop("disabled",true);
			$("#reportarBoton").prop("disabled",true);
			$("#desreportarBoton").prop("disabled",true);
			$("#borrarBoton").prop("disabled",true);
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Modificar Rampa. ";
			resultado += "Contenido jqHR:" + jqXHR.toString() + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoModificarRampa').html("Hubo un error al modificar la rampa en la base de datos.");
			}
		}
	});
}

/**--------REPORTAR RAMPA-------**/

function generarRampaDesdeLosInputDeReportarRampa(){
	
	var rampa = {};
	rampa.id = $("#modificarId").val();
	rampa.latitud = $("#modificarLat").val(); 
	rampa.longitud = $("#modificarLng").val();
	rampa.barrio = $("#modificarBarrio").val();
	rampa.tieneInformacion = $("#modificarTieneInformacion").is(':checked');
	rampa.tieneRampas = $("#modificarTieneRampas").is(':checked');
	rampa.buenEstado = $("#modificarBuenEstado").is(':checked');
	rampa.todosCrucesAccesibles = $("#modificarTodosCrucesAccesibles").is(':checked');
	rampa.reportada = true;
	return rampa;
}

function reportarRampa(rampa){
	console.log("A punto de reportar una rampa...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			$('#resultadoModificarRampa').html("Se reporto la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
			$("#modificarReportada").prop('checked',true);
			$("#modificarBoton").prop("disabled",true);
			$("#reportarBoton").prop("disabled",true);
			$("#desreportarBoton").prop("disabled",true);
			$("#borrarBoton").prop("disabled",true);
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Reportar Rampa. ";
			resultado += "Contenido jqHR:" + jqXHR.toString() + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoModificarRampa').html("Hubo un error al reportar la rampa en la base de datos.");
			}
		}
	});
}

/**--------DESREPORTAR RAMPA-------**/

function generarRampaDesdeLosInputDeDesreportarRampa(){
	var rampa = {};
	rampa.id = $("#modificarId").val();
	rampa.latitud = $("#modificarLat").val(); 
	rampa.longitud = $("#modificarLng").val();
	rampa.barrio = $("#modificarBarrio").val();
	rampa.tieneInformacion = $("#modificarTieneInformacion").is(':checked');
	rampa.tieneRampas = $("#modificarTieneRampas").is(':checked');
	rampa.buenEstado = $("#modificarBuenEstado").is(':checked');
	rampa.todosCrucesAccesibles = $("#modificarTodosCrucesAccesibles").is(':checked');
	rampa.reportada = false;
	return rampa;
}

function desreportarRampa(rampa){
	console.log("A punto de desreportar una rampa...");
	$.ajax({
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			$('#resultadoModificarRampa').html("Se desreporto la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
			$("#modificarReportada").prop('checked',false);
			$("#modificarBoton").prop("disabled",true);
			$("#reportarBoton").prop("disabled",true);
			$("#desreportarBoton").prop("disabled",true);
			$("#borrarBoton").prop("disabled",true);
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Desreportar Rampa. ";
			resultado += "Contenido jqHR:" + jqXHR.toString() + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoModificarRampa').html("Hubo un error al desreportar la rampa en la base de datos.");
			}
		}
	});
}

/**--------BORRAR RAMPA-------**/

function generarRampaDesdeLosInputDeBorrarRampa(){
	var rampa = {};
	rampa.id = $("#modificarId").val();
	rampa.latitud = $("#modificarLat").val(); 
	rampa.longitud = $("#modificarLng").val();
	rampa.barrio = $("#modificarBarrio").val();
	rampa.tieneInformacion = $("#modificarTieneInformacion").is(':checked');
	rampa.tieneRampas = $("#modificarTieneRampas").is(':checked');
	rampa.buenEstado = $("#modificarBuenEstado").is(':checked');
	rampa.todosCrucesAccesibles = $("#modificarTodosCrucesAccesibles").is(':checked');
	rampa.reportada = $("#modificarReportada").is(':checked');
	return rampa;
}

function borrarRampa(rampa){
	console.log("A punto de borrar una rampa...");
	$.ajax({
		type: "DELETE",
		contentType: "application/json",
		data: JSON.stringify(rampa),
		url: "/rampas/Rampas",
		success: function (data) {
			$('#resultadoModificarRampa').html("Se borro la rampa: " + JSON.stringify(rampa) + "-- " + data.toString());
			$("#modificarBoton").prop("disabled",true);
			$("#reportarBoton").prop("disabled",true);
			$("#desreportarBoton").prop("disabled",true);
			$("#borrarBoton").prop("disabled",true);
		},
		complete: function (jqXHR, textStatus) {
			var resultado = "Complete - Borrar Rampa. ";
			resultado += "Contenido jqHR:" + jqXHR.toString() + ". ";
			resultado += "Contenido textStatus:" + textStatus + ". ";
			alert(resultado);
		},
		statusCode: {
			409: function () { 
				$('#resultadoModificarRampa').html("Hubo un error al desreportar la rampa en la base de datos.");
			}
		}
	});
}

/**--------BUSCAR RAMPAS POR BARRIO-------**/

function buscarRampaPorBarrio(barrio,cantidad){
  $.ajax({
    type:"GET",
    dataType: "json",
    url: "/rampas/Rampas/barrios/" + barrio,
    success: function(rampas){
      if(rampas.length > 10){ //Para que no me muestre las 500 rampas por barrio.
        rampas = rampas.slice(0, 11);
      }
      $('#resultadoBuscarRampaPorBarrio').html(JSON.stringify(rampas));
    },
    statusCode: {
      404: function () { 
        $('#resultadoBuscarRampaPorBarrio').html("No se ha encontrado ninguna rampa con ese barrio.");
      }
    }
  });
}

/**--------Carga inicial de la base de datos -------**/

function cargarDatos(){
  console.log("A punto de cargar los datos en la base de datos...");
  $.ajax({
    type: "GET",
    dataType: "json",
    url: "/rampas/Rampas/admin/carga",
    success: function (data) {
      alert("Success - Carga inicial OK");
      console.log("Success - Carga inicial OK");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      var resultado = "Error - Carga inicial. ";
      resultado += "Contenido jqHR:" + jqXHR + ". ";
      resultado += "Contenido textStatus:" + textStatus + ". ";
      resultado += "Contenido errorThrown:" + errorThrown + ". ";
      alert(resultado);
    },
    complete: function (jqXHR, textStatus) {
      var resultado = "Complete - Carga inicial. ";
      resultado += "Contenido jqHR:" + jqXHR + ". ";
      resultado += "Contenido textStatus:" + textStatus + ". ";
      alert(resultado);
    }
  });
}


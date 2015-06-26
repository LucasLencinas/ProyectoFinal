
/*------Consulta Interseccion---------
**Se necesita haber cargado previamente la biblioteca de jQuery
**

*/

var directionsService = new google.maps.DirectionsService();
var map;
var cordobaAl3950 = new google.maps.LatLng(-34.609226, -58.374925); 
var cordobaAl3450 = new google.maps.LatLng(-34.598205, -58.420201);
var geocoder;
var autocompleteDireccion;
var baseHabilitada = false;
var seEncontro = false;
var posicionActual;
var interseccionesGuardadas = [];

function initialize() {
	
	geocoder = new google.maps.Geocoder();
	autocompleteDireccion = new google.maps.places.Autocomplete(
	($( "#direccion" )[0]),{ types: ['geocode'] });
	google.maps.event.addListener(autocompleteDireccion, 'place_changed', function() {
	});
	
    var mapOptions = {
		zoom: 14,
		center: cordobaAl3950
	}
	
	map = new google.maps.Map($( "#map-canvas" )[0], mapOptions);
	var markers = [];

	var defaultBounds = new google.maps.LatLngBounds(
	    new google.maps.LatLng(-34.650316, -58.533205),
		new google.maps.LatLng(-34.549427, -58.363947));
	map.fitBounds(defaultBounds);
  
}

function dibujarMarcador(posicion, mapa){
	return new google.maps.Marker ({
		position:posicion,
		map:mapa
	});
}

function ubicarInterseccion() {
	var direccionString = $("#direccion").val();

	geocoder.geocode( { 'address': direccionString}, function(resultsDireccion, status) {
		if (status == google.maps.GeocoderStatus.OK) {		
			dibujarMarcador(resultsDireccion[0].geometry.location, map);
			map.setZoom(17);
			map.panTo(resultsDireccion[0].geometry.location);
			posicionActual = resultsDireccion[0].geometry.location;
			buscarEnBase(resultsDireccion[0].geometry.location);
			
			} else {
			  alert('La direccion no se pudo encontrar: ' + status);
			}
	});
} //Fin ubicarInterseccion()

function buscarEnBase(ubicacion){

	if(baseHabilitada){
		//Hacer la peticion AJAX GET
		mostrarResultadoInterseccion(ubicacion);
	}
	else{
		if(estaEnArray(ubicacion)){
			mostrarUbicacionEncontrada(ubicacion);
		}
		else{
			mostrarUbicacionInexistente(ubicacion);
		}
	}
}

function mostrarFormNueva(){
	 $("#soloNuevo").show();
}

function estaEnArray(latlng){

	for(var i = 0 ; i < interseccionesGuardadas.length ; i++){
		if((interseccionesGuardadas[i].lat() == latlng.lat()) && (interseccionesGuardadas[i].lng() == latlng.lng()))
			return true;
	}
	return false;
}


function mostrarUbicacionInexistente(ubicacion){
	var coordenada = ubicacion.toString() + " </br> ";
	var estado = "LA RAMPA NO EXISTE </br>";
	var accesible = "Si desea darla de alta, haga click en Nueva </br>";
	$("#result").html(coordenada + estado + accesible);
	$("#buttonNueva").show();
}

function mostrarUbicacionEncontrada(ubicacion){
	var coordenada = ubicacion.toString() + " </br> ";
	var estado = "Estado Rampa: OK </br>";
	var accesible = "Cruces Accesibles: TODOS </br>";
	$("#result").html(coordenada + estado + accesible);
}


function guardarInterseccion(){

	if(baseHabilitada){
		//Hacer la peticion AJAX POST
		hacerPeticionAjax(posicionActual);
	}
	else{
		interseccionesGuardadas.push(posicionActual);
		
		$("#result").html("Se ha guardado la interseccion " + 
					posicionActual.toString() +  " correctamente");
		$("#buttonNueva").hide();	
		$("#soloNuevo").hide();	
	}
	
}


function hacerPeticionAjax(unaPosicion){
	console.log("Me piden la direccion de: " + unaPosicion.lat + " " + unaPosicion.lng );
		$.ajax({
			method: "POST",
			dataType: "json",
			url: "/rampas",
			data: {lat: unaPosicion.lat, lng: unaPosicion.lng},
			success: function (data) {//data es una interseccion con sus campos
					$('#section').html(data);
			},
			statusCode: {
				404: function() {
					alert( "El punto no es una interseccion" );
				}
			}
		});
}


function mostrarResultadoInterseccion(direccion){
	console.log("Me piden la direccion de: " + direccion.lat + " " + direccion.lng );
	$.ajax({
        method: "GET",
        dataType: "json",
        url: "/rampas",
		data: {lat: direccion.lat, lng: direccion.lng},
        success: function (data) {//data es una interseccion con sus campos
				//Tal vez mostrar un infoWindow con informacion en el mapa.
				//tambien mostrar los campos rellenos con lo que viene de la base
        		$('#result').html(data);
		},
		statusCode: {
			404: function() {
				alert( "El punto no es una interseccion" );
			}
		}
	});
}

google.maps.event.addDomListener(window, 'load', initialize);
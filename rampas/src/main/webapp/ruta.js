
var directionsService = new google.maps.DirectionsService();
var map;
var cordobaAl3950 = new google.maps.LatLng(-34.609226, -58.374925); 
var cordobaAl3450 = new google.maps.LatLng(-34.598205, -58.420201);
var pointsArray =[];
var arrayDeColores= ["#FF0000","#00FF00", "#0000FF"];
var geocoder;
var autocompleteDesde;
var autocompleteHasta;
var rutaConMarcadores;
var polilineas= [];

function initialize() {
	
	
	geocoder = new google.maps.Geocoder();
	autocompleteDesde = new google.maps.places.Autocomplete(
	(document.getElementById('inputDesde')),{ types: ['geocode'] });
	google.maps.event.addListener(autocompleteDesde, 'place_changed', function() {
	});
    
	autocompleteHasta = new google.maps.places.Autocomplete(
	(document.getElementById('inputHasta')),{ types: ['geocode'] });
	google.maps.event.addListener(autocompleteHasta, 'place_changed', function() {
	});
	
    var mapOptions = {
		zoom: 14,
		center: cordobaAl3950
	}
	
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	var markers = [];

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-34.650316, -58.533205),
      new google.maps.LatLng(-34.549427, -58.363947));
  map.fitBounds(defaultBounds);

}

function crearMarcador(posicion){
	return new google.maps.Marker ({
		position:posicion,
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 2
		}
	});
}


function agruparMarcadores(ruta){
	var marcadores = [];
	for(var j = 0; j < ruta.legs.length; j++){		
		for(var k = 0; k < ruta.legs[j].steps.length; k++){			
			for(var l = 0; l < ruta.legs[j].steps[k].path.length; l++){
				var marker = crearMarcador(ruta.legs[j].steps[k].path[l]);
				marcadores.push(marker);
			}
		}
	}
	return marcadores;
}

function posicionDeMarcador(marcador){
	return marcador.position;
}

function crearPolilinea(color){
	var polilinea = new google.maps.Polyline({
		path:rutaConMarcadores.map(posicionDeMarcador),
		strokeColor: color,
		strokeOpacity: 1.0,
		strokeWeight: 2
		});
	return {poly:polilinea, marcadores: rutaConMarcadores};
}


function habilitarBotonDeRuta(idRuta){
	var divCheckboxes = document.getElementById("checkboxes");
	var checkbox = document.createElement("input"); 
	checkbox.setAttribute("type", "checkbox");
	checkbox.setAttribute("name", "checkRuta" + idRuta);
	checkbox.setAttribute("id", "checkRuta" + idRuta);
	checkbox.setAttribute("value", "Ruta " + idRuta);
	checkbox.onchange=function(){
		if(document.getElementById("checkRuta" + idRuta).checked){
				polilineas[idRuta].poly.setMap(map);
				for(var i = 0; i < polilineas[idRuta].marcadores.length; i++){
					polilineas[idRuta].marcadores[i].setMap(map);
				}
			}
		else{
			polilineas[idRuta].poly.setMap(null);
			for(var i = 0; i < polilineas[idRuta].marcadores.length; i++){
				polilineas[idRuta].marcadores[i].setMap(null);
			}
		}
	};
	polilineas[idRuta] = crearPolilinea(arrayDeColores[idRuta-1]);
	divCheckboxes.appendChild(checkbox); 
	if(idRuta == 1){
		checkbox.checked = true;
		polilineas[idRuta].poly.setMap(map);
		for(var i = 0; i < polilineas[idRuta].marcadores.length; i++){
			polilineas[idRuta].marcadores[i].setMap(map);
		}		
	}
}


function dibujarRutas(respuesta){
	var rutas = []; 
	for(var i = 0; i < respuesta.routes.length; i++){	
		rutaConMarcadores = agruparMarcadores(respuesta.routes[i]);
		rutas.push(rutaConMarcadores);//Creo que no hace falta la var rutas
		habilitarBotonDeRuta( i+1);
	}
}

function calcularRutas() {
	var desdeString = document.getElementById('inputDesde').value;
	var hastaString = document.getElementById('inputHasta').value;

	geocoder.geocode( { 'address': desdeString}, function(resultsDesde, status) {
		if (status == google.maps.GeocoderStatus.OK) {
		    //map.setCenter(results[0].geometry.location);
		    geocoder.geocode( { 'address': hastaString}, function(resultsHasta, status) {
			if (status == google.maps.GeocoderStatus.OK) {
			  //map.setCenter(results[0].geometry.location);
			  	var request = {
					origin: resultsDesde[0].geometry.location,
					destination: resultsHasta[0].geometry.location,
					provideRouteAlternatives: true,
					travelMode: google.maps.TravelMode.WALKING
				};
				directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {	//Ver que puedo poner si hay un error.
						dibujarRutas(response);
						//Hacer Zoom sobre esa ruta
						var latlngbounds = new google.maps.LatLngBounds();
						latlngbounds.extend(resultsDesde[0].geometry.location);
						latlngbounds.extend(resultsHasta[0].geometry.location);
						map.setCenter(latlngbounds.getCenter());
						map.fitBounds(latlngbounds); 
					}
					else{
						alert('Error al dibujar las rutas: ' + status);
					}
				});
			} else {
			  alert('La direccion no se pudo encontrar: ' + status);
			}
	});
		} else {
		  alert('La direccion no se pudo encontrar: ' + status);
		}
	});

	

}






google.maps.event.addDomListener(window, 'load', initialize);

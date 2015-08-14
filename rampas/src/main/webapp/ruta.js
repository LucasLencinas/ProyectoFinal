
var directionsService = new google.maps.DirectionsService();
var map;
var panorama;
var cordobaAl3950 = new google.maps.LatLng(-34.609226, -58.374925); 
var cordobaAl3450 = new google.maps.LatLng(-34.598205, -58.420201);
var infowindow = new google.maps.InfoWindow();
var pointsArray =[];
var arrayDeColores= ["#FF0000","#00FF00", "#0000FF"];
var geocoder;
var autocompleteDesde;
var autocompleteHasta;
var checkpointsRuta;
var polilineas= [];

function initialize() {
	
	
	geocoder = new google.maps.Geocoder();
	autocompleteDesde = new google.maps.places.Autocomplete(
	($("#inputDesde")[0]),{ types: ['geocode'] });
	google.maps.event.addListener(autocompleteDesde, 'place_changed', function() {
	});
    
	autocompleteHasta = new google.maps.places.Autocomplete(
	($("#inputHasta")[0]),{ types: ['geocode'] });
	google.maps.event.addListener(autocompleteHasta, 'place_changed', function() {
	});
	
    var mapOptions = {
		zoom: 14,
		center: cordobaAl3950
	}
	
	map = new google.maps.Map($("#map-canvas")[0], mapOptions);

	var markers = [];

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-34.650316, -58.533205),
      new google.maps.LatLng(-34.549427, -58.363947));
  map.fitBounds(defaultBounds);

//cargarMarcadoresDeEjemplos(calles);  
//probarDistancia();
  
  
}//Fin initialize

/*
function probarDistancia(){

	var unaCalle = coordenadasDesdeString(calles[15000].st_astext);
	var unMarcador = crearMarcador(unaCalle[0]);
	unMarcador.setMap(map);  
	var circle = new google.maps.Circle({
	  map: map,
	  radius: 100,    // 10 miles in metres
	  fillColor: '#AA0000'
	});
	circle.bindTo('center', unMarcador, 'position');
    for(var i = 0; i < calles.length; i++) {
		var coordenadaCalle = coordenadasDesdeString(calles[i].st_astext);
		for(var j = 0; j < coordenadaCalle.length; j++){
			if(google.maps.geometry.spherical.computeDistanceBetween (unMarcador.position, coordenadaCalle[j]) < 100)
				crearMarcador(coordenadaCalle[j]).setMap(map); 
		}
    }
}
*/

function coordenadasDesdeString(stringCalle){
	var coordenadas = [];
	var punto = {lat:"", lng:""};
	var substring = stringCalle.slice(stringCalle.indexOf("((")+2,stringCalle.indexOf("))")) ;
	var puntos =substring.split(",");

	for (var i = 0; i < puntos.length; i++){
		punto.lng = puntos[i].slice(0, puntos[i].indexOf(" "));
		punto.lat = puntos[i].slice(puntos[i].indexOf(" "),puntos[i].length);
		coordenadas.push(new google.maps.LatLng( parseFloat(punto.lat), parseFloat(punto.lng)));
	}
	return coordenadas;
}


/*
"id": "42974",
"tipo_c": "AVENIDA",
"nomb_ca_co": "AV. DEL LIBERTADOR",
((-58.4650265140754 -34.5360367206647,-58.4655673994567 -34.535197021891))
*/
function cargarMarcadoresDeEjemplos(calles) {
    for(var i = 0; i < 200/*calles.length*/; i++) {
		var coordenadaCalle = coordenadasDesdeString(calles[i].st_astext);
		for(var j = 0; j < coordenadaCalle.length; j++){
			crearMarcador(coordenadaCalle[j]).setMap(map); 
		}
    }
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


function esEsquina(posAnterior, posActual){
	var distanciaMapsJSON, distanciaMapsMaps;
	for(var i = 0; i < calles.length; i++) {
		var coordenadaCalle = coordenadasDesdeString(calles[i].st_astext);
		for(var j = 0; j < coordenadaCalle.length; j++){
			distanciaMapsJSON = google.maps.geometry.spherical.computeDistanceBetween(
				posActual, coordenadaCalle[j]);
			distanciaMapsMaps = google.maps.geometry.spherical.computeDistanceBetween(
				posAnterior, posActual);
			if(distanciaMapsJSON < 5 && distanciaMapsMaps > 10){
				return true;	
			}
		}
    }
	return false;
}

function agruparCheckpoints(ruta){
	var checkpoints= [];
	//Direccion hardcodeada para que no funcione la primera comparacion
	var posAnterior = new google.maps.LatLng(5, 5);
	for(var j = 0; j < ruta.legs.length; j++){		
		for(var k = 0; k < ruta.legs[j].steps.length; k++){			
			for(var l = 0; l < ruta.legs[j].steps[k].path.length; l++){
				checkpoints.push(ruta.legs[j].steps[k].path[l]);
			}
		}
	}
	return checkpoints;
}

/*
function posicionDeMarcador(marcador){
	return marcador.position;
}
*/
function crearPolilinea(color,puntosIntermedios){
	var polilinea = new google.maps.Polyline({
		path:puntosIntermedios/*.map(posicionDeMarcador)*/,
		strokeColor: color,
		strokeOpacity: 1.0,
		strokeWeight: 2
		});
	return {poly:polilinea, puntos: puntosIntermedios , marcadores:[]};
}

function mostrarStreetView(lat, lng){
	panorama = map.getStreetView();
	panorama.setPosition(new google.maps.LatLng(lat, lng));
	panorama.setPov(/** @type {google.maps.StreetViewPov} */({
    heading: 265,
    pitch: 0
  }));
  var toggle = panorama.getVisible();
  if (toggle == false) {
    panorama.setVisible(true);
  } else {
    panorama.setVisible(false);
  }
}

function rellenarInfoWindow(unInfoWindow, marcador){

var direccion, estado, accesibilidad,boton;
geocoder.geocode({'latLng': marcador.getPosition()}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        direccion = results[0].formatted_address + "</br>";
		//Consultar al servidor lo siguiente:
		estado = "Bien</br>";
		accesibilidad = "Se puede cruzar en todos los sentidos</br>";
		boton = "<input type='button' id='streetview' value='StreetView' "+
			"onclick='mostrarStreetView" +results[0].geometry.location + "'></br>";
		unInfoWindow.setContent(direccion + estado + accesibilidad + boton);
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });

}




function habilitarBotonDeRuta(idRuta){
	var checkbox =	$("<input />", { 
		type: "checkbox", 
		id: "checkRuta" + idRuta, 
		value: "Ruta " + idRuta,
		name: "checkRuta" + idRuta
		});
	checkbox.change(function() {
		if($("#checkRuta" + idRuta).is(':checked')){
				polilineas[idRuta].poly.setMap(map);
				for(var i = 0; i < polilineas[idRuta].marcadores.length; i++){
					polilineas[idRuta].marcadores[i].setMap(map);
					google.maps.event.addListener(polilineas[idRuta].marcadores[i], 'click', function() {
					   rellenarInfoWindow(infowindow,this);
					   infowindow.open(map,this);
					});
				}
			}
		else{
			polilineas[idRuta].poly.setMap(null);
			for(var i = 0; i < polilineas[idRuta].marcadores.length; i++){
				polilineas[idRuta].marcadores[i].setMap(null);
			}
		}
	});

		

	$("#checkboxes").append(checkbox); 
	if(idRuta == 1){
		checkbox.prop('checked', true);
		polilineas[idRuta].poly.setMap(map);
		for(var i = 0; i < polilineas[idRuta].marcadores.length; i++){
			polilineas[idRuta].marcadores[i].setMap(map);
			google.maps.event.addListener(polilineas[idRuta].marcadores[i], 'click', function() {
			   rellenarInfoWindow(infowindow,this);
			   infowindow.open(map,this);
			});			
		}		
	}
}

function marcadoresCercanos(unaPolilinea){
	var cercanos = [];
	var latlng;

	$.each(barrios, function(index,barrio){
		$.each(barrio.calles, function(indice,calle){
			latlng = new google.maps.LatLng(calle.coordenadas[0],calle.coordenadas[1]);
			if(google.maps.geometry.poly.isLocationOnEdge(latlng, unaPolilinea, 0.00016)){
				cercanos.push(crearMarcador(latlng));	
			}
		});
	});
	return cercanos;
}

function dibujarRutas(respuesta){
	for(var i = 0; i < respuesta.routes.length; i++){	
		checkpointsRuta = agruparCheckpoints(respuesta.routes[i]);
		polilineas[i] = crearPolilinea(arrayDeColores[i],checkpointsRuta);
		polilineas[i].marcadores = marcadoresCercanos(polilineas[i].poly);
		habilitarBotonDeRuta(i);
	}
}

function calcularRutas() {
	var desdeString = $("#inputDesde").val();
	var hastaString = $("#inputHasta").val();

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

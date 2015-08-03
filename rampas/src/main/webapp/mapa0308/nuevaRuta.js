
var directionsService = new google.maps.DirectionsService();
var map;
var panorama;
var cordobaAl3950 = new google.maps.LatLng(-34.609226, -58.374925); 
var cordobaAl3450 = new google.maps.LatLng(-34.598205, -58.420201);
var infowindow = new google.maps.InfoWindow();
var pointsArray =[];
var arrayDeColores= ["#FF0000","#00FF00", "#0000FF", "#000FFF","#00FFFF","#FFF000","#FFFF00","#0FFF00"];
var geocoder;
var autocompleteDesde;
var autocompleteHasta;
var checkpointsRuta;
var polilineas= [];
var poligonos = [];

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
  //calcularRutas();
  
}//Fin initialize


function crearMarcador(posicion){
	return new google.maps.Marker ({
		position:posicion,
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 2
		}
	});
}

function crearMarcadorConIndex(posicion,index){
	return new google.maps.Marker ({
		position:posicion,
		color:arrayDeColores[index],
		title: ""+index+""
	/*	icon: {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 2
		}*/
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
				ruta.legs[j].steps[k].path[l].leg = k;
				checkpoints.push(ruta.legs[j].steps[k].path[l]);
				//crearMarcadorConIndex(ruta.legs[j].steps[k].path[l],k).setMap(map); 
				//Solo para ver cuando se produce un cambio de direccion
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

	var poligonos = crearPoligono(puntosIntermedios);
	return {poly:polilinea,figura: poligonos, puntos: puntosIntermedios , marcadores:[]};
}

function crearPoligono(puntos){
	var puntosIzq = [];
	var puntosDer = [];
	var direccion = {lat: "", lng: ""};
	var puntoDer,puntoIzq;
	var poligonosRutaElegida = [];
	var legActual = 0;

	direccion = calcularDireccion(puntos[0], puntos[1]);

	for(var i=0;i<puntos.length-1;i++){//Pongo el -1 para no estar chequeando que haya alguno mas
		if(puntos[i].leg != legActual){
			legActual = puntos[i].leg;
			//Como es finaliza el leg, le agrego un poco mas de logitud en esa direccion
			punto = new google.maps.LatLng(puntos[i].lat()+direccion.lat, puntos[i].lng()+ direccion.lng);
			//Agrego puntos a los costados y los agrego a las listas
			puntoIzq = restarNormal(punto,direccion);
			crearMarcador(new google.maps.LatLng(puntoIzq.lat,puntoIzq.lng)).setMap(map);
			puntoDer = sumarNormal(punto,direccion);
			crearMarcador(new google.maps.LatLng(puntoDer.lat,puntoDer.lng)).setMap(map);
			puntosDer.push(puntoDer);
			puntosIzq.push(puntoIzq);
			//Cierro el poligono
			poligonosRutaElegida.push(new google.maps.Polygon({
				paths: puntosDer.concat(puntosIzq.reverse())
			}));
			//Vuelvo a poner el punto donde estaba.
			puntosDer = [];
			puntosIzq = [];
			direccion = calcularDireccion(puntos[i], puntos[i+1]);
		}
		//Agrego puntos a los costados y los agrego a las listas.
		punto = new google.maps.LatLng(puntos[i].lat()-direccion.lat, puntos[i].lng()- direccion.lng);
		puntoIzq = restarNormal(punto,direccion);
		crearMarcador(new google.maps.LatLng(puntoIzq.lat,puntoIzq.lng)).setMap(map);
		puntoDer = sumarNormal(punto,direccion);
		crearMarcador(new google.maps.LatLng(puntoDer.lat,puntoDer.lng)).setMap(map);
		puntosDer.push(puntoDer);
		puntosIzq.push(puntoIzq);
	}
//Ahora me quedo el ultimo punto del array, entonces
//le agrego un poco mas de longitud y cierro el poligono
	punto = new google.maps.LatLng(puntos[i].lat()+direccion.lat, puntos[i].lng()+ direccion.lng);
	//Agrego puntos a los costados y los agrego a las listas
	puntoIzq = restarNormal(punto,direccion);
	crearMarcador(new google.maps.LatLng(puntoIzq.lat,puntoIzq.lng)).setMap(map);
	puntoDer = sumarNormal(punto,direccion);
	crearMarcador(new google.maps.LatLng(puntoDer.lat,puntoDer.lng)).setMap(map);
	puntosDer.push(puntoDer);
	puntosIzq.push(puntoIzq);
	//Cierro el poligono
	poligonosRutaElegida.push(new google.maps.Polygon({
		paths: puntosDer.concat(puntosIzq.reverse())
	}));

	return poligonosRutaElegida;

}

function sumarNormal(punto,direccion){
	var normal = calcularNormal(direccion);
	return {lat: punto.lat() + normal.lat, lng: punto.lng() + normal.lng}
}

function restarNormal(punto,direccion){
	var normal = calcularNormal(direccion);
	return {lat: punto.lat() - normal.lat, lng: punto.lng() - normal.lng}
}

function calcularNormal(direccion){
	return {lat: direccion.lng, lng: -direccion.lat}
}

function calcularDireccion(inicio, fin){
	var direccion = {lat: fin.lat() - inicio.lat(),lng: fin.lng() - inicio.lng()};
  var versor = calcularVersor(direccion);
	return versor;
	}

function calcularVersor(direccion){
	var modulo = Math.sqrt(Math.pow(direccion.lat,2) + Math.pow(direccion.lng,2));
	var longVersor = 0.00008;
	return {lat: direccion.lat*longVersor/modulo, lng: direccion.lng*longVersor/modulo};
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
				$.each(polilineas[idRuta].figura,function(index, unPoligono){
					unPoligono.setMap(map);
				});
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
			$.each(polilineas[idRuta].figura,function(index, unPoligono){
				unPoligono.setMap(null);
			});
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
/*
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
*/
function marcadoresIncluidos(poligonos){
	var latlng;
	var incluidos = [];
	$.each(barrios, function(index,barrio){
		$.each(barrio.calles, function(indice,calle){
			latlng = new google.maps.LatLng(calle.coordenadas[0],calle.coordenadas[1]);
			function poligonoContienePunto(poligono, indice,array){
				return google.maps.geometry.poly.containsLocation(latlng, poligono);
			}
			if(poligonos.some(poligonoContienePunto)){
      	incluidos.push(crearMarcador(latlng));	
			}
    });
	});
	return incluidos;
}



function dibujarRutas(respuesta){
	/*var i =0;*/for(var i = 0; i < respuesta.routes.length; i++){	
		checkpointsRuta = agruparCheckpoints(respuesta.routes[i]);
		polilineas[i] = crearPolilinea(arrayDeColores[i],checkpointsRuta);
		polilineas[i].marcadores = marcadoresIncluidos(polilineas[i].figura);//marcadoresCercanos(polilineas[i].poly);
		habilitarBotonDeRuta(i);
	}
}

function marcadoresDentroDelPoligono(poligono){
	var incluidos = [];
	var latlng;

	$.each(barrios, function(index,barrio){
		$.each(barrio.calles, function(indice,calle){
			latlng = new google.maps.LatLng(calle.coordenadas[0],calle.coordenadas[1]);
			if (google.maps.geometry.poly.containsLocation(latlng, poligono)) {
      incluidos.push(crearMarcador(latlng));	
    	}
		});
	});
	return incluidos;

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

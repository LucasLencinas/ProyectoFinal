
var directionsService = new google.maps.DirectionsService();
var map;
var panorama;
var cordobaAl3950 = new google.maps.LatLng(-34.609226, -58.374925); 
var cordobaAl3450 = new google.maps.LatLng(-34.598205, -58.420201);
var infowindow = new google.maps.InfoWindow();
var pointsArray =[];
var geocoder;
var autocompleteDesde;
var autocompleteHasta;
var checkpointsRuta;
var polilineas= [];
var poligonos = [];
var colores = {};
var tallIcono = new google.maps.Size(32, 32);
var originIcono = new google.maps.Point(0,0);
var anchorIcono = new google.maps.Point(16, 32);

colores['GRIS'] = {valor:"#808080", puntaje:0, icono: new google.maps.MarkerImage("imagen/ltblue-dot.png",tallIcono,originIcono,anchorIcono)};
colores['AZUL'] = {valor:"#0000FF", puntaje:0, icono: new google.maps.MarkerImage("imagen/blue-dot.png",tallIcono,originIcono,anchorIcono)};
colores['VIOLETA'] = {valor:"#7f00ff", puntaje:-1, icono: new google.maps.MarkerImage("imagen/purple-dot.png",tallIcono,originIcono,anchorIcono)};
colores['ROJO'] = {valor:"#ff0000", puntaje:1, icono: new google.maps.MarkerImage("imagen/red-dot.png",tallIcono,originIcono,anchorIcono)};
colores['NARANJA'] = {valor:"#ff8000", puntaje:2, icono: new google.maps.MarkerImage("imagen/orange-dot.png",tallIcono,originIcono,anchorIcono)};
colores['AMARILLO'] = {valor:"#ffff00", puntaje:4, icono: new google.maps.MarkerImage("imagen/yellow-dot.png",tallIcono,originIcono,anchorIcono)};
colores['VERDE'] = {valor:"#00ff00", puntaje:5, icono: new google.maps.MarkerImage("imagen/green-dot.png",tallIcono,originIcono,anchorIcono)};

var iconShadow = new google.maps.MarkerImage('imagenes/msmarker.shadow.png',
      new google.maps.Size(59, 32),
      new google.maps.Point(0,0),
      new google.maps.Point(16, 32));
	  
  var iconShape = {
	coord: [19,0, 24,5, 24,12, 23,13, 23,14, 20,17, 20,18, 19,19,19,20, 18,21, 
			18,22, 17,23, 17,26, 16,27, 16,31, 14,31, 14,26, 13,25,13,23, 
			12,22, 12,20, 10,18, 10,17, 7,14, 7,13, 6,12, 6,6, 7,5, 7,4, 11,0],
    type: 'poly'
  };

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
		center: cordobaAl3950,
		draggableCursor: 'default'
	}
	map = new google.maps.Map($("#map-canvas")[0], mapOptions);
	var defaultBounds = new google.maps.LatLngBounds(
	  new google.maps.LatLng(-34.650316, -58.533205),
	  new google.maps.LatLng(-34.549427, -58.363947));
	map.fitBounds(defaultBounds);
	
	var contextMenuOptions={};
	contextMenuOptions.classNames={menu:'context_menu', menuSeparator:'context_menu_separator'};
	
	//	create an array of ContextMenuItem objects
	//	an 'id' is defined for each of the four directions related items
	var menuItems=[];
	menuItems.push({className:'context_menu_item', eventName:'directions_origin_click', id:'directionsOriginItem', label:'Desde aqui'});
	menuItems.push({className:'context_menu_item', eventName:'directions_destination_click', id:'directionsDestinationItem', label:'Hasta aqui'});
	menuItems.push({className:'context_menu_item', eventName:'clear_directions_click', id:'clearDirectionsItem', label:'Clear directions'});
	menuItems.push({className:'context_menu_item', eventName:'get_directions_click', id:'getDirectionsItem', label:'Get directions'});
	//	a menuItem with no properties will be rendered as a separator
	menuItems.push({});
	menuItems.push({className:'context_menu_item', eventName:'Rampas Cercanas', label:'Zoom in'});
	/*Este Nueva Rampa se deberia habilitar cuando se haga click antes en Rampas Cercanas creo, o solo cuando aparezca un marcador*/
	menuItems.push({className:'context_menu_item', eventName:'Nueva Rampa', label:'Zoom out'});

	contextMenuOptions.menuItems=menuItems;
	
	var contextMenu=new ContextMenu(map, contextMenuOptions);
	
	google.maps.event.addListener(map, 'rightclick', function(mouseEvent){
		contextMenu.show(mouseEvent.latLng);
	});
	
	/*marcadores Iniciales y finales*/
	var markerOptions={};
	markerOptions.icon='http://www.google.com/intl/en_ALL/mapfiles/markerA.png';
	markerOptions.map=null;
	markerOptions.position=new google.maps.LatLng(0, 0);
	markerOptions.title='Directions origin';
	
	var originMarker=new google.maps.Marker(markerOptions);
	
	markerOptions.icon='http://www.google.com/intl/en_ALL/mapfiles/markerB.png';
	markerOptions.title='Directions destination';
	var destinationMarker=new google.maps.Marker(markerOptions);

	google.maps.event.addListener(originMarker, 'rightclick', function(){
		contextMenu.show(this.getPosition());
	});
	google.maps.event.addListener(destinationMarker, 'rightclick', function(){
		contextMenu.show(this.getPosition());
	});
	
	
	google.maps.event.addListener(contextMenu, 'menu_item_selected', function(latLng, eventName){
		switch(eventName){
			case 'directions_origin_click':
				originMarker.setPosition(latLng);
				if(!originMarker.getMap()){
					originMarker.setMap(map);
				}
				geocoder.geocode({'location': latLng}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
					  if (results[0]) {
						$("#inputDesde").val(results[0].formatted_address);
					  } else {
						window.alert('No results found');
					  }
					} else {
					  window.alert('Geocoder failed due to: ' + status);
					}
				});

			break;
			case 'directions_destination_click':
				destinationMarker.setPosition(latLng);
				if(!destinationMarker.getMap()){
					destinationMarker.setMap(map);
				}
				geocoder.geocode({'location': latLng}, function(results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
					  if (results[0]) {
						$("#inputHasta").val(results[0].formatted_address);
					  } else {
						window.alert('No results found');
					  }
					} else {
					  window.alert('Geocoder failed due to: ' + status);
					}
				});
				
				break;
			case 'clear_directions_click':
				directionsRenderer.setMap(null);
				//	set CSS styles to defaults
				document.getElementById('clearDirectionsItem').style.display='';
				document.getElementById('directionsDestinationItem').style.display='';
				document.getElementById('directionsOriginItem').style.display='';
				document.getElementById('getDirectionsItem').style.display='';
				break;
			case 'get_directions_click':
				var directionsRequest={};
				directionsRequest.destination=destinationMarker.getPosition();
				directionsRequest.origin=originMarker.getPosition();
				directionsRequest.travelMode=google.maps.TravelMode.DRIVING;
				
				
				calcularRutas();
				/*
				directionsService.route(directionsRequest, function(result, status){
					if(status===google.maps.DirectionsStatus.OK){
						//	hide the origin and destination markers as the DirectionsRenderer will render Markers itself
						originMarker.setMap(null);
						destinationMarker.setMap(null);
						directionsRenderer.setDirections(result);
						directionsRenderer.setMap(map);
						//	hide all but the 'Clear directions' menu item
						document.getElementById('clearDirectionsItem').style.display='block';
						document.getElementById('directionsDestinationItem').style.display='none';
						document.getElementById('directionsOriginItem').style.display='none';
						document.getElementById('getDirectionsItem').style.display='none';
					} else {
						alert('Sorry, the map was unable to obtain directions.\n\nThe request failed with the message: '+status);
					}
				});
				*/
				break;
			case 'zoom_in_click':
				map.setZoom(map.getZoom()+1);
				break;
			case 'zoom_out_click':
				map.setZoom(map.getZoom()-1);
				break;
		}
		if(originMarker.getMap() && destinationMarker.getMap() && document.getElementById('getDirectionsItem').style.display===''){
			//	display the 'Get directions' menu item if it is not visible and both directions origin and destination have been selected
			document.getElementById('getDirectionsItem').style.display='block';
		}
	});
	

  
}//Fin initialize


function crearMarcador(posicion){
	return new google.maps.Marker ({
		position:posicion,
		cursor: 'pointer',
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			fillColor: "#000000",
			strokeColor:"#FF0000",
			scale: 3
		}
	});
}

function crearMarcadorConColor(posicion,icono){
	return new google.maps.Marker ({
		position:posicion,
		cursor: 'pointer',
		icon: icono,
		shape: iconShape
		/*zIndex: Math.round(latlng.lat()*-100000)<<5*/
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
function crearPolilinea(puntosIntermedios){
	var polilinea = new google.maps.Polyline({
		path:puntosIntermedios/*.map(posicionDeMarcador)*/,
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
			//crearMarcador(new google.maps.LatLng(puntoIzq.lat,puntoIzq.lng)).setMap(map);
			puntoDer = sumarNormal(punto,direccion);
			//crearMarcador(new google.maps.LatLng(puntoDer.lat,puntoDer.lng)).setMap(map);
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
		//crearMarcador(new google.maps.LatLng(puntoIzq.lat,puntoIzq.lng)).setMap(map);
		puntoDer = sumarNormal(punto,direccion);
		//crearMarcador(new google.maps.LatLng(puntoDer.lat,puntoDer.lng)).setMap(map);
		puntosDer.push(puntoDer);
		puntosIzq.push(puntoIzq);
	}
//Ahora me quedo el ultimo punto del array, entonces
//le agrego un poco mas de longitud y cierro el poligono
	punto = new google.maps.LatLng(puntos[i].lat()+direccion.lat, puntos[i].lng()+ direccion.lng);
	//Agrego puntos a los costados y los agrego a las listas
	puntoIzq = restarNormal(punto,direccion);
	//crearMarcador(new google.maps.LatLng(puntoIzq.lat,puntoIzq.lng)).setMap(map);
	puntoDer = sumarNormal(punto,direccion);
	//crearMarcador(new google.maps.LatLng(puntoDer.lat,puntoDer.lng)).setMap(map);
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
		id: "checkRuta" + idRuta
		});
	checkbox.change(function() {
		if($("#checkRuta" + idRuta).is(':checked')){
				polilineas[idRuta].poly.setMap(map);
				/* PARA MOSTRAR EL POLIGONO QUE ENCIERRO A LA RUTA
				$.each(polilineas[idRuta].figura,function(index, unPoligono){
					unPoligono.setMap(map);
				});
				*/
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

	//$("#checkboxes").append("Ruta "+ idRuta + " <input id='checkRuta"+idRuta+"' type='checkbox'>");
	//$("#checkboxes").append("Ruta "+ idRuta + checkbox);
	$("#checkboxes").append('<label>Ruta ' + (idRuta+1) + ':</label>');
	$("#checkboxes").append(checkbox);
	$("#checkboxes").append("</br>");
	//$("#checkboxes").append(checkbox/*.after('<label>Ruta ' + idRuta + '</label>')*/); 
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

function calcularColorSegunRampa(punto){
/*
"tieneInformacion": false, 
"tieneRampa": false, 
"buenEstado": false, 
"crucesAccesibles": false
"reportada": false
*/
	if(punto.tieneInformacion == false)
		return	colores.ROJO;
	if(punto.reportada == true)
		return colores.ROJO;
	if(punto.tieneRampa == false)
		return colores.ROJO;
	if(punto.buenEstado == false && punto.crucesAccesibles == false)
		return colores.ROJO;
	if(punto.buenEstado == false && punto.crucesAccesibles == true)
		return colores.NARANJA;
	if(punto.buenEstado == true && punto.crucesAccesibles == false)
		return colores.AMARILLO;
	if(punto.buenEstado == true && punto.crucesAccesibles == true)
		return colores.VERDE;
}

function marcadoresIncluidos(poligonos){
	var latlng;
	var marcador;
	var color;
	var incluidos = [];
	$.each(barrios, function(index,barrio){
		$.each(barrio.calles, function(indice,punto){
			latlng = new google.maps.LatLng(punto.coordenadas[0],punto.coordenadas[1]);
			function poligonoContienePunto(poligono, indice,array){
				return google.maps.geometry.poly.containsLocation(latlng, poligono);
			}
			if(poligonos.some(poligonoContienePunto)){
				marcador = crearMarcadorConColor(latlng, calcularColorSegunRampa(punto).icono);
				marcador.tieneInformacion = punto.tieneInformacion;
				marcador.tieneRampa = punto.tieneRampa; 
				marcador.buenEstado = punto.buenEstado;
				marcador.crucesAccesibles = punto.crucesAccesibles;
				marcador.reportada = punto.reportada;
				incluidos.push(marcador);	
			}
		});
	});
	return incluidos;
}




function dibujarRutas(respuesta){
	/*var i =0;*/for(var i = 0; i < respuesta.routes.length; i++){	
		checkpointsRuta = agruparCheckpoints(respuesta.routes[i]);
		polilineas[i] = crearPolilinea(checkpointsRuta);
		polilineas[i].marcadores = marcadoresIncluidos(polilineas[i].figura);
		polilineas[i].poly.setOptions({strokeColor: colorDePolilinea(polilineas[i].marcadores)})
		habilitarBotonDeRuta(i);
	}
}

function colorDePolilinea(marcadores){
	var porcentaje, puntajeCamino = 0;
	function puntajeRampa(marcador){
		if(marcador.tieneInformacion == false)
			return	colores.GRIS;
		if(marcador.reportada == true)
			return colores.AZUL;
		if(marcador.tieneRampa == false)
			return colores.VIOLETA;
		if(marcador.buenEstado == false && marcador.crucesAccesibles == false)
			return colores.ROJO;
		if(marcador.buenEstado == false && marcador.crucesAccesibles == true)
			return colores.NARANJA;
		if(marcador.buenEstado == true && marcador.crucesAccesibles == false)
			return colores.AMARILLO;
		if(marcador.buenEstado == true && marcador.crucesAccesibles == true)
			return colores.VERDE;
	}
	
	$.each(marcadores, function(index,marcador){
		
		puntajeCamino += puntajeRampa(marcador).puntaje;
	});
	porcentaje = puntajeCamino/(colores.VERDE.puntaje * marcadores.length);
	if(porcentaje <= 0.40)
		return colores.ROJO.valor;
	if(porcentaje > 0.40 && porcentaje <= 0.60 )
		return colores.NARANJA.valor;
	if(porcentaje > 0.60 && porcentaje <= 0.80)
		return colores.AMARILLO.valor;
	if(porcentaje > 0.80 && porcentaje <= 1.00)
		return colores.VERDE.valor;
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


function borrarRutasPrevias(){

	$.each(polilineas, function(index,polilinea){
		polilinea.poly.setMap(null);
		$.each(polilinea.figura,function(index, unPoligono){
			unPoligono.setMap(null);
		});
		$.each(polilinea.marcadores,function(indice, marcador){
			marcador.setMap(null);
		});
	});
	polilineas = [];
	$("#checkboxes" ).empty();
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
							borrarRutasPrevias();
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

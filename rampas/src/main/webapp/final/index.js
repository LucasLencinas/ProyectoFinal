
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
var originMarker = {};
var destinationMarker = {};
var arrayRampasCercanas = [];
var contextMenu = {};
colores['GRIS'] = {valor:"#808080", puntaje:0, icono: new google.maps.MarkerImage("../imagen/ltblue-dot.png",tallIcono,originIcono,anchorIcono)};
colores['AZUL'] = {valor:"#0000FF", puntaje:0, icono: new google.maps.MarkerImage("../imagen/blue-dot.png",tallIcono,originIcono,anchorIcono)};
colores['VIOLETA'] = {valor:"#7f00ff", puntaje:-1, icono: new google.maps.MarkerImage("../imagen/purple-dot.png",tallIcono,originIcono,anchorIcono)};
colores['ROJO'] = {valor:"#ff0000", puntaje:1, icono: new google.maps.MarkerImage("../imagen/red-dot.png",tallIcono,originIcono,anchorIcono)};
colores['NARANJA'] = {valor:"#ff8000", puntaje:2, icono: new google.maps.MarkerImage("../imagen/orange-dot.png",tallIcono,originIcono,anchorIcono)};
colores['AMARILLO'] = {valor:"#ffff00", puntaje:4, icono: new google.maps.MarkerImage("../imagen/yellow-dot.png",tallIcono,originIcono,anchorIcono)};
colores['VERDE'] = {valor:"#00ff00", puntaje:5, icono: new google.maps.MarkerImage("../imagen/green-dot.png",tallIcono,originIcono,anchorIcono)};

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
	menuItems.push({className:'context_menu_item', eventName:'desde_aqui_click', id:'desde_aqui_item', label:'Desde aqui'});
	menuItems.push({className:'context_menu_item', eventName:'hasta_aqui_click', id:'hasta_aqui_item', label:'Hasta aqui'});
	menuItems.push({className:'context_menu_item', eventName:'descartar_ruta_click', id:'descartar_ruta_item', label:'Descartar Ruta'});
	menuItems.push({className:'context_menu_item', eventName:'calcular_ruta_click', id:'calcular_ruta_item', label:'Calcular Ruta'});
	//	a menuItem with no properties will be rendered as a separator
	menuItems.push({});
	menuItems.push({className:'context_menu_item', eventName:'rampas_cercanas_click', id:'rampas_cercanas_item', label:'Esquinas Cercanas'});
	/*Este Nueva Rampa se deberia habilitar cuando se haga click antes en Rampas Cercanas creo, o solo cuando aparezca un marcador*/
	menuItems.push({className:'context_menu_item', eventName:'ocultar_rampas_cercanas_click', id: 'ocultar_rampas_cercanas_item', label:'Ocultar Esquinas Cercanas'});

	contextMenuOptions.menuItems=menuItems;
	
	contextMenu=new ContextMenu(map, contextMenuOptions);
	google.maps.event.addListener(map, 'rightclick', function(mouseEvent){
		contextMenu.show(mouseEvent.latLng);
		if(originMarker.getMap() == null || destinationMarker.getMap() == null){
			$('#calcular_ruta_item').hide();
		}
		else{
			$('#calcular_ruta_item').show();
		}
		if(originMarker.getMap() == null || destinationMarker.getMap()  == null || polilineas.length == 0){ //Si no hay ninguna ruta habilitada
			$('#descartar_ruta_item').hide();
		}
		else{
			$('#descartar_ruta_item').show();
		}
		if(arrayRampasCercanas.length == 0){
			$('#ocultar_rampas_cercanas_item').hide();
		}
		else{
			$('#ocultar_rampas_cercanas_item').show();
		}
	});
	
	/*marcadores Iniciales y finales*/
	var markerOptions={};
	markerOptions.icon='http://www.google.com/intl/en_ALL/mapfiles/markerA.png';
	markerOptions.map=null;
	markerOptions.position=new google.maps.LatLng(0, 0);
	
	originMarker=new google.maps.Marker(markerOptions);
	
	markerOptions.icon='http://www.google.com/intl/en_ALL/mapfiles/markerB.png';
	destinationMarker=new google.maps.Marker(markerOptions);

	google.maps.event.addListener(originMarker, 'rightclick', function(){
		contextMenu.show(this.getPosition());
	});
	google.maps.event.addListener(destinationMarker, 'rightclick', function(){
		contextMenu.show(this.getPosition());
	});
	
	google.maps.event.addListener(contextMenu, 'menu_item_selected', setearListenerParaContextMenu);
	
}//Fin initialize

function agruparCheckpoints(ruta){
	var checkpoints= [];
	//Direccion hardcodeada para que no funcione la primera comparacion
	var posAnterior = new google.maps.LatLng(5, 5);
	for(var j = 0; j < ruta.legs.length; j++){		
		for(var k = 0; k < ruta.legs[j].steps.length; k++){			
			for(var l = 0; l < ruta.legs[j].steps[k].path.length; l++){
				ruta.legs[j].steps[k].path[l].leg = k;
				checkpoints.push(ruta.legs[j].steps[k].path[l]);
			}
		}
	}
	return checkpoints;
}


function crearPolilinea(puntosIntermedios){
	var polilinea = new google.maps.Polyline({
		path:puntosIntermedios/*.map(posicionDeMarcador)*/,
		strokeOpacity: 1.0,
		strokeWeight: 2
		});

	var poligonos = crearPoligono(puntosIntermedios);
	return {poly:polilinea,figura: poligonos, puntos: puntosIntermedios , marcadores:[]};
}

function habilitarBotonDeRuta(idRuta){
	var checkbox =	$("<input />", { 
		type: "checkbox", 
		id: "checkRuta" + idRuta
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
			$.each(polilineas[idRuta].figura,function(index, unPoligono){
				unPoligono.setMap(null);
			});
			for(var i = 0; i < polilineas[idRuta].marcadores.length; i++){
				polilineas[idRuta].marcadores[i].setMap(null);
			}
		}
	});

	$("#checkboxes").append('<label>Ruta ' + (idRuta+1) + ':</label>');
	$("#checkboxes").append(checkbox);
	$("#checkboxes").append("</br>");
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


function marcadoresIncluidos(poligonos, minimo, maximo){
	var latlng;
	var marcador;
	var color;
	var incluidos = [];
	
	
	$.each(barrios, function(index,barrio){
		//console.log("barrio:" + barrio.nombre);
		$.each(barrio.calles, function(indice,punto){
			//console.log("Indice: " + indice + ". Punto: " + punto.coordenadas[0] + ", " + punto.coordenadas[1]);
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
	var color = {};
	var minimo = {lat:500.0, lng:500.0}, maximo = {lat:-500.0, lng:-500.0};
	$.each(respuesta.routes, function(index, ruta){
		if(index == 0){//Para que solo tome una ruta solo para probar
		$.each(ruta.legs, function(i, leg){
			$.each(leg.steps, function(indice, step){
				$.each(step.path, function(index, latlng){
					minimo.lat = (latlng.lat() < minimo.lat)? latlng.lat() : minimo.lat;
					minimo.lng = (latlng.lng() < minimo.lng)? latlng.lng() : minimo.lng;
					maximo.lat = (latlng.lat() > maximo.lat)? latlng.lat() : maximo.lat;
					maximo.lng = (latlng.lng() > maximo.lng)? latlng.lng() : maximo.lng;
				});
			});
		});
		}
	});
	
	/**
	var perimetro = [];
	perimetro.push(new google.maps.LatLng(minimo.lat -0.001,minimo.lng -0.001));
	perimetro.push(new google.maps.LatLng(maximo.lat + 0.001,minimo.lng -0.001));
    perimetro.push(new google.maps.LatLng(maximo.lat +0.001,maximo.lng +0.001));
	perimetro.push(new google.maps.LatLng(minimo.lat -0.001,maximo.lng +0.001));
	
	[].push(new google.maps.Polygon({
		paths: perimetro,
		map:map
	}));
	**/
	for(var i = 0; i < respuesta.routes.length; i++){	
		checkpointsRuta = agruparCheckpoints(respuesta.routes[i]);
		polilineas[i] = crearPolilinea(checkpointsRuta);
		polilineas[i].marcadores = marcadoresIncluidos(polilineas[i].figura, minimo, maximo);
		color = colorDePolilinea(polilineas[i].marcadores);
		polilineas[i].poly.setOptions({strokeColor: color})
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
							ocultarRampasCercanas();
							dibujarRutas(response);
							//Hacer Zoom sobre esa ruta
							var latlngbounds = new google.maps.LatLngBounds();
							latlngbounds.extend(resultsDesde[0].geometry.location);
							latlngbounds.extend(resultsHasta[0].geometry.location);
							map.setCenter(latlngbounds.getCenter());
							map.fitBounds(latlngbounds); 
							map.setZoom(map.getZoom()-1); 
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


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
var tamanioMarcador = new google.maps.Size(24, 24);
var originMarker = {};
var destinationMarker = {};
var arrayRampasCercanas = [];
var contextMenu = {};
var marcadorActual = {};
var subconjuntoDeMarcadores = [];
var crucesBarrioElegido = [];
var polilineaAnterior =[];
var servidorActivado = false;
var barriosDelSelect = [];
colores['GRIS'] = {valor:"#808080", puntaje:0, icono: new google.maps.MarkerImage("imagen/ltblue-dot.png",null,null,null,tamanioMarcador)};
colores['AZUL'] = {valor:"#0000FF", puntaje:0, icono: new google.maps.MarkerImage("imagen/blue-dot.png",null,null,null,tamanioMarcador)};
colores['VIOLETA'] = {valor:"#7f00ff", puntaje:-1, icono: new google.maps.MarkerImage("imagen/purple-dot.png",null,null,null,tamanioMarcador)};
colores['ROJO'] = {valor:"#ff0000", puntaje:1, icono: new google.maps.MarkerImage("imagen/red-dot.png",null,null,null,tamanioMarcador)};
colores['NARANJA'] = {valor:"#ff8000", puntaje:2, icono: new google.maps.MarkerImage("imagen/orange-dot.png",null,null,null,tamanioMarcador)};
colores['AMARILLO'] = {valor:"#ffff00", puntaje:4, icono: new google.maps.MarkerImage("imagen/yellow-dot.png",null,null,null,tamanioMarcador)};
colores['VERDE'] = {valor:"#00ff00", puntaje:5, icono: new google.maps.MarkerImage("imagen/green-dot.png",null,null,null,tamanioMarcador)};

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

function echo(){
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/rampas/Rampas/echo",
		statusCode: {
			200: function(){
				servidorActivado = true;
				console.log("El servidor esta ACTIVADO");	
				llenarSelectOptions();
			}
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(JSON.stringify(jqXHR) + ". " + JSON.stringify(textStatus) + JSON.stringify(errorThrown) );
			servidorActivado = false;
			console.log("El servidor no esta ACTIVADO");
			llenarSelectOptions();//Poner estas dos llamadas en un complete
		}

	});
}


function initialize() {
	abrirSesionGuardada();
	
	echo();
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
	
	var contextMenu = crearContextMenu();
	
	
	/*marcadores Iniciales y finales*/
	originMarker = crearMarcadorConColor(new google.maps.LatLng(0, 0), new google.maps.MarkerImage("imagen/disability.png",null,null,null,new google.maps.Size(28, 32)),null);
	destinationMarker= crearMarcadorConColor(new google.maps.LatLng(0, 0), new google.maps.MarkerImage("imagen/finish.png",null,null,null,new google.maps.Size(28, 32)),null);
	google.maps.event.addListener(contextMenu, 'menu_item_selected', setearListenerParaContextMenu);
	
}//Fin initialize

function llenarSelectOptions(){
	if(servidorActivado === true){
		console.log("A punto de buscar barrios...");
		$.ajax({
			type: "GET",
			dataType: "json",
			url: "/rampas/Barrios/barrios",
			statusCode: {
				200: function(barrios){
					$.each(barrios, function (index, value) {
						$("#selectBarrios").append($('<option/>', { 
							value: value.nombre,
							text : value.nombre,
						}));
						barriosDelSelect.push({id: value.id, nombre:value.nombre, limites: value.limites});
					});
					ordenarSelect('selectBarrios');
					document.getElementById("selectBarrios").selectedIndex = "0";
					barriosDelSelect.sort(SortByNombre);
				},
				404: function () { 
					alerta("Hubo un problema al buscar los barrios en el sistema.");
				}
			},
      complete: function (jqXHR, textStatus) {
        var resultado = "";
        resultado += "Contenido jqHR:" + JSON.stringify(jqXHR) + ". ";
        resultado += "Contenido textStatus:" + JSON.stringify(textStatus) + ". ";
        console.log(resultado);
      }
		});		
	}else{
		$("body").append($("<script />", {src: "barrios.js"}));
		$.each(barrios, function (index, value) {
			$("#selectBarrios").append($('<option/>', { 
				value: value.nombre,
				text : value.nombre 
			}));
		});
	}
	ordenarSelect('selectBarrios');
}


/**Esta funcion se llama al apretarse el boton de Buscar despues de seleccionar el barrio en el Select**/
function buscarRampasPorBarrio(){
	var unCruce;
	var unMarcador;
	barrioElegido = $("#selectBarrios").prop("selectedIndex");
	var barrio = $("#selectBarrios option:selected").text();

	if(servidorActivado === true){
		mostrarLoading();
		console.log("A punto de buscar rampas del barrio: " + barrio);
		$.ajax({
		    type:"GET",
		    dataType: "json",
		    url: "/rampas/Rampas/barrios/" + barrio,
		    success: function(rampas){
			  ocultarLoading();
		      mostraMarcadoresDelBarrio(barriosDelSelect[barrioElegido].limites,rampas);
		    },
			complete:function (){
				ocultarLoading();
			},
		    statusCode: {
		      404: function () { 
		        alerta("No se ha podido buscar las rampas de ese barrio");
		      }
		    }
		});		
	}else{	
		mostraMarcadoresDelBarrio(barrios[barrioElegido].poligono.coordinates, barrios[barrioElegido].calles);		
	}
}

function mostraMarcadoresDelBarrio(stringCoordenadas, rampasDelBarrio){
	var coordenadasBarrioElegido = coordenadasDesdeStringDeBarrio(stringCoordenadas);

	var poligonoBarrioElegido= new google.maps.Polygon({
		paths: coordenadasBarrioElegido
	});
	poligonoBarrioElegido.setMap(map);

	var  polilinea =
	new google.maps.Polyline({
		path:coordenadasBarrioElegido
	});
	borrarInputDesdeHasta();
	borrarRutasPrevias();
	ocultarRampasCercanas();
	borrarBarriosPrevios();
	polilinea.setMap(map);
	polilineaAnterior = polilinea;
	
	var latlngbounds = new google.maps.LatLngBounds();//Para centrar (1)
	
	$.each(rampasDelBarrio, function(indice, punto){
		if(typeof (punto.coordenadas) === 'undefined')
			latlng = new google.maps.LatLng(punto.latitud,punto.longitud);
		else
			latlng = new google.maps.LatLng(punto.coordenadas[0],punto.coordenadas[1]);

		unMarcador = crearMarcadorConColor(latlng, calcularColorSegunRampa(punto).icono, listenerClickEnMarcador);
		unMarcador.tieneInformacion = punto.tieneInformacion;
		unMarcador.tieneRampas = punto.tieneRampas; 
		unMarcador.buenEstado = punto.buenEstado;
		unMarcador.crucesAccesibles = punto.crucesAccesibles;
		unMarcador.reportada = punto.reportada;
		unMarcador.setMap(map);
		crucesBarrioElegido.push(unMarcador);
		latlngbounds.extend(latlng);//Para centrar (2)
	});			
	poligonoBarrioElegido.setMap(null);
	map.setCenter(latlngbounds.getCenter());//Zoom para centrar (3)
	map.setZoom(13);//Zoom

}

function coordenadasDesdeStringDeBarrio(stringBarrio){
	var coordenadas = [];
	//[[[[-58.47242,-34.5661],[-58.47296,-34.56642],[-58.47299,-34.56644],[-58.47353,-34.56655]]]]
	var punto = {lat:"", lng:""};
	var auxLatLng;
	
	/* Faltar hacer el parseo.*/
	var substring = stringBarrio.slice(stringBarrio.indexOf("[[[[")+4,stringBarrio.indexOf("]]]]")) ;
	var semipuntos =substring.split("],[");
	
	for (var i = 0; i < semipuntos.length; i++){
		auxLatLng = semipuntos[i].split(",");
		punto.lng = auxLatLng[0];
		punto.lat = auxLatLng[1];
		coordenadas.push(new google.maps.LatLng( parseFloat(punto.lat), parseFloat(punto.lng)));
	}
	
	return coordenadas;
}


function crearContextMenu(){
	var contextMenuOptions = {}
	contextMenuOptions.classNames={menu:'context_menu', menuSeparator:'context_menu_separator'};
	//	create an array of ContextMenuItem objects
	//	an 'id' is defined for each of the four directions related items
	var menuItems=[];
	menuItems.push({className:'context_menu_item', eventName:'desde_aqui_click', id:'desde_aqui_item', label:'Desde aqui'});
	menuItems.push({className:'context_menu_item', eventName:'hasta_aqui_click', id:'hasta_aqui_item', label:'Hasta aqui'});
	menuItems.push({className:'context_menu_item', eventName:'descartar_ruta_click', id:'descartar_ruta_item', label:'Descartar Ruta'});
	menuItems.push({className:'context_menu_item', eventName:'calcular_ruta_click', id:'calcular_ruta_item', label:'Calcular Ruta'});
	menuItems.push({});//	a menuItem with no properties will be rendered as a separator
	menuItems.push({className:'context_menu_item', eventName:'rampas_cercanas_click', id:'rampas_cercanas_item', label:'Esquinas Cercanas'});
	menuItems.push({className:'context_menu_item', eventName:'ocultar_rampas_cercanas_click', id: 'ocultar_rampas_cercanas_item', label:'Ocultar Esquinas Cercanas'});
	menuItems.push({className:'context_menu_item', eventName:'nueva_rampa_click', id: 'nueva_rampa_item', label:'Nueva Rampa'});
	
	contextMenuOptions.menuItems=menuItems;
	
	contextMenu=new ContextMenu(map, contextMenuOptions);
	google.maps.event.addListener(map, 'rightclick', function(mouseEvent){
		contextMenu.show(mouseEvent.latLng);
		
		if(originMarker.getMap() == null || destinationMarker.getMap() == null)
			$('#calcular_ruta_item').hide();
		else
			$('#calcular_ruta_item').show();
			
		if(originMarker.getMap() == null || destinationMarker.getMap()  == null || polilineas.length == 0) //Si no hay ninguna ruta habilitada
			$('#descartar_ruta_item').hide();
		else
			$('#descartar_ruta_item').show();
			
		if(arrayRampasCercanas.length == 0){
			$('#ocultar_rampas_cercanas_item').hide();
			$('#nueva_rampa_item').hide();
		}
		else{
			$('#ocultar_rampas_cercanas_item').show();
			if(unUsuario.id){//Si esta logueado
				$('#nueva_rampa_item').show();
			}else{
				$('#nueva_rampa_item').hide();
			}
			
		}
	});
	return contextMenu;
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


/* MARTINCITO --> Una vez que se encuentran las 3 Rutas, con esta funcion se habilitan los 3 botones para mostrarlas en el Mapa.*/
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
	if(idRuta == 0){
		checkbox.prop('checked', true);
		polilineas[idRuta].poly.setMap(map);
		for(var i = 0; i < polilineas[idRuta].marcadores.length; i++){
			polilineas[idRuta].marcadores[i].setMap(map);
		}		
	}
}


function marcadoresIncluidos(poligonos,subconjuntoDeMarcadores){
	var latlng;//Es la Rampa que trae la base de datos
	var tempLatLng;//Es un LatLng
	var marcador;
	var color;
	var incluidos = [];
	$.each(subconjuntoDeMarcadores, function(index,latlng){

		function poligonoContienePunto(poligono, indice,array){
			return google.maps.geometry.poly.containsLocation(tempLatLng, poligono);
		}
		//Otra negrada porque a esta funcion le llega un subconjuntoDeMarcadores que pueden ser
		//Los que llegan de la BD o de un analisis que no tiene los mismo campos.
		if(latlng.latitud === undefined)
			tempLatLng =latlng;
		else
			tempLatLng = new google.maps.LatLng(latlng.latitud, latlng.longitud);	

		if(poligonos.some(poligonoContienePunto)){
			marcador = crearMarcadorConColor(tempLatLng, calcularColorSegunRampa(latlng).icono, listenerClickEnMarcador);
			marcador.tieneInformacion = latlng.tieneInformacion;
			marcador.tieneRampas = latlng.tieneRampas; 
			marcador.buenEstado = latlng.buenEstado;
			marcador.crucesAccesibles =latlng.crucesAccesibles;
			marcador.reportada = latlng.reportada;
			incluidos.push(marcador);
		}
	});
	return incluidos;
}

/*En realidad aca no se dibujan, sino que se preparan, se crean los objetos, todo seteado el map a null*/
function dibujarRutas(respuesta){
	var color = {};
	var minimo = {lat:500.0, lng:500.0}, maximo = {lat:-500.0, lng:-500.0};
	$.each(respuesta.routes, function(index, ruta){
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
	});
	//Esto lo hago porque sino, tengo problemas en la funcion reducirCantidadDeMarcadoresARectangulo
	//Ya que minimo y maximo no tienen las funciones lat() y lng()
	minimo = new google.maps.LatLng(minimo.lat - 0.00015, minimo.lng - 0.00015);
	maximo = new google.maps.LatLng(maximo.lat + 0.00015, maximo.lng + 0.00015);

/*Inicio - Para saber cual es el rectangulo en el que buscar las rampas

	new google.maps.Polygon({
		paths: [minimo,
						new google.maps.LatLng(minimo.lat(), maximo.lng()),
						maximo,
						new google.maps.LatLng(maximo.lat(),minimo.lng())],
		map:map
	});
	
	Fin - Para saber cual es el rectangulo en el que buscar las rampas*/

	if(servidorActivado === true){
		armarRutaConDatosDelServidor(respuesta, minimo,maximo);
	}else{//Sino armo la ruta con la informacion que tengo en los array de barrios.
		var subconjuntoDeMarcadores = reducirCantidadDeMarcadoresARectangulo(minimo,maximo);
		for(var i = 0; i < respuesta.routes.length; i++){	
			checkpointsRuta = agruparCheckpoints(respuesta.routes[i]);
			polilineas[i] = crearPolilinea(checkpointsRuta);
			polilineas[i].marcadores = marcadoresIncluidos(polilineas[i].figura, subconjuntoDeMarcadores);
			//color = colorDePolilinea(polilineas[i].marcadores);
			color = colorDePolilinea(polilineas[i]);
			polilineas[i].poly.setOptions({strokeColor: color})
			habilitarBotonDeRuta(i);
		}
	}
}

/*Esta funcion solo es para cuando no se esta conectado al servidor.*/
function reducirCantidadDeMarcadoresARectangulo(minimo,maximo){
	var marcadoresEnElRectangulo = [];
	$.each(barrios, function(index,barrio){
		$.each(barrio.calles, function(indice,punto){
			latlng = new google.maps.LatLng(punto.coordenadas[0],punto.coordenadas[1]);
			if(latlngEstaDentroDeMiRectangulo(latlng,minimo,maximo)){
				latlng.tieneInformacion = punto.tieneInformacion;
				latlng.tieneRampas = punto.tieneRampas; 
				latlng.buenEstado = punto.buenEstado;
				latlng.crucesAccesibles = punto.crucesAccesibles;
				latlng.reportada = punto.reportada;
				marcadoresEnElRectangulo.push(latlng);
			}
		});
	});
	return marcadoresEnElRectangulo;
}

function latlngEstaDentroDeMiRectangulo(latlng,minimo,maximo){
	return (latlng.lat() > minimo.lat() && latlng.lng() > minimo.lng() && latlng.lat() < maximo.lat() && latlng.lng() < maximo.lat())
}


function armarRutaConDatosDelServidor(respuesta, minimo,maximo){
//	mostrarLoading();
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "/rampas/Rampas/ruta/" + minimo.lat() + "/" + minimo.lng() + "/" + maximo.lat() + "/" + maximo.lng() ,
		statusCode: {
			200: function (listaRampas){
				console.log("Se encontraron las rampas que estaban dentro de ese rectangulo");
				for(var i = 0; i < respuesta.routes.length; i++){
					checkpointsRuta = agruparCheckpoints(respuesta.routes[i]);
					polilineas[i] = crearPolilinea(checkpointsRuta);
					polilineas[i].marcadores = marcadoresIncluidos(polilineas[i].figura, listaRampas);
					//color = colorDePolilinea(polilineas[i].marcadores);
					color = colorDePolilinea(polilineas[i]);
					polilineas[i].poly.setOptions({strokeColor: color})
				}
				/*Ordeno las rutas por mejor estado.*/
				polilineas.sort(function(poly1, poly2){
					return poly2.puntaje - poly1.puntaje; //Descendiente
				});

				$.each(polilineas,function(index, unaPoly){
					habilitarBotonDeRuta(index);	
				});
				ocultarLoading();
			},
			complete:function (){
				ocultarLoading();
			},
			404: function () { 
				ocultarLoading();
				limpiarHTML();
				$('#resultadoBuscarRampaPorUbicacion').html("No se ha encontrado ninguna rampa en esa ubicacion.");
			}
		}
	});
}

function borrarInputDesdeHasta(){
	$("#inputHasta").val("");
	$("#inputDesde").val("");
}
/*Antes de ver las rampas cercanas o crar una nueva ruta, se ejecuta esto para que no se superponga nada*/
function borrarRutasPrevias(){
//	$("#inputHasta").val("");
//	$("#inputDesde").val("");
	destinationMarker.setMap(null);
	originMarker.setMap(null);
	
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

function borrarBarriosPrevios(){
	if (crucesBarrioElegido.length)
		polilineaAnterior.setMap(null);
	$.each(crucesBarrioElegido,function(indice, marcador){
		marcador.setMap(null);
	});
}

/* MARTINCITO --> Esta es la funcion que inicia todo el proceso de calculo de Ruta*/
function calcularRutas() {
	mostrarLoading();
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
							borrarBarriosPrevios();
							dibujarRutas(response);
							
							destinationMarker.setPosition(resultsHasta[0].geometry.location);
							if(!destinationMarker.getMap()){
								destinationMarker.setMap(map);
							}
							originMarker.setPosition(resultsDesde[0].geometry.location);
							if(!originMarker.getMap()){
								originMarker.setMap(map);
							}
							//Hacer Zoom sobre esa ruta
							var latlngbounds = new google.maps.LatLngBounds();
							latlngbounds.extend(resultsDesde[0].geometry.location);
							latlngbounds.extend(resultsHasta[0].geometry.location);
							map.setCenter(latlngbounds.getCenter());
							map.fitBounds(latlngbounds); 
							map.setZoom(map.getZoom()-1); 
						}
						else{
							alerta('Error al dibujar las rutas.');// + status);
							ocultarLoading();
						}
					});
				} else {
				  alerta('La direccion no se pudo encontrar.');// + status);
				  ocultarLoading();
				}
			});
		} else {
		  alerta('La direccion no se pudo encontrar.');// + status);
		  ocultarLoading();
		}
	});
}


google.maps.event.addDomListener(window, 'load', initialize);

function limpiarMapa(){
	borrarInputDesdeHasta();
	borrarRutasPrevias();
	ocultarRampasCercanas();
	borrarBarriosPrevios();
//Centrar Mapa	
		var latlngbounds = new google.maps.LatLngBounds();//Para centrar (1)
		latlngbounds.extend(new google.maps.LatLng(-34.549427, -58.363947));//Para centrar (2)
		latlngbounds.extend(  new google.maps.LatLng(-34.650316, -58.533205));//Para centrar (2)
		map.setCenter(latlngbounds.getCenter());//Zoom para centrar (3)
		map.setZoom(12);//Zoom
}
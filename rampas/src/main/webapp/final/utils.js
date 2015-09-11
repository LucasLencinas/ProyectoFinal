/**
@author 	Lucas Lencinas.
@constructor 	Marks a function as a constructor
@deprecated 	Marks a method as deprecated
@exception 	Synonym for @throws
@exports 	Identifies a member that is exported by the module
@param 	Documents a method parameter; a datatype indicator can be added between curly braces
@private 	Signifies that a member is private
@return 	Documents a return value
@returns 	Synonym for @return
@see 	Documents an association to another object
@this 	Specifies the type of the object to which the keyword "this" refers within a function.
@throws 	Documents an exception thrown by a method
@version 	Provides the version number of a library

**/
/************************************
Primero hay que cargar:
-el index.js
-el jquery.sprintf.js
-
-
**/

/*Esta funcion ya no se llama, pero la dejo para hacer pruebas*/
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

/*Se crea el marcador junto con el Evento a ejecutarse cuando lo clickean*/
function crearMarcadorConColor(posicion,icono, listenerClick){
	var marcador = new google.maps.Marker ({
		position:posicion,
		cursor: 'pointer',
		icon: icono,
		shape: iconShape
		/*zIndex: Math.round(latlng.lat()*-100000)<<5*/
	});
	/*Ese addListener, en este momento le adjudica esa funcion que recibe por parametro, 
		en este caso, es la funcion listenerClickEnMarcador definida abajo*/
	if(listenerClick != undefined)
		google.maps.event.addListener(marcador, 'click', listenerClick);
	return marcador
	
}

/* MARTINCITO --> Cuando se hace click en un Marcador, se ejecuta esta funcion*/
function listenerClickEnMarcador() {
		   rellenarInfoWindow(infowindow,this);
		   infowindow.open(map,this);
		}

/**Funciona de algebra para el dibujo de Poligonos que encierran a la ruta**/

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


/** MARTINCITO --> Funcionalidades del Context Menu: Cuando se ejecuta cualquier boton del context menu, se hace lo que dice en esta funcion**/

function setearListenerParaContextMenu(latLng, eventName){

	switch(eventName){
		case 'desde_aqui_click':
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
		case 'hasta_aqui_click':
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
		case 'descartar_ruta_click':
			destinationMarker.setMap(null);
			originMarker.setMap(null);
			borrarRutasPrevias();
			$("#inputHasta").val("");
			$("#inputDesde").val("");
			break;
		case 'calcular_ruta_click':
			calcularRutas();
			break;
		case 'rampas_cercanas_click':
			map.setZoom(16);
			rampasCercanas(latLng);
			break;
		case 'ocultar_rampas_cercanas_click':
			map.setZoom(15);
			ocultarRampasCercanas();
			break;
		case 'nueva_rampa_click':
			/*MARTINCITO --> Aca tendrias que poner la ventana para dar de alta una nueva Rampa, para saber la ubicacion del click
			esta la variable latLng que viene como parametro.*/
			showdlgboxNuevaRampa(latLng);
			break;
	}

}



function rampasCercanas(latlng){	
	
	$.each(arrayRampasCercanas, function(indice,marcador){
		marcador.setMap(null);
	});
	var perimetro = [];
	perimetro.push(new google.maps.LatLng(latlng.lat() - 0.003,latlng.lng() - 0.004));
	perimetro.push(new google.maps.LatLng(latlng.lat() - 0.003,latlng.lng() + 0.004));
    perimetro.push(new google.maps.LatLng(latlng.lat() + 0.003,latlng.lng() + 0.004));
	perimetro.push(new google.maps.LatLng(latlng.lat() + 0.003,latlng.lng() - 0.004));
	
	var latlngbounds = new google.maps.LatLngBounds();
	latlngbounds.extend(perimetro[0]);
	latlngbounds.extend(perimetro[2]);
	map.setCenter(latlngbounds.getCenter());

	
	var poligonos = [];
	poligonos.push(new google.maps.Polygon({
		paths: perimetro,
		map:null
	}));
	
	arrayRampasCercanas = marcadoresIncluidos(poligonos,reducirCantidadDeMarcadoresARectangulo(perimetro[0],perimetro[2]));
	$.each(arrayRampasCercanas, function(indice,marcador){
		marcador.setMap(map);
	});
}

function ocultarRampasCercanas(){
	$.each(arrayRampasCercanas, function(indice,marcador){
		marcador.setMap(null);
	});
	arrayRampasCercanas = [];
}

/**Funcionalidades para el InfoWindows y StreetView**/
/* MARTINCITO --> Esta funcion se ejecuta cuando se hace click en el boton StreetView que esta en el InfoWindows de cada marcador.*/
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

/*MARTINCITO --> esta funcion traduce la latitud y longitud para mostrar la direccion completa y 
	despues llama a una funcion que rellena posta el contenido del Infowindow.*/
function rellenarInfoWindow(unInfoWindow, marcador){

	geocoder.geocode({'latLng': marcador.getPosition()}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        marcador.stringDireccion = results[0].formatted_address;
		unInfoWindow.setContent(armarContenidoDelInfoWindows(marcador));
      } else {
        alert('No results found');
      }
    } else {
      alert('Geocoder failed due to: ' + status);
    }
  });
}

/* MARTINCITO --> Esta funcion rellena el infoWindow con toda la informacion de la rampa  y ademas agrega los botones.*/

function armarContenidoDelInfoWindows(marcador){
	
	var contenido, estado = "Rampas en buen Estado: ", accesibilidad = "Rampas en todas las esquinas: ", 
	tieneInformacion = "Tiene Informacion: ", tieneRampa = "Tiene Rampa: ",botonStreetView= "",botonModificar = "",botonReportar = "";
	
	tieneInformacion += marcador.tieneInformacion? "Si" : "No";
	tieneRampa += marcador.tieneRampa? "Si" : "No";
	estado += marcador.buenEstado? "Si" : "No" ;	//Se podria cambiar por un tilde y una cruz mas adelante
	accesibilidad += marcador.crucesAccesibles? "Si" : "No";
	
	botonStreetView = "<input type='button' id='streetview' value='StreetView' "+
		"onclick='mostrarStreetView" +marcador.getPosition() + "'>";
	
	/*Esta asignacion es media forzosa porque a las funciones onclick si osi se le tiene que pasar una variable global*/
	marcadorActual = marcador;
/*	botonModificar = "<input type='button' id='botonModificarRampa' value='Modificar' "+
		"onclick='modificarRampa(marcadorActual);'>";
*/		
	botonReportar = "<input type='button' id='botonReportarRampa' value='Reportar' "+
		"onclick='reportarRampa(marcadorActual)'>";
	
	return $.sprintf( "<div>Direccion: %s </br>%s </br>%s</br> %s</br> %s</br> %s %s %s </div>", marcador.stringDireccion, 
		tieneInformacion, tieneRampa, estado ,accesibilidad,botonStreetView,botonModificar,botonReportar);
}


/**Operaciones dummy con rampas**/
/* MARTINCITO --> Esta funcion se llama cuando se hace click en Reportar en el InfoWindow de cada marcador*/
function reportarRampa(marcador){
	showdlgboxReportarRampa(marcador);
}

/* MARTINCITO --> Esta funcion se llama cuando se hace click en Modificar en el InfoWindow de cada marcador*/
function modificarRampa(marcador){
	showdlgboxModificarRampa(marcador);
}

/**Funciones para saber colores de rampas y rutas**/

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

function calcularColorSegunRampa(punto){

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


/**Funcion para saber el grupo de poligonos que encierran una ruta**/

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

/****/








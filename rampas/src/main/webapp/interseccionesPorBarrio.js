

/*Se necesita haber cargado previamente la biblioteca de jQuery*/
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;
var checkpointsRuta;
var polilineas= [];
var intersecciones;
var cordobaAl3950 = new google.maps.LatLng(-34.609226, -58.374925); 
var crucesTotales;	//[({punto: LatLng, barrio: ""})]
var crucesBarrioElegido = [];
var ultimoMarcador;
var barrioElegido;
function initialize() {
	
	
	geocoder = new google.maps.Geocoder();
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
  
  
  
	llenarSelectOptions();
	barrioElegido = $("#selectBarrios").prop("selectedIndex");
	mostrarCrucesDeBarrioElegido();
  
}//Fin initialize

function llenarSelectOptions(){

	$.each(barrios, function (index, value) {
		$("#selectBarrios").append($('<option/>', { 
			value: value.nombre,
			text : value.nombre 
		}));
	});
}


function mostrarCrucesDeBarrioElegido(){
	var unCruce;
	var unMarcador;
	crucesTotales = crucesBA(); 
	
	var coordenadasBarrioElegido = coordenadasDesdeStringDeBarrio(barrios[barrioElegido].poligono.coordinates);

	var poligonoBarrioElegido= new google.maps.Polygon({
		paths: coordenadasBarrioElegido
	});
	poligonoBarrioElegido.setMap(map);

	for(var i =0; i < crucesTotales.length ; i++){
		unCruce = crucesTotales[i];
		
		if (google.maps.geometry.poly.containsLocation(unCruce.punto, poligonoBarrioElegido)) {
			var unMarcador = crearMarcador(unCruce.punto);
			unMarcador.setMap(map);
			crucesBarrioElegido.push(unMarcador);
		    google.maps.event.addListener(unMarcador, 'rightclick', function(event) {
				this.setMap(null);
				sacarDeCruceDeBarrio(this);
				ultimoMarcador = this;
				console.log(this.getPosition().toString());
			});
		}
	}
	crucesBarrioElegido = sacarRepetidosBarrio(crucesBarrioElegido);
	poligonoBarrioElegido.setMap(null);
}

function sacarRepetidosBarrio(marcadoresBarrio){
	for (var i = 0; i < marcadoresBarrio.length; i++){
		for (var j = i; j < marcadoresBarrio.length; j++){
			if(marcadoresBarrio[i].getPosition().equals(marcadoresBarrio[j].getPosition())){
				marcadoresBarrio[j].setMap(null);
				marcadoresBarrio.splice(j,1);
			}
		}
	}
	return marcadoresBarrio;

}


function crucesBA(){
	var crucesBA = [];
	for(var i = 0; i < calles.length; i++) {
		coordenadaCalle = coordenadasDesdeStringDeCalles(calles[i].st_astext);
		for(var j = 0; j < coordenadaCalle.length; j++){
			
			crucesBA.push({punto: coordenadaCalle[j], barrio: ""}); 
		}
    }
	return crucesBA;
}

function coordenadasDesdeStringDeCalles(stringCalle){
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

function sacarDeCruceDeBarrio( marcador){
	for( var i = 0; i < crucesBarrioElegido.length; i++){
		if(marcador.getPosition().lat() == crucesBarrioElegido[i].getPosition().lat() && marcador.getPosition().lng() == crucesBarrioElegido[i].getPosition().lng() ){
			crucesBarrioElegido.splice(i, 1);
			break;
		}
	}
}

function deshacerBorrado(){
	ultimoMarcador.setMap(map);
	crucesBarrioElegido.push(ultimoMarcador);
}

function imprimirCruces() {
/*
Imprimir algo como 
cruces = [
    {
      "lat": "(-58.4667598850729,-34.5359273040219)",
	  "lng": "(-58.46680694286,-34.5358444816661)"
    },
*/
	var stringPtos = "";
	for(var i = 0; i < crucesBarrioElegido.length; i++){
		stringPtos += crucesBarrioElegido[i].getPosition().toString();
		if(i+1 < crucesBarrioElegido.length)
			stringPtos += ",";
	}
	
	var stringArray = "[" + stringPtos + "]";
	$("#resultado").html(stringArray);
	console.log(stringArray);
}


function crearMarcador(posicion){
	return new google.maps.Marker ({
		position:posicion,
		icon: {
			path: google.maps.SymbolPath.CIRCLE,
			scale: 3
		}
	});
}

function CambioDeOption() {
	barrioElegido = $("#selectBarrios").selectedIndex;
	/*Borrar marcadores anteriores*/
	for(var i = 0; i < crucesBarrioElegido.length; i++){
		crucesBarrioElegido[i].setMap(null);
	}
	crucesBarrioElegido = [];
	mostrarCrucesDeBarrioElegido();
	
}

google.maps.event.addDomListener(window, 'load', initialize);

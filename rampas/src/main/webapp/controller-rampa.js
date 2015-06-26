
/*COnsultar Interseccion*/

var autocompleteDireccion;
var baseHabilitada = false;
var seEncontro = false;
var posicionActual;
var interseccionesGuardadas = [];

var infowindow = new google.maps.InfoWindow();
var pointsArray =[];
var autocompleteDesde;
var autocompleteHasta;
var checkpointsRuta;
var polilineas= [];

function createControllerMapa(){
	var controller;
	var mapOptions = {
		zoom: 14,
		center: new google.maps.LatLng(-34.609226, -58.374925);
	};
	var defaultBounds = new google.maps.LatLngBounds(
	    new google.maps.LatLng(-34.650316, -58.533205),
		new google.maps.LatLng(-34.549427, -58.363947));
	
	controller[directionsService] = new google.maps.DirectionsService();
	controller[map] = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	controller[map].fitBounds(defaultBounds);
	controller[geocoder] = new google.maps.Geocoder();
	controller[arrayDeColores] = ["#FF0000","#00FF00", "#0000FF"]; /*Cambiar Nombres*/
	controller[directionsService]
}

function initialize() {

	ctrlMapa = createControllerMapa();
	
	geocoder = new google.maps.Geocoder();
	autocompleteDireccion = new google.maps.places.Autocomplete(
	(document.getElementById('direccion')),{ types: ['geocode'] });
	google.maps.event.addListener(autocompleteDireccion, 'place_changed', function() {
	});
	
	var markers = [];
}
/*Consultar Interseccion*/

function initialize() {
	

	autocompleteDesde = new google.maps.places.Autocomplete(
	(document.getElementById('inputDesde')),{ types: ['geocode'] });
	google.maps.event.addListener(autocompleteDesde, 'place_changed', function() {
	});
    
	autocompleteHasta = new google.maps.places.Autocomplete(
	(document.getElementById('inputHasta')),{ types: ['geocode'] });
	google.maps.event.addListener(autocompleteHasta, 'place_changed', function() {
	});
	
	var markers = [];

//cargarMarcadoresDeEjemplos(calles);  
probarDistancia();
  
  
}//Fin initialize



/**/
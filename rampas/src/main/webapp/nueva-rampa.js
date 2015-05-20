
var directionsService = new google.maps.DirectionsService();
var map;
var cordobaAl3950 = new google.maps.LatLng(-34.609226, -58.374925); 
var cordobaAl3450 = new google.maps.LatLng(-34.598205, -58.420201);
var pointsArray =[];
var arrayDeColores= ["#FF0000","#00FF00", "#0000FF"];
var geocoder;
var autocompleteDireccion;
function initialize() {
	
	
	geocoder = new google.maps.Geocoder();
	autocompleteDireccion = new google.maps.places.Autocomplete(
	(document.getElementById('direccion')),{ types: ['geocode'] });
	google.maps.event.addListener(autocompleteDireccion, 'place_changed', function() {
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

function dibujarMarcador(posicion, mapa){
	return new google.maps.Marker ({
		position:posicion,
		map:mapa
	});
}

function ubicarInterseccion() {
	var direccionString = document.getElementById('direccion').value;

	geocoder.geocode( { 'address': direccionString}, function(resultsDireccion, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			dibujarMarcador(resultsDireccion[0].geometry.location, map);
			map.setZoom(17);
			map.panTo(resultsDireccion[0].geometry.location);
			} else {
			  alert('La direccion no se pudo encontrar: ' + status);
			}
	});
} //Fin ubicarInterseccion()

google.maps.event.addDomListener(window, 'load', initialize);


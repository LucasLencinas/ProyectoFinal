/**Antes de este js hay que cargar jQuery**/



/** Campos que tiene una rampa

  @Expose @Id private long id;
  @Expose @Index private double latitud; 
  @Expose @Index private double longitud;
  @Expose @Index private String barrio;
  @Expose private boolean tieneInformacion;
  @Expose private boolean tieneRampas;
  @Expose private boolean buenEstado;
  @Expose private boolean todosCrucesAccesibles;
  @Expose private boolean reportada;


**/


function buscarRampaPorUbicacion(latitud, longitud){
/*----- Ids que se usan en este query al servidor --------
id="PorUbicacionLat"
id="buscarPorUbicacionLng"
id="resultadoBuscarRampaPorUbicacion"
*/

  console.log("A punto de buscar rampas por ubicacion...");
  $.ajax({
        type: "GET",
        dataType: "json",
        url: "/rampas/Rampas/latlng/"+ latitud + "/" + longitud,
        success: function (data) {
          var rampa = ""
          rampa += data.id + "<br/>";
          rampa += data.latitud + "<br/>";
          rampa += data.longitud + "<br/>";
          rampa += data.barrio + "<br/>";
          rampa += data.tieneInformacion + "<br/>";
          rampa += data.tieneRampas + "<br/>";
          $('#resultadoBuscarRampaPorUbicacion').html(rampa);
        }
    });

}

function cargarDatos(){
  console.log("A punto de cargar los datos en la base de datos...");
  $.ajax({
        type: "GET",
        dataType: "json",
        url: "/rampas/Usuarios/admin/carga",
        success: function (data) {
          alert("Success - Carga inicial OK");
          console.log("Success - Carga inicial OK");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          var resultado = "Error - Carga inicial. ";
          resultado += "Contenido jqHR:" + jqXHR + ". ";
          resultado += "Contenido textStatus:" + textStatus + ". ";
          resultado += "Contenido errorThrown:" + errorThrown + ". ";
          alert(resultado);
        },
        complete: function (jqXHR, textStatus) {
          var resultado = "Complete - Carga inicial. ";
          resultado += "Contenido jqHR:" + jqXHR + ". ";
          resultado += "Contenido textStatus:" + textStatus + ". ";
          alert(resultado);
        }
    });
}


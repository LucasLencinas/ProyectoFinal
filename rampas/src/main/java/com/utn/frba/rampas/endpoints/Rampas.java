package com.utn.frba.rampas.endpoints;

import java.util.ArrayList;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Consumes;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.utn.frba.rampas.domain.Rampa;
import com.utn.frba.rampas.utils.HandlerDS;
import com.utn.frba.rampas.utils.Setup;

@Path("/Rampas")
public class Rampas {
	
	@GET 
	@Produces("application/json")
	public Response index() {
		Setup.setup();
		System.out.println("Obtener Rampas");
		ArrayList<Rampa> rampas = HandlerDS.getRampas();
		if (rampas == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(rampas),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@GET 
	@Path("/latlng/{lat}/{lng}")
	@Produces("application/json")
	public Response loadRampaByLatLng(@PathParam("lat") String lat, @PathParam("lng") String lng) {
		System.out.println("Dentro de get rampas by latlng");
		System.out.println("Me llegan, lat: "+ lat +", lng: " + lng );
		Rampa unaRampa = HandlerDS.getRampaByLatitudLongitud(Double.parseDouble(lat),Double.parseDouble(lng));
		if (unaRampa == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(unaRampa),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@GET 
	@Path("/barrios/{barrio}")
	@Produces("application/json")
	public Response loadRampaByBarrio(@PathParam("barrio") String barrio) {
		System.out.println("Dentro de get rampas by Barrio");
		System.out.println("Me llegan, barrio: "+ barrio);
		ArrayList<Rampa> rampas = HandlerDS.getRampasByBarrio(barrio);
		if (rampas == null || rampas.size() == 0) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(rampas),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@POST
  @Produces("application/json")
  @Consumes("application/json")
	public Response saveRampa(String rampa_json) {
		Gson parser = new Gson();
		Rampa unaRampa = parser.fromJson(rampa_json,Rampa.class);
		boolean agregoRampaBien = HandlerDS.saveRampa(unaRampa);
		if (agregoRampaBien) {
			System.out.println("La rampa se agrego bien");
			return Response.status(Response.Status.OK).build();
		} 
		else {
			System.out.println("Hubo con conflicto al guardar la rampa");
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
	
	/**Este endpoint se va a llamar solo para un update general, no para el update de reportada**/
	@PUT
  @Produces("application/json")
  @Consumes("application/json")
	public Response updateRampa(String rampa_json) {
	//Va a venir una rampa con todos los datos actualizados, menos el de reportada, que va a seguir siendo el mismo valor.
		Gson parser = new Gson();
		Rampa unaRampa = parser.fromJson(rampa_json,Rampa.class);
		boolean updateoRampaBien = HandlerDS.saveRampa(unaRampa);//No se si es un save solamente. FIXME (Preguntar a Mati)
		if (updateoRampaBien) {
			System.out.println("La rampa se agrego bien");
			return Response.status(Response.Status.OK).build();
		} 
		else {
			System.out.println("Hubo con conflicto al guardar la rampa");
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
	
	/**Este endpoint se va a llamar solo para el uptdate de reportada.**/
	@PUT
	@Path("/reportadas")
  @Produces("application/json")
  @Consumes("application/json")
	public Response reportarRampa(String rampa_json) {
		//Va a venir una rampa solo con latitud, longitud, y el booleano de reportada como parametro.
		Gson parser = new Gson();
		Rampa unaRampa = parser.fromJson(rampa_json,Rampa.class);
		boolean updateoRampaBien = HandlerDS.saveRampa(unaRampa);//No se si es un save solamente. FIXME (Preguntar a Mati)
		if (updateoRampaBien) {
			System.out.println("La rampa se agrego bien");
			return Response.status(Response.Status.OK).build();
		} 
		else {
			System.out.println("Hubo con conflicto al guardar la rampa");
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
	/**Lo de abajo todavia no esta testeado mediante la pagina web usando AJAX**/

	@GET
	@Path("/Rampa")
	@Consumes("application/json")
	@Produces("application/json")
	public Response loadRampa(String rampa_json) {
		Gson parser = new Gson();
		Rampa unaRampa = parser.fromJson(rampa_json,Rampa.class);
		unaRampa = HandlerDS.getRampaByLatitudLongitud(unaRampa.getLatitud(),unaRampa.getLongitud());
		if (unaRampa == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(unaRampa),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@DELETE
	@Path("/Rampa")
	@Consumes("application/json")
	public Response deleteRampa(String rampa_json) {
		Gson parser = new Gson();
		Rampa unaRampa = parser.fromJson(rampa_json,Rampa.class);
		boolean borroRampaBien = HandlerDS.deleteRampa(unaRampa);
		if (borroRampaBien) {
			return Response.status(Response.Status.OK).build();
		} 
		else {
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
}

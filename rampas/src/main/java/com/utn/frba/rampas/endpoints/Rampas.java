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
	
//	Sirve para agregar una Rampa	
	
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	public Response saveRampa(String rampa_json) {
		Gson parser = new Gson();
		Rampa unaRampa = parser.fromJson(rampa_json,Rampa.class);
		String estado = HandlerDS.saveRampa(unaRampa);
		if (estado == "OK") {
			System.out.println("La rampa se agrego bien");
			return Response.status(Response.Status.OK).build();
		} 
		else {
			System.out.println("Hubo con conflicto al guardar la rampa");
			return Response.ok(estado,MediaType.APPLICATION_JSON).build();		
//			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
//	Sirve para modificar una Rampa
	
	@PUT
	@Produces("application/json")
	@Consumes("application/json")
	public Response updateRampa(String rampa_json) {
		Gson parser = new Gson();
		Rampa unaRampa = parser.fromJson(rampa_json,Rampa.class);
		String estado = HandlerDS.saveRampa(unaRampa);
		if (estado == "OK") {
			System.out.println("La rampa se modifico bien");
			return Response.status(Response.Status.OK).build();
		} 
		else {
			System.out.println("Hubo con conflicto al guardar la rampa");
			return Response.ok(estado,MediaType.APPLICATION_JSON).build();		
//			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
	/**Lo de abajo todavia no esta testeado mediante la pagina web usando AJAX**/

	@DELETE
	@Path("/Rampa")
	@Consumes("application/json")
	public Response deleteRampa(String rampa_json) {
		Gson parser = new Gson();
		Rampa unaRampa = parser.fromJson(rampa_json,Rampa.class);
		String estado = HandlerDS.deleteRampa(unaRampa);
		if (estado == "OK") {
			System.out.println("La rampa se elimino bien");
			return Response.status(Response.Status.OK).build();
		} 
		else {
			System.out.println("Hubo con conflicto al borrar la rampa");
			return Response.ok(estado,MediaType.APPLICATION_JSON).build();		
//			return Response.status(Response.Status.CONFLICT).build();
		}		
	}
	
}

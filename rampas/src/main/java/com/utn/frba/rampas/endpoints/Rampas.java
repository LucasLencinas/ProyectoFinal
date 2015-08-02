package com.utn.frba.rampas.endpoints;

import java.util.ArrayList;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Consumes;
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
		System.out.println("Me piden las rampas");
		ArrayList<Rampa> rampas = HandlerDS.getRampas();
		if (rampas == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(rampas),MediaType.APPLICATION_JSON).build();		
		}
/*		
		String intersecciones_json = new Gson().toJson(HandlerDS.getIntersecciones());
		return Response.ok(intersecciones_json,MediaType.APPLICATION_JSON).build();
*/	
	}

	@GET
	@Path("/Rampa")
	@Consumes("application/json")
	@Produces("application/json")
	public Response loadRampa(String ubicacion_json) {
		Rampa unaInterseccion;
		Gson parser = new Gson();
		Rampa unaUbicacion = parser.fromJson(ubicacion_json,Rampa.class);
		unaInterseccion = HandlerDS.loadRampa(unaUbicacion);
		if (unaInterseccion == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(unaInterseccion),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@POST
	@Path("/Rampa")
	@Consumes("application/json")
	public Response saveRampa(String interseccion_json) {
		Gson parser = new Gson();
		Rampa unaRampa = parser.fromJson(interseccion_json,Rampa.class);
		boolean agregoRampaBien = HandlerDS.saveRampa(unaRampa);
		if (agregoRampaBien) {
			return Response.status(Response.Status.OK).build();
		} 
		else {
			return Response.status(Response.Status.CONFLICT).build();
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

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
	@Path("/admin/carga")
	@Produces("application/json")
	public Response cargaInicial() {
		Setup.setup();
		return Response.ok("",MediaType.APPLICATION_JSON).build();		
	}

	@POST
	@Consumes("application/json")
	public Response saveRampa(String rampa_json) {
		Gson parser = new Gson();
		Rampa unaRampa = parser.fromJson(rampa_json,Rampa.class);
		String estado = HandlerDS.saveRampa(unaRampa);
		if (estado == "OK") {
			return Response.status(Response.Status.OK).build();
		} 
		else {
			return Response.serverError().entity("Agregar Rampa: Error - " + estado).build();
		}
	}
	
	@PUT
	@Consumes("application/json")
	public Response updateRampa(String rampa_json) {
		Gson parser = new Gson();
		Rampa unaRampa = parser.fromJson(rampa_json,Rampa.class);
		String estado = HandlerDS.saveRampa(unaRampa);
		if (estado == "OK") {
			return Response.status(Response.Status.OK).build();
		} 
		else {
			return Response.serverError().entity("Modificar Rampa: Error - " + estado).build();
		}
	}
	
	@DELETE
	@Consumes("application/json")
	public Response deleteRampa(String rampa_json) {
		Gson parser = new Gson();
		Rampa unaRampa = parser.fromJson(rampa_json,Rampa.class);
		String estado = HandlerDS.deleteRampa(unaRampa);
		if (estado == "OK") {
			return Response.status(Response.Status.OK).build();
		} 
		else {
			return Response.serverError().entity("Eliminar Rampa: Error - " + estado).build();
		}		
	}

	
	@GET 
	@Path("/rampas")
	@Produces("application/json")
	public Response loadRampas() {
		ArrayList<Rampa> rampas = HandlerDS.getRampas();
		if (rampas == null || rampas.size() == 0) {
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
	public Response loadRampasByBarrio(@PathParam("barrio") String barrio) {
		ArrayList<Rampa> rampas = HandlerDS.getRampasByBarrio(barrio);
		if (rampas == null || rampas.size() == 0) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(rampas),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@GET 
	@Path("/ruta/{latmin}/{lngmin}/{latmax}/{lngmax}")
	@Produces("application/json")
	public Response loadRampaByRuta(@PathParam("latmin") String latmin, @PathParam("lngmin") String lngmin, @PathParam("latmax") String latmax, @PathParam("lngmax") String lngmax) {
		ArrayList<Rampa> rampasRuta = HandlerDS.getRampasByRuta(Double.parseDouble(latmin),Double.parseDouble(lngmin),Double.parseDouble(latmax),Double.parseDouble(lngmax));
		if (rampasRuta == null || rampasRuta.size() == 0) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(rampasRuta),MediaType.APPLICATION_JSON).build();		
		}
	}

}

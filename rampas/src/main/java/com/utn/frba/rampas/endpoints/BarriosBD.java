package com.utn.frba.rampas.endpoints;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import com.utn.frba.rampas.domain.BarrioBD;
import com.utn.frba.rampas.utils.HandlerDS;
import com.utn.frba.rampas.utils.Setup;

@Path("/Barrios")
public class BarriosBD {

	@GET 
	@Path("/admin/carga")
	@Produces("application/json")
	public Response cargaInicial() {
		Setup.setup();
		return Response.ok("",MediaType.APPLICATION_JSON).build();		
	}
	
	@GET 
	@Path("/barrios")
	@Produces("application/json")
	public Response loadBarrios() {
		ArrayList<BarrioBD> barrios = HandlerDS.getBarrios();
		if (barrios == null || barrios.size() == 0) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(barrios),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@GET 
	@Path("/barrios/{barrio}")
	@Produces("application/json")
	public Response loadBarrioByNombre(@PathParam("barrio") String nombre) {
		BarrioBD unBarrio = HandlerDS.getBarrioByNombre(nombre);
		if (unBarrio == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(unBarrio),MediaType.APPLICATION_JSON).build();		
		}
	}
	
}

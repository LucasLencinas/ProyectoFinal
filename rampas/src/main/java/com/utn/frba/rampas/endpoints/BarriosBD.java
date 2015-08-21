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
	@Produces("application/json")
	public Response index() {
		Setup.setup();
		System.out.println("Obtener Barrios");
		ArrayList<BarrioBD> barrios = HandlerDS.getBarrios();
		if (barrios == null) {
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
		System.out.println("Dentro de get rampas by Barrio");
		System.out.println("Me llegan, barrio: "+ nombre);
		BarrioBD barrio = HandlerDS.getBarrioByNombre(nombre);
		if (barrio == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(barrio),MediaType.APPLICATION_JSON).build();		
		}
	}
	
}

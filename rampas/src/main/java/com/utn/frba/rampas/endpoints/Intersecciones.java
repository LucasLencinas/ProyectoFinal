package com.utn.frba.rampas.endpoints;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.utn.frba.rampas.utils.Setup;

@Path("/Intersecciones")
public class Intersecciones {
	
	@GET 
	@Produces("application/json")
	public Response index(){
		System.out.println("Me piden las intersecciones");
		Setup.setup();
		String interseccionesJson = new Gson().toJson(Setup.getIntersecciones());
		return Response.ok(interseccionesJson,MediaType.APPLICATION_JSON).build();
	}
   
}

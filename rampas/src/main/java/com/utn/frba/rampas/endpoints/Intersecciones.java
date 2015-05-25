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

import com.utn.frba.rampas.domain.Interseccion;
import com.utn.frba.rampas.domain.Ubicacion;

import com.utn.frba.rampas.utils.HandlerDS;
import com.utn.frba.rampas.utils.Setup;

@Path("/Intersecciones")
public class Intersecciones {
	
	@GET 
	@Produces("application/json")
	public Response index() {
		Setup.setup();
		System.out.println("Me piden las intersecciones");
		ArrayList<Interseccion> intersecciones = HandlerDS.getIntersecciones();
		if (intersecciones == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(intersecciones),MediaType.APPLICATION_JSON).build();		
		}
/*		
		String intersecciones_json = new Gson().toJson(HandlerDS.getIntersecciones());
		return Response.ok(intersecciones_json,MediaType.APPLICATION_JSON).build();
*/	
	}

	@GET
	@Path("/Interseccion")
	@Consumes("application/json")
	@Produces("application/json")
	public Response loadInterseccion(String ubicacion_json) {
		Interseccion unaInterseccion;
		Gson parser = new Gson();
		Ubicacion unaUbicacion = parser.fromJson(ubicacion_json,Ubicacion.class);
		unaInterseccion = HandlerDS.loadInterseccion(unaUbicacion);
		if (unaInterseccion == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(unaInterseccion),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@POST
	@Path("/Interseccion")
	@Consumes("application/json")
	public Response saveInterseccion(String interseccion_json) {
		Gson parser = new Gson();
		Interseccion unaInterseccion = parser.fromJson(interseccion_json,Interseccion.class);
		boolean agregoInterseccionBien = HandlerDS.saveInterseccion(unaInterseccion);
		if (agregoInterseccionBien) {
			return Response.status(Response.Status.OK).build();
		} 
		else {
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
	@DELETE
	@Path("/Interseccion")
	@Consumes("application/json")
	public Response deleteInterseccion(String interseccion_json) {
		Gson parser = new Gson();
		Interseccion unaInterseccion = parser.fromJson(interseccion_json,Interseccion.class);
		boolean borroInterseccionBien = HandlerDS.deleteInterseccion(unaInterseccion);
		if (borroInterseccionBien) {
			return Response.status(Response.Status.OK).build();
		} 
		else {
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
}

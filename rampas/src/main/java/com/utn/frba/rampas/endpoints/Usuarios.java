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

import com.utn.frba.rampas.domain.Sesion;
import com.utn.frba.rampas.domain.Usuario;

import com.utn.frba.rampas.utils.HandlerDS;
import com.utn.frba.rampas.utils.Setup;

@Path("/Usuarios")
public class Usuarios {
	
	@GET 
	@Produces("application/json")
	public Response index() {
		Setup.setup();
		System.out.println("Me piden los usuarios");
		ArrayList<Usuario> usuarios = HandlerDS.getUsuarios();
		if (usuarios == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(usuarios),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@GET 
	@Path("/admin/carga")
	@Produces("application/json")
	public Response cargaInicial() {
		
		System.out.println("Me piden la carga inicial de datos de prueba...");
		Setup.setup();
		return Response.ok("{\"Respuesta\": \"OK\"}",MediaType.APPLICATION_JSON).build();		
	}
	
	
	
	
	
	/**Las funciones de abajo todavia no fueron probadas desde la pagina web con AJAX**/
	
	@GET
	@Path("/Usuario")
	@Consumes("application/json")
	@Produces("application/json")
	public Response loadUsuario(String sesion_json) {
		Usuario unUsuario;
		Gson parser = new Gson();
		Sesion unaSesion = parser.fromJson(sesion_json,Sesion.class);
		unUsuario = HandlerDS.loadUsuario(unaSesion);
		if (unUsuario == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else{
			return Response.ok(new Gson().toJson(unUsuario),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@POST
	@Path("/Usuario")
	@Consumes("application/json")
	public Response saveUsuario(String usuario_json) {
		Gson parser = new Gson();
		Usuario unUsuario = parser.fromJson(usuario_json,Usuario.class);
		boolean agregoUsuarioBien = HandlerDS.saveUsuario(unUsuario);
		if (agregoUsuarioBien) {
			return Response.status(Response.Status.OK).build();
		} 
		else {
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
	@DELETE
	@Path("/Usuario")
	@Consumes("application/json")
	public Response deleteInterseccion(String usuario_json) {
		Gson parser = new Gson();
		Usuario unUsuario = parser.fromJson(usuario_json,Usuario.class);
		boolean borroUsuarioBien = HandlerDS.deleteUsuario(unUsuario);
		if (borroUsuarioBien) {
			return Response.status(Response.Status.OK).build();
		} 
		else {
			return Response.status(Response.Status.CONFLICT).build();
		}
	}
	
}

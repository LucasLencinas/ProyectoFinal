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

import com.utn.frba.rampas.domain.Usuario;
import com.utn.frba.rampas.utils.HandlerDS;
import com.utn.frba.rampas.utils.Setup;

@Path("/Usuarios")
public class Usuarios {

	@GET 
	@Path("/admin/carga")
	@Produces("application/json")
	public Response cargaInicial() {
		Setup.setup();
		return Response.ok("",MediaType.APPLICATION_JSON).build();		
	}
	
	@POST
	@Consumes("application/json")
	public Response saveUsuario(String usuario_json) {
		Gson parser = new Gson();
		Usuario unUsuario = parser.fromJson(usuario_json,Usuario.class);
		String estado = HandlerDS.saveUsuario(unUsuario);
		if (estado == "OK") {
			return Response.status(Response.Status.OK).build();
		} 
		else {
			return Response.serverError().entity("Agregar Usuario: Error - " + estado).build();
		}
	}
	
	@PUT
	@Consumes("application/json")
	public Response updateUsuario(String usuario_json) {
		Gson parser = new Gson();
		Usuario unUsuario = parser.fromJson(usuario_json,Usuario.class);
		String estado = HandlerDS.saveUsuario(unUsuario);
		if (estado == "OK") {
			return Response.status(Response.Status.OK).build();
			
		} 
		else {
			return Response.serverError().entity("Modificar Usuario: Error - " + estado).build();
		}
	}
	
	@DELETE
	@Consumes("application/json")
	public Response deleteUsuario(String usuario_json) {
		Gson parser = new Gson();
		Usuario unUsuario = parser.fromJson(usuario_json,Usuario.class);
		String estado = HandlerDS.deleteUsuario(unUsuario);
		if (estado == "OK") {
			return Response.status(Response.Status.OK).build();
		} 
		else {
			return Response.serverError().entity("Borrar Usuario: Error - " + estado).build();
		}
	}
	
	@GET 
	@Path("/usuarios")
	@Produces("application/json")
	public Response loadUsuarios() {
		ArrayList<Usuario> usuarios = HandlerDS.getUsuarios();
		if (usuarios == null || usuarios.size() == 0) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(usuarios),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@GET
	@Path("/mail/{mail}")
	@Produces("application/json")
	public Response loadUsuarioByMail(@PathParam("mail") String mail) {
		Usuario unUsuario;
		unUsuario = HandlerDS.getUsuarioByMail(mail);
		if (unUsuario == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else{
			return Response.ok(new Gson().toJson(unUsuario),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@GET
	@Path("/facebook/{facebook}")
	@Produces("application/json")
	public Response loadUsuarioByFacebook(@PathParam("facebook") String facebook) {
		Usuario unUsuario;
		unUsuario = HandlerDS.getUsuarioByFacebook(facebook);
		if (unUsuario == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else{
			return Response.ok(new Gson().toJson(unUsuario),MediaType.APPLICATION_JSON).build();		
		}
	}

}

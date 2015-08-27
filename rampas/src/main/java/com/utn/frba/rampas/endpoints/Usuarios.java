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
	@Produces("application/json")
	public Response index() {
		Setup.setup();
//		System.out.println("Obtener Usuarios");
		ArrayList<Usuario> usuarios = HandlerDS.getUsuarios();
		if (usuarios == null || usuarios.size() == 0) {
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
//		System.out.println("Me piden la carga inicial de datos de prueba...");
		Setup.setup();
		return Response.ok("{\"Respuesta\": \"OK\"}",MediaType.APPLICATION_JSON).build();		
	}
		
	/**Las funciones de abajo todavia no fueron probadas desde la pagina web con AJAX**/
	
	@GET
	@Path("/mail")
	@Produces("application/json")
	public Response loadUsuarioByMail(@PathParam("mail") String mail) {
//		System.out.println("Dentro de get usuarios by mail");
//		System.out.println("Me llega, mail: " + mail);
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
	@Path("/facebook")
	@Produces("application/json")
	public Response loadUsuarioByFacebook(@PathParam("facebook") String facebook) {
//		System.out.println("Dentro de get usuarios by facebook");
//		System.out.println("Me llega, facebook: " + facebook);
		Usuario unUsuario;
		unUsuario = HandlerDS.getUsuarioByFacebook(facebook);
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
//	@Produces("application/json")
	public Response saveUsuario(String usuario_json) {
		Gson parser = new Gson();
		Usuario unUsuario = parser.fromJson(usuario_json,Usuario.class);
		String estado = HandlerDS.saveUsuario(unUsuario);
		if (estado == "OK") {
//			System.out.println("El usuario se agrego bien");
			return Response.status(Response.Status.OK).build();
		} 
		else {
//			System.out.println("Hubo con conflicto al agregar el usuario");
			return Response.serverError().entity("Agregar Usuario: Error - " + estado).build();
		}
	}
	
	@PUT
	@Path("/Usuario")
	@Consumes("application/json")
//	@Produces("application/json")
	public Response updateUsuario(String usuario_json) {
		Gson parser = new Gson();
		Usuario unUsuario = parser.fromJson(usuario_json,Usuario.class);
		String estado = HandlerDS.saveUsuario(unUsuario);
		if (estado == "OK") {
//			System.out.println("El usuario se modifico bien");
			return Response.status(Response.Status.OK).build();
			
		} 
		else {
//			System.out.println("Hubo con conflicto al modificar el usuario");
			return Response.serverError().entity("Modificar Usuario: Error - " + estado).build();
		}
	}
	
	@DELETE
	@Path("/Usuario")
	@Consumes("application/json")
	public Response deleteUsuario(String usuario_json) {
		Gson parser = new Gson();
		Usuario unUsuario = parser.fromJson(usuario_json,Usuario.class);
		String estado = HandlerDS.deleteUsuario(unUsuario);
		if (estado == "OK") {
//			System.out.println("El usuario se elimino bien");
			return Response.status(Response.Status.OK).build();
		} 
		else {
//			System.out.println("Hubo con conflicto al borrar el usuario");
			return Response.serverError().entity("Borrar Usuario: Error - " + estado).build();
		}
	}

}

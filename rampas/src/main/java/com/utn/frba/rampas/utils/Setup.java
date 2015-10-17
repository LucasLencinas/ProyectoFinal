package com.utn.frba.rampas.utils;

import java.net.URI;

import java.util.ArrayList;

import org.glassfish.grizzly.http.server.HttpHandler;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.http.server.StaticHttpHandler;

import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import com.googlecode.objectify.ObjectifyService;

import com.utn.frba.rampas.domain.BarrioBD;
import com.utn.frba.rampas.domain.Rampa;
import com.utn.frba.rampas.domain.Usuario;

public class Setup {

	public static final String RESOURCES_PATH = "/src/main/resources/com/utn/frba/rampas/";
	public static final String BASE_URI = "http://localhost:8080/masrampas/";
	
	public static void setupClases() {
		ObjectifyService.register(BarrioBD.class);
		ObjectifyService.register(Rampa.class);
		ObjectifyService.register(Usuario.class);
	}
	
	public static boolean deleteAll(){
		
		String estado;
		
		ArrayList<BarrioBD> barrios = HandlerDS.getBarrios();
		if (barrios != null){
			estado = HandlerDS.deleteBarrios(barrios);
			if (estado != "OK") {
				return false;
			} 
		}
		
		ArrayList<Rampa> rampas = HandlerDS.getRampas();
		if (rampas != null){
			estado = HandlerDS.deleteRampas(rampas);
			if (estado != "OK") {
				return false;
			} 
		}
		
		ArrayList<Usuario> usuarios = HandlerDS.getUsuarios();
		if (usuarios != null){
			estado = HandlerDS.deleteUsuarios(usuarios);
			if (estado != "OK") {
				return false;
			} 
		}
		
		return true;
	}
	
	/*--------------For testing--------------*/
	public static HttpServer startServer() {
   		//Los recursos los va a buscar a este paquete
       final ResourceConfig rc = new ResourceConfig().packages("com.utn.frba.rampas.endpoints");
       HttpServer httpServer = GrizzlyHttpServerFactory.createHttpServer(URI.create(BASE_URI), rc);
       HttpHandler handlerStatico = new StaticHttpHandler(System.getProperty("user.dir") + RESOURCES_PATH + "/client/");
       System.out.println(System.getProperty("user.dir"));
       httpServer.getServerConfiguration().addHttpHandler(handlerStatico, "/");
       return httpServer;
     }
	
}

package com.utn.frba.rampas.utils;

import java.net.URI;
import java.util.ArrayList;

import org.glassfish.grizzly.http.server.HttpHandler;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.http.server.StaticHttpHandler;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import com.googlecode.objectify.ObjectifyService;
import com.utn.frba.rampas.domain.Rampa;
import com.utn.frba.rampas.domain.Usuario;

public class Setup {

  public static final String RESOURCES_PATH = "/src/main/resources/com/utn/frba/rampas/";
  public static final String BASE_URI = "http://localhost:8080/masrampas/";
	private static boolean isSet =false;
	static ArrayList<Usuario> usuarios;
	static ArrayList<Rampa> rampas;
	
	public static void setup() {
		if(isSet == false) {
    	
			ObjectifyService.register(Usuario.class);
			
    		usuarios = new ArrayList<Usuario>();
			usuarios.add(new Usuario(1,"Federico","Diaz","fedee_vpc@hotmail.com","federico"));
			usuarios.add(new Usuario(2,"Matias","Dionisi","matiasdionisi22@hotmail.com","matias"));
			usuarios.add(new Usuario(3,"Lucas","Lencinas","lllencinas@gmail.com","lucas"));
			usuarios.add(new Usuario(4,"Daniel","Ordoñez","danivelez21@hotmail.com","daniel"));
			usuarios.add(new Usuario(5,"Martin","Soifer","marsoifer.91@gmail.com","martin"));
			
			for(Usuario usuario: usuarios) {
				HandlerDS.saveUsuario(usuario);
			}

	    	ObjectifyService.register(Rampa.class);
				
	    	rampas = new ArrayList<Rampa>();
			//Medrano y Cordoba
			rampas.add(new Rampa(1,-34.59777071095415,-58.42014310000002,true,true,true));
			//Medrano y Tucuman
			rampas.add(new Rampa(2,-34.59816741095431,-58.42018889999997,true,false,true));
			//Medrano y Lavalle
			rampas.add(new Rampa(3,-34.59896381095469,-58.420347900000024,false,false,false));
			//Medrano y Rocamora
			rampas.add(new Rampa(4,-34.59950261095487,-58.420448299999975,true,true,true));
			//Medrano y Rauch
			rampas.add(new Rampa(5,-34.60001371095508,-58.42052460000002));
			//Medrano y Guardia Vieja
			rampas.add(new Rampa(6,-34.600685110955375,-58.42059330000001));
			//Medrano y Humahuaca
			rampas.add(new Rampa(7,-34.60191351095585,-58.4207993));
			//Medrano y Corrientes
			rampas.add(new Rampa(8,-34.60316471095638,-58.420967099999984));
				
			for(Rampa unaRampa: rampas){
				HandlerDS.saveRampa(unaRampa);
			}
			
			isSet = true;
		}
	}
	
	
  /*--------------For testing--------------*/
	public static void setupTest() {
		//Solo agrego las clases al Objectify y otras boludeces. No me sirve el otro setup porque 
		//no puedo obtener los objetos que se guardan para compararlos al sacarlos de la base de datos 
  	ObjectifyService.register(Rampa.class);
  	ObjectifyService.register(Usuario.class);
  	Setup.isSet = true;
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

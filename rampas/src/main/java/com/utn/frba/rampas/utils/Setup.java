package com.utn.frba.rampas.utils;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.util.ArrayList;

import javax.servlet.ServletContext;

import org.glassfish.grizzly.http.server.HttpHandler;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.http.server.StaticHttpHandler;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import com.google.gson.Gson;
import com.googlecode.objectify.ObjectifyService;
import com.utn.frba.rampas.domain.Barrio;
import com.utn.frba.rampas.domain.BarrioBD;
import com.utn.frba.rampas.domain.ListadoIntersecciones;
import com.utn.frba.rampas.domain.Punto;
import com.utn.frba.rampas.domain.Rampa;
import com.utn.frba.rampas.domain.Usuario;
import com.utn.frba.rampas.endpoints.Rampas;

public class Setup {

	public static final String RESOURCES_PATH = "/src/main/resources/com/utn/frba/rampas/";
	public static final String BASE_URI = "http://localhost:8080/masrampas/";
	
	private static boolean isSet =false;
	
	public static BarrioBD agronomia;
	public static BarrioBD almagro;
	public static BarrioBD balvanera;
	
	public static Rampa medranoYcordoba;
	public static Rampa medranoYtucuman;
	public static Rampa medranoYlavalle;
	public static Rampa medranoYrocamora;
	public static Rampa medranoYrauch;
	public static Rampa medranoYguardiaVieja;
	public static Rampa medranoYhumahuaca;
	public static Rampa medranoYcorrientes;
	
	public static Usuario federico;
	public static Usuario matias;
	public static Usuario lucas;
	public static Usuario daniel;
	public static Usuario martin;	
	
	/*Este ya no se usaria mas si funciona el setup con info inicial.
	 * Tenia problemas para cargar el archivo de barrios desde java por problemas de permisos
	 * con Google App Engine. Estoy tratando de mandarlo en un endpoint desde js a java
	 * con la funcion setupConInfoInicial(string_barrios)*/
	@Deprecated 
	public static void setup() {
		if(isSet == false) {
    	
			ObjectifyService.register(BarrioBD.class);
	  	HandlerDS.deleteBarrios(HandlerDS.getBarrios());
	  		
	    ObjectifyService.register(Rampa.class);
	  	HandlerDS.deleteRampas(HandlerDS.getRampas());
	  		
	  	cargarBarriosYRampas();
	        
			ObjectifyService.register(Usuario.class);
	        
	    federico = new Usuario("Federico","Diaz","fedee_vpc@hotmail.com","federico");
	  	matias = new Usuario("Matias","Dionisi","matiasdionisi22@hotmail.com","matias");
			lucas = new Usuario("Lucas","Lencinas","lllencinas@gmail.com","lucas");
			daniel = new Usuario("DanielOrdoñez");
			martin = new Usuario("MartinSoifer");
			
	  	HandlerDS.deleteUsuarios(HandlerDS.getUsuarios());
	    HandlerDS.saveUsuario(federico);
	    HandlerDS.saveUsuario(matias);
	    HandlerDS.saveUsuario(lucas);
	    HandlerDS.saveUsuario(daniel);
	    HandlerDS.saveUsuario(martin);
	    				    		
			isSet = true;
		}
	}
	
	
	public static void setupConInfoInicial(ArrayList<Barrio> listaDeBarrios){
		if(isSet == false) {
    	
			ObjectifyService.register(BarrioBD.class);
	  	HandlerDS.deleteBarrios(HandlerDS.getBarrios());
	  		
	    ObjectifyService.register(Rampa.class);
	  	HandlerDS.deleteRampas(HandlerDS.getRampas());
	  		
	  	cargarBarriosYRampasConInfoInicial(listaDeBarrios);
	        
			ObjectifyService.register(Usuario.class);
	        
	    federico = new Usuario("Federico","Diaz","fedee_vpc@hotmail.com","federico");
	  	matias = new Usuario("Matias","Dionisi","matiasdionisi22@hotmail.com","matias");
			lucas = new Usuario("Lucas","Lencinas","lllencinas@gmail.com","lucas");
			daniel = new Usuario("DanielOrdoñez");
			martin = new Usuario("MartinSoifer");
			
	  	HandlerDS.deleteUsuarios(HandlerDS.getUsuarios());
	    HandlerDS.saveUsuario(federico);
	    HandlerDS.saveUsuario(matias);
	    HandlerDS.saveUsuario(lucas);
	    HandlerDS.saveUsuario(daniel);
	    HandlerDS.saveUsuario(martin);
	    				    		
			isSet = true;
		}
	}
	
	public static void cargarBarriosYRampasConInfoInicial(ArrayList<Barrio> listaDeBarrios){
		Barrio barrio;
		BarrioBD barrioBD;
		Punto punto;
		Rampa rampa;
		 
		for (int i = 0; i < listaDeBarrios.size(); i++) {
			barrio = listaDeBarrios.get(i);
			barrioBD = new BarrioBD(barrio.getNombre(), barrio.getPoligono().getCoordinates());
			HandlerDS.saveBarrio(barrioBD);
			for(int j = 0; j < barrio.getCalles().size(); j++){
				punto = barrio.getCalles().get(j);
				rampa = new Rampa(punto.getCoordenadas().get(0), 
						          punto.getCoordenadas().get(1), 
						          barrio.getNombre(), 
						          punto.getTieneInformacion(), 
						          punto.getTieneRampa(),
						          punto.getBuenEstado(),
						          punto.getCrucesAccesibles(),
						          punto.getReportada());
				HandlerDS.saveRampa(rampa);
			}
		}
		
	}
	
 	public static void cargarBarriosYRampas(){
		Gson gson = new Gson();  
		ListadoIntersecciones listado = new ListadoIntersecciones();
		Barrio barrio;
		BarrioBD barrioBD;
		Punto punto;
		Rampa rampa;
		System.out.println("Cargar Barrios y Rampas desde Archivo: ");  
		//File archivo = new File("/WEB-INF/archivos/barriosParaJava.js");
		//InputStream inputStream = new FileInputStream(archivo); // ESto no funciono
		//javax.servlet.ServletContext.class.getResourceAsStream("WEB-INF/archivos/barriosParaJava.js"); 
		InputStream inputStream = Rampas.class.getClassLoader().getResourceAsStream("WEB-INF/archivos/barriosParaJava.js");
		BufferedReader br = new BufferedReader(new InputStreamReader(inputStream));
		//Convert the json string back to object  
		listado = gson.fromJson(br, ListadoIntersecciones.class);  
		 
		for (int i = 0; i < listado.getBarrios().size() ; i++) {
			barrio = listado.getBarrios().get(i);
			barrioBD = new BarrioBD(barrio.getNombre(), barrio.getPoligono().getCoordinates());
			HandlerDS.saveBarrio(barrioBD);
			for(int j = 0; j < barrio.getCalles().size(); j++){
				punto = barrio.getCalles().get(j);
				rampa = new Rampa(punto.getCoordenadas().get(0), 
						          punto.getCoordenadas().get(1), 
						          barrio.getNombre(), 
						          punto.getTieneInformacion(), 
						          punto.getTieneRampa(),
						          punto.getBuenEstado(),
						          punto.getCrucesAccesibles(),
						          punto.getReportada());
				HandlerDS.saveRampa(rampa);
			}
		}
	}
	
  /*--------------For testing--------------*/
	public static void setupTest() {
		//Solo agrego las clases al Objectify y otras boludeces. No me sirve el otro setup porque 
		//no puedo obtener los objetos que se guardan para compararlos al sacarlos de la base de datos 
		ObjectifyService.register(BarrioBD.class);
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

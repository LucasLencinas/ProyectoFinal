package com.utn.frba.rampas.tests;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.gson.Gson;

import com.utn.frba.rampas.utils.Setup;
import com.utn.frba.rampas.domain.ListadoIntersecciones;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;


public class CargarRampasTest {
	
	private final LocalServiceTestHelper helper =
      new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

  @Before
  public void setUp() {
      helper.setUp();
      Setup.setupTest(); // Solo hacer el registro de las clases para el DataStore
  }

  @After
  public void tearDown() {
      helper.tearDown();
  }
	
	@Test
	public void cargarArchivoConRampasTest(){
	  Gson gson = new Gson();  
	  ListadoIntersecciones listado = new ListadoIntersecciones();
	  try {  
	    
		   System.out.println("Reading JSON from a file");  
		   System.out.println("----------------------------");  
		     
		   BufferedReader br = new BufferedReader(new FileReader("D:\\workspace\\rampas\\rampas\\src\\main\\webapp\\mapa0308\\barriosParaJava.js"));  
		     
		    //convert the json string back to object  
		   listado = gson.fromJson(br, ListadoIntersecciones.class);  
		     
		   System.out.println("Nombre del primer Barrio: "+listado.getBarrios().get(0).getNombre());  
		   System.out.println("El valor de la primera coordenada del 5to barrio deberia ser -34.5729116200995: "+listado.getBarrios().get(4).getCalles().get(0).getCoordenadas().get(0));
		   
		  
		   /**   
		   List<String> listOfStates = listado.getListOfStates();  
		   for (int i = 0; i < listOfStates.size(); i++) {  
		    System.out.println(listOfStates.get(i));  
		   }  
		   **/
	    
	  } catch (IOException e) {  
	   e.printStackTrace();  
	  }
	  
	  assertTrue(listado.getBarrios().get(0).getNombre().equalsIgnoreCase("COGHLAN"));
	  assertEquals(listado.getBarrios().get(4).getCalles().get(0).getCoordenadas().get(0),-34.5729116200995,0);
	  
	}

}

package com.utn.frba.rampas.tests;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.google.gson.Gson;
import com.utn.frba.rampas.utils.HandlerDS;
import com.utn.frba.rampas.utils.Setup;
import com.utn.frba.rampas.domain.Barrio;
import com.utn.frba.rampas.domain.BarrioBD;
import com.utn.frba.rampas.domain.ListadoIntersecciones;
import com.utn.frba.rampas.domain.Punto;
import com.utn.frba.rampas.domain.Rampa;

import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
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
	@Ignore
	@Test
	public void cargarArchivoConRampasTest(){
		int id = 0;
	  Gson gson = new Gson();  
	  ListadoIntersecciones listado = new ListadoIntersecciones();
	  try {  
	    
	  	Barrio barrio;
	  	BarrioBD barrioBD;
	  	Punto punto;
	  	Rampa rampa;
		  System.out.println("Reading JSON from a file");  
		  System.out.println("----------------------------");  
		     
		  BufferedReader br = new BufferedReader(new FileReader("D:\\workspace\\rampas\\rampas\\src\\main\\webapp\\barriosParaJava.js"));  
		     
		  //convert the json string back to object  
		  listado = gson.fromJson(br, ListadoIntersecciones.class);  
		   
		  for (int i = 0; i < listado.getBarrios().size() ; i++) {
		  	barrio = listado.getBarrios().get(i);
		  	barrioBD = new BarrioBD(i+1, barrio.getNombre(), barrio.getPoligono().getCoordinates());
		  	HandlerDS.saveBarrio(barrioBD);
		  	for(int j = 0; j < barrio.getCalles().size(); j++){
		  		punto = barrio.getCalles().get(j);
		  		rampa = new Rampa(++id, punto.getCoordenadas().get(0), 
		  				punto.getCoordenadas().get(1), barrio.getNombre(), punto.getTieneInformacion(), 
		  				punto.getTieneRampa(), punto.getBuenEstado(), punto.getCrucesAccesibles(), punto.getReportada());
		  		HandlerDS.saveRampa(rampa);
		  	}
			} 
		  
	  } catch (IOException e) {  
	   e.printStackTrace();  
	  }
	  
	  assertEquals(HandlerDS.getRampas().size(),id,0);
	  
	}

}

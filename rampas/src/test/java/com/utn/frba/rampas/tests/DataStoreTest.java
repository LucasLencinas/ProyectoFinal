package com.utn.frba.rampas.tests;

import java.util.ArrayList;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.utn.frba.rampas.utils.HandlerDS;
import com.utn.frba.rampas.utils.Setup;
import com.utn.frba.rampas.domain.Rampa;
import com.utn.frba.rampas.domain.Usuario;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class DataStoreTest {
	
		public Rampa medranoYcordoba;
		public Rampa medranoYtucuman;
		public Rampa medranoYlavalle;
		public Rampa medranoYrocamora;
		public Rampa medranoYrauch;
		public Rampa medranoYguardiaVieja;
		public Rampa medranoYhumahuaca;
		public Rampa medranoYcorrientes;
		
		public Usuario fede;
		public Usuario matias;
		public ArrayList<Usuario> usuarios;
		public ArrayList<Rampa> rampas;
    private final LocalServiceTestHelper helper =
        new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    @Before
    public void setUp() {
        helper.setUp();
        Setup.setupTest(); // Solo hacer el registro de las clases para el DataStore
        
      	usuarios = new ArrayList<Usuario>();
  			usuarios.add(fede = new Usuario(1,"Federico","Diaz","fedee_vpc@hotmail.com","federico"));
  			usuarios.add(matias = new Usuario(2,"Matias","Dionisi","matiasdionisi22@hotmail.com","matias"));
  			
  			rampas = new ArrayList<Rampa>();
  			//Medrano y Cordoba
  			rampas.add(medranoYcordoba = new Rampa(1,-34.59777071095415,-58.42014310000002,true,true,true));
  			//Medrano y Tucuman
  			rampas.add(medranoYtucuman = new Rampa(2,-34.59816741095431,-58.42018889999997,true,false,true));
  			//Medrano y Lavalle
  			rampas.add(medranoYlavalle = new Rampa(3,-34.59896381095469,-58.420347900000024,false,false,false));
  			//Medrano y Rocamora
  			rampas.add(medranoYrocamora = new Rampa(4,-34.59950261095487,-58.420448299999975,true,true,true));
  			//Medrano y Rauch
  			rampas.add(medranoYrauch = new Rampa(5,-34.60001371095508,-58.42052460000002));
  			//Medrano y Guardia Vieja
  			rampas.add(medranoYguardiaVieja = new Rampa(6,-34.600685110955375,-58.42059330000001));
  			//Medrano y Humahuaca
  			rampas.add(medranoYhumahuaca = new Rampa(7,-34.60191351095585,-58.4207993));
  			//Medrano y Corrientes
  			rampas.add(medranoYcorrientes = new Rampa(8,-34.60316471095638,-58.420967099999984));
        
        HandlerDS.saveRampa(medranoYcordoba);
        HandlerDS.saveRampa(medranoYtucuman);
        HandlerDS.saveRampa(medranoYlavalle);
        HandlerDS.saveRampa(medranoYrocamora);
        HandlerDS.saveRampa(medranoYrauch);
        HandlerDS.saveRampa(medranoYguardiaVieja);
        HandlerDS.saveRampa(medranoYhumahuaca);
        HandlerDS.saveRampa(medranoYcorrientes);
        HandlerDS.saveUsuario(fede);
        HandlerDS.saveUsuario(matias);
    }

    @After
    public void tearDown() {
        helper.tearDown();
    }
    
    /**Todos los Tests de Rampas que se puedan hacer. Add, Delete, Get, Update**/
    /**Hacer varias funciones del tipo findRampaByAlgo()...**/
    @Test
    public void getRampaByIdTest(){
    	 Rampa rampa1SacadaDelDataStore= HandlerDS.findRampaById(medranoYcordoba.getId());
       assertEquals(rampa1SacadaDelDataStore.getLat(),  medranoYcordoba.getLat(),0);
       assertEquals(rampa1SacadaDelDataStore.getLng(),  medranoYcordoba.getLng(),0);      	
    }
    
    @Test
    public void getRampaByLatLng(){}

    @Test
    public void getRampasByBarrio(){}

    @Test
    public void getRampasDentroDeUnPoligono(){}

    @Test
    public void getRampasAccesibles(){}

    @Test
    public void getRampaQueSonIntersecciones(){}

    @Test
    public void getRampaByBarrioQueSonInterseccionesYSonAccesibles(){}
    
    /**Todos los Tests de Usuarios que se puedan hacer. Add, Delete, Get, Update**/
    @Test
    public void getUsuarioById(){}

    @Test
    public void getUsuarioByEmail(){}
    
    @Test
    public void getUsuarioByFacebook(){}
    
    /**Todos los Tests de Eventos que se puedan hacer. Add, Delete, Get, Update**/
    @Test
    public void getEventoById(){}

    @Test
    public void getEventoByIdUsuario(){}
    
    @Test
    public void getEventoByTipoDeEvento(){}
     
}



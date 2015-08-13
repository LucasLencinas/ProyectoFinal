package com.utn.frba.rampas.tests;

import java.util.ArrayList;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;

import com.utn.frba.rampas.utils.HandlerDS;
import com.utn.frba.rampas.utils.Setup;

import com.utn.frba.rampas.domain.BarrioBD;
import com.utn.frba.rampas.domain.Rampa;
import com.utn.frba.rampas.domain.Usuario;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class DataStoreTest {
	
	public Usuario federico;
	public Usuario matias;
	public Usuario lucas;
	public Usuario daniel;
	public Usuario martin;
	
	public Rampa medranoYcordoba;
	public Rampa medranoYtucuman;
	public Rampa medranoYlavalle;
	public Rampa medranoYrocamora;
	public Rampa medranoYrauch;
	public Rampa medranoYguardiaVieja;
	public Rampa medranoYhumahuaca;
	public Rampa medranoYcorrientes;
	
	public BarrioBD almagro;

	private final LocalServiceTestHelper helper =
		new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    @Before
    public void setUp() {
        helper.setUp();

        Setup.setupTest(); // Solo hacer el registro de las clases para el DataStore
        
 		federico = new Usuario(1,"Federico","Diaz","fedee_vpc@hotmail.com","federico");
  		matias = new Usuario(2,"Matias","Dionisi","matiasdionisi22@hotmail.com","matias");
		lucas = new Usuario(3,"Lucas","Lencinas","lllencinas@gmail.com","lucas");
		daniel = new Usuario(4,"Daniel","Ordoñez","danivelez21@hotmail.com","daniel");
		martin = new Usuario(5,"Martin","Soifer","marsoifer.91@gmail.com","martin");
		
        HandlerDS.saveUsuario(federico);
        HandlerDS.saveUsuario(matias);
        HandlerDS.saveUsuario(lucas);
        HandlerDS.saveUsuario(daniel);
        HandlerDS.saveUsuario(martin);
  		
        medranoYcordoba = new Rampa(1,-34.59777071095415,-58.42014310000002,"Almagro",false,false,false,false,false);
  		medranoYtucuman = new Rampa(2,-34.59816741095431,-58.42018889999997,"Almagro",true,false,false,false,false);
  		medranoYlavalle = new Rampa(3,-34.59896381095469,-58.420347900000024,"Almagro",true,true,false,false,false);
  		medranoYrocamora = new Rampa(4,-34.59950261095487,-58.420448299999975,"Almagro",true,true,false,true,false);
  		medranoYrauch = new Rampa(5,-34.60001371095508,-58.42052460000002,"Almagro",true,true,true,false,false);
  		medranoYguardiaVieja = new Rampa(6,-34.600685110955375,-58.42059330000001,"Almagro",true,true,true,true,false);
  		medranoYhumahuaca = new Rampa(7,-34.60191351095585,-58.4207993,"Almagro",true,true,true,true,true);
  		medranoYcorrientes = new Rampa(8,-34.60316471095638,-58.420967099999984,"Almagro", true,true,true,true,false);
        
        HandlerDS.saveRampa(medranoYcordoba);
        HandlerDS.saveRampa(medranoYtucuman);
        HandlerDS.saveRampa(medranoYlavalle);
        HandlerDS.saveRampa(medranoYrocamora);
        HandlerDS.saveRampa(medranoYrauch);
        HandlerDS.saveRampa(medranoYguardiaVieja);
        HandlerDS.saveRampa(medranoYhumahuaca);
        HandlerDS.saveRampa(medranoYcorrientes);
        
        almagro = new BarrioBD(1,"Almagro","[[[[-58.36524,-34.60549],[-58.36523,-34.60549],[-58.36522,-34.60549],[-58.36521,-34.60549],[-58.3652,-34.60548],[-58.36519,-34.60548],[-58.36518,-34.60549],[-58.36459,-34.60544],[-58.36457,-34.60544],[-58.36456,-34.60544],[-58.36456,-34.60544],[-58.36455,-34.60544],[-58.36455,-34.60544],[-58.36454,-34.60544],[-58.36454,-34.60544],[-58.36453,-34.60545],[-58.36453,-34.60545],[-58.36453,-34.60546],[-58.36453,-34.60546],[-58.36452,-34.60547],[-58.36452,-34.60547],[-58.36439,-34.6067],[-58.36424,-34.60792],[-58.36386,-34.61121],[-58.36382,-34.61159],[-58.36382,-34.61159],[-58.36382,-34.6116],[-58.36382,-34.61161],[-58.36382,-34.61161],[-58.36382,-34.61162],[-58.36383,-34.61162],[-58.36383,-34.61163],[-58.36384,-34.61163],[-58.36384,-34.61163],[-58.36385,-34.61163],[-58.36386,-34.61163],[-58.36386,-34.61163],[-58.36388,-34.61164],[-58.36388,-34.61164],[-58.36452,-34.61169],[-58.36453,-34.61169],[-58.36453,-34.61169],[-58.36454,-34.61169],[-58.36455,-34.61169],[-58.36456,-34.6117],[-58.36456,-34.6117],[-58.36457,-34.61171],[-58.36457,-34.61171],[-58.36457,-34.61172],[-58.36457,-34.61172],[-58.36457,-34.61173],[-58.36457,-34.61174],[-58.36454,-34.612],[-58.36476,-34.61202],[-58.36479,-34.61175],[-58.36479,-34.61174],[-58.3648,-34.61173],[-58.3648,-34.61173],[-58.36481,-34.61172],[-58.36481,-34.61172],[-58.36482,-34.61172],[-58.36482,-34.61172],[-58.36483,-34.61171],[-58.36484,-34.61171],[-58.36485,-34.61171],[-58.36486,-34.61171],[-58.36517,-34.61174],[-58.36548,-34.61176],[-58.36549,-34.61176],[-58.3655,-34.61176],[-58.36551,-34.61177],[-58.36552,-34.61177],[-58.36553,-34.61177],[-58.36553,-34.61176],[-58.36554,-34.61176],[-58.36554,-34.61176],[-58.36555,-34.61175],[-58.36555,-34.61175],[-58.36556,-34.61174],[-58.36556,-34.61174],[-58.36556,-34.61173],[-58.36556,-34.61173],[-58.36556,-34.61172],[-58.36556,-34.61171],[-58.36562,-34.61121],[-58.36598,-34.60806],[-58.36613,-34.6067],[-58.36626,-34.60562],[-58.36626,-34.60561],[-58.36626,-34.6056],[-58.36626,-34.6056],[-58.36626,-34.60559],[-58.36625,-34.60558],[-58.36625,-34.60558],[-58.36625,-34.60558],[-58.36624,-34.60557],[-58.36624,-34.60557],[-58.36623,-34.60557],[-58.36622,-34.60557],[-58.36622,-34.60557],[-58.36621,-34.60557],[-58.3662,-34.60557],[-58.3662,-34.60557],[-58.3656,-34.60552],[-58.36559,-34.60552],[-58.36558,-34.60552],[-58.36557,-34.60552],[-58.36556,-34.60552],[-58.36556,-34.60551],[-58.36555,-34.60551],[-58.36555,-34.60551],[-58.36554,-34.6055],[-58.36553,-34.6055],[-58.36553,-34.6055],[-58.36553,-34.60549],[-58.36552,-34.60549],[-58.36552,-34.60548],[-58.36552,-34.60548],[-58.36552,-34.60548],[-58.36552,-34.60547],[-58.36552,-34.60546],[-58.36552,-34.60546],[-58.36552,-34.60545],[-58.36551,-34.60545],[-58.36554,-34.6052],[-58.36532,-34.60518],[-58.36529,-34.60543],[-58.36529,-34.60543],[-58.36529,-34.60544],[-58.36528,-34.60545],[-58.36528,-34.60546],[-58.36528,-34.60546],[-58.36527,-34.60547],[-58.36527,-34.60548],[-58.36526,-34.60548],[-58.36525,-34.60548],[-58.36525,-34.60548],[-58.36524,-34.60549]]]]");

        HandlerDS.saveBarrio(almagro);
        
    }

    @After
    public void tearDown() {
        helper.tearDown();
    }
    
    /**Todos los Tests de Rampas que se puedan hacer. Add, Delete, Get, Update**/
    /**Hacer varias funciones del tipo findRampaByAlgo()...**/
    
    @Test
    public void getRampaById() {
    	Rampa unaRampa = HandlerDS.getRampaById(medranoYcordoba.getId());
    	assertEquals(unaRampa.getLatitud(),medranoYcordoba.getLatitud(),0);
    	assertEquals(unaRampa.getLongitud(),medranoYcordoba.getLongitud(),0);      	
    }
    
    @Test
    public void getRampaByLatitudLongitud() {
    	Rampa unaRampa = HandlerDS.getRampaByLatitudLongitud(medranoYcordoba.getLatitud(),medranoYcordoba.getLongitud());
   		assertEquals(unaRampa.getLatitud(),medranoYcordoba.getLatitud(),0);
   		assertEquals(unaRampa.getLongitud(),medranoYcordoba.getLongitud(),0);     	
    }

    @Test
    public void getRampasRojas() {
    	ArrayList<Rampa> rampasRojas = HandlerDS.getRampasRojas();
    	assertEquals(rampasRojas.get(0).getId(),1,0);
    	assertEquals(rampasRojas.get(1).getId(),2,0);
    	assertEquals(rampasRojas.get(2).getId(),3,0);
    	assertEquals(rampasRojas.get(2).getId(),7,0);
    } 
    
    @Test
    public void getRampasNaranjas() {
    	ArrayList<Rampa> rampasNaranjas = HandlerDS.getRampasNaranjas();
    	assertEquals(rampasNaranjas.get(0).getId(),4,0);
    }    

    @Test
    public void getRampasAmarillas() {
    	ArrayList<Rampa> rampasAmarillas = HandlerDS.getRampasAmarillas();
    	assertEquals(rampasAmarillas.get(0).getId(),5,0);
    }     
    
    @Test
    public void getRampasVerdes() {
    	ArrayList<Rampa> rampasVerdes = HandlerDS.getRampasVerdes();
    	assertEquals(rampasVerdes.get(0).getId(),6,0);
    	assertEquals(rampasVerdes.get(1).getId(),8,0);
  	}

    @Test
    public void getRampasByBarrio() {
    	ArrayList<Rampa> rampasBarrio = HandlerDS.getRampasByBarrio("Almagro");
    	assertEquals(rampasBarrio.get(0).getId(),1,0);
    	assertEquals(rampasBarrio.get(1).getId(),2,0);
    	assertEquals(rampasBarrio.get(2).getId(),3,0);
    	assertEquals(rampasBarrio.get(3).getId(),4,0);
    	assertEquals(rampasBarrio.get(4).getId(),5,0);
    	assertEquals(rampasBarrio.get(5).getId(),6,0);
    	assertEquals(rampasBarrio.get(6).getId(),7,0);
    	assertEquals(rampasBarrio.get(7).getId(),8,0);
    }

    @Test
    public void getBarrioByRampa() {
    	String barrio = HandlerDS.getBarrioByRampa(medranoYcordoba);
    	assertTrue(barrio.equalsIgnoreCase(medranoYcordoba.getBarrio()));
    }    
    
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



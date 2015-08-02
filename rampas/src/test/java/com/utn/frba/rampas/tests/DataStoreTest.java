package com.utn.frba.rampas.tests;

import java.util.ArrayList;

import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.utn.frba.rampas.utils.HandlerDS;
import com.utn.frba.rampas.utils.Setup;
import com.utn.frba.rampas.domain.Rampa;
import com.utn.frba.rampas.domain.Rampa;
import com.utn.frba.rampas.domain.Usuario;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

public class DataStoreTest {
	
		public Rampa rampa1;
		public Rampa rampa2;
		public Usuario fede;
		public Usuario matias;
		public ArrayList<Usuario> usuarios;
		public ArrayList<Rampa> rampas;
    private final LocalServiceTestHelper helper =
        new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    @Before
    public void setUp() {
        helper.setUp();
        Setup.setupTest();
        
      	usuarios = new ArrayList<Usuario>();
  			usuarios.add(fede = new Usuario(1,"Federico","Diaz","fedee_vpc@hotmail.com","federico"));
  			usuarios.add(matias = new Usuario(2,"Matias","Dionisi","matiasdionisi22@hotmail.com","matias"));
  			
  			rampas = new ArrayList<Rampa>();
  			//Medrano y Cordoba
  			rampas.add(rampa1 = new Rampa(1,-34.59777071095415,-58.42014310000002,true,true,true));
  			//Medrano y Tucuman
  			rampas.add(rampa2 = new Rampa(2,-34.59816741095431,-58.42018889999997,true,false,true));
        
        HandlerDS.saveRampa(rampa1);
        HandlerDS.saveRampa(rampa2);
        HandlerDS.saveUsuario(fede);
        HandlerDS.saveUsuario(matias);
    }

    @After
    public void tearDown() {
        helper.tearDown();
    }
    
    @Test
    public void getRampa1ByIdTest(){
    	
    	 Rampa rampa1SacadaDelDataStore= HandlerDS.findRampaById(rampa1.getId());
       assertEquals(rampa1SacadaDelDataStore.getLat(),  rampa1.getLat(),0);
       assertEquals(rampa1SacadaDelDataStore.getLng(),  rampa1.getLng(),0);
       	
    }
    

 /***  
    @Test
    public void filtroTruequesPorUsuarioTest(){

      ListaDeTrueques truequesFiltrados = HandlerDS.findTruequeByUser(usuario1);
      assertEquals(truequesFiltrados.size(), 1);      
      assertEquals(truequesFiltrados.get(0).getUsuarioSolicitante().getId(), usuario1.getId()); 	
    }

    @Test
    public void filtroTruequesPorItemTest(){

      ListaDeTrueques truequesFiltrados = HandlerDS.findTruequeByItem(anteojos);
      assertEquals(truequesFiltrados.size(), 1);      
      assertEquals(truequesFiltrados.get(0).getUsuarioSolicitante().getId(), usuario1.getId());
      assertEquals(truequesFiltrados.get(0).getItemOfrecido().getId(), anteojos.getId()); 
    }
    
    
    @Test
    public void saveAndGetItemAndUserTest() {
    	HandlerDS.guardarItem(Setup.trueque1.getItemOfrecido()); 
      Item item = HandlerDS.findItemById(Setup.trueque1.getItemOfrecido().getId());
      assertEquals(Setup.trueque1.getItemOfrecido(),  item);
      
      HandlerDS.guardarUsuario(Setup.trueque1.getUsuarioSolicitado()); 
      Usuario usuario = HandlerDS.findUsuarioById(Setup.trueque1.getUsuarioSolicitado().getId());
      assertEquals(usuario, Setup.trueque1.getUsuarioSolicitado());
      assertEquals(usuario.getNombre(), Setup.trueque1.getUsuarioSolicitado().getNombre());
    }
    
    @Test
    public void saveAnUserAndGetAnItemOfAFriendTest(){
    	HandlerDS.guardarUsuario(Setup.miUsuario);
    	Usuario usuarioGuardado = HandlerDS.findUsuarioById(Setup.miUsuario.getId());
    	assertEquals(usuarioGuardado, Setup.miUsuario);
    	
    	Usuario amigoOfDataStore = usuarioGuardado.getAmigos().findById(Setup.usuarioAmigo1.getId());
    	assertEquals(amigoOfDataStore.getId(), Setup.usuarioAmigo1.getId());
    	assertEquals(amigoOfDataStore.getItems().findById(Setup.item2.getId()), 
    			Setup.usuarioAmigo1.getItems().findById(Setup.item2.getId()));
    }

    @Test
    public void getTruequeByItemTest(){
    	ListaDeTrueques trueques = HandlerDS.findTruequeByItem(truequeTest.getItemOfrecido());
    	Trueque truequeBuscado = trueques.get(0);
    	assertEquals(truequeBuscado.getId(),truequeTest.getId());
    }
    
    **/
}



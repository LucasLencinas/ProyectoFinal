package com.utn.frba.rampas.tests;

import org.junit.After;
import org.junit.Before;
import com.google.appengine.tools.development.testing.LocalDatastoreServiceTestConfig;
import com.google.appengine.tools.development.testing.LocalServiceTestHelper;
import com.googlecode.objectify.ObjectifyService;
import com.utn.frba.rampas.utils.HandlerDS;
import com.utn.frba.rampas.domain.Usuario;
import com.utn.frba.rampas.domain.Rampa;

public abstract class AbstractTest {

  private final LocalServiceTestHelper helper =
      new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());
	

	protected  Rampa rampa1;
	protected Rampa rampa2;
	protected Rampa rampa3;
	protected Rampa rampa4;
	protected Usuario miUsuario;
	protected Usuario usuarioAmigo;
	protected static boolean estaSeteado;

	@Before
	public void setUp() {
			helper.setUp();
    	ObjectifyService.register(Rampa.class);
    	ObjectifyService.register(Usuario.class);
	  	/**
	  	miUsuario = new Usuario(123, "Lucas", "Lencinas", "lllencinas@gmail.com", "duraznito123");
	  	usuarioAmigo = new Usuario(124,"Matias", "Dionisi", "matidionisi22@hotmail.com", "cubero987");
	  	
	  	HandlerDS.saveUsuario(miUsuario);
	  	HandlerDS.saveUsuario(usuarioAmigo);
	  	
	  	HandlerDS.saveRampa(medranoYcordoba);
	  	**/
	}

	@After
	public void tearDown() throws Exception {
		helper.tearDown();
		}
		 
	  
	
	
}

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
import org.junit.Ignore;
import org.junit.Test;

import static org.junit.Assert.*;

public class DataStoreTest {

	public BarrioBD agronomia;
	public BarrioBD almagro;
	public BarrioBD balvanera;

	public Rampa medranoYcordoba;
	public Rampa medranoYtucuman;
	public Rampa medranoYlavalle;
	public Rampa medranoYrocamora;
	public Rampa medranoYrauch;
	public Rampa medranoYguardiaVieja;
	public Rampa medranoYhumahuaca;
	public Rampa medranoYcorrientes;
	
	public Usuario federico;
	public Usuario matias;
	public Usuario lucas;
	public Usuario daniel;
	public Usuario martin;

	private final LocalServiceTestHelper helper =
		new LocalServiceTestHelper(new LocalDatastoreServiceTestConfig());

    @Before
    public void setUp() {
        helper.setUp();

        Setup.setupTest(); // Solo hacer el registro de las clases para el DataStore
        
    	agronomia = new BarrioBD("Agronomia","[[[[-58.47712,-34.59511],[-58.47788,-34.59709],[-58.47835,-34.59834],[-58.47858,-34.59897],[-58.47883,-34.59967],[-58.47975,-34.59928],[-58.48078,-34.59883],[-58.48213,-34.59825],[-58.48284,-34.59794],[-58.48298,-34.59789],[-58.483,-34.59788],[-58.48329,-34.5978],[-58.48346,-34.59776],[-58.48346,-34.59776],[-58.48485,-34.59763],[-58.48518,-34.59761],[-58.48613,-34.59754],[-58.48649,-34.59751],[-58.48668,-34.5975],[-58.48714,-34.59746],[-58.48735,-34.59745],[-58.4878,-34.59742],[-58.48782,-34.59741],[-58.48854,-34.59736],[-58.48953,-34.5973],[-58.49019,-34.59725],[-58.49122,-34.59718],[-58.49249,-34.5971],[-58.49282,-34.59707],[-58.49291,-34.59707],[-58.49342,-34.59703],[-58.49472,-34.59695],[-58.49678,-34.59681],[-58.49713,-34.59679],[-58.49718,-34.59682],[-58.49838,-34.59637],[-58.49955,-34.59593],[-58.49963,-34.5959],[-58.49979,-34.59585],[-58.50013,-34.59572],[-58.50071,-34.5955],[-58.50179,-34.5951],[-58.50276,-34.59474],[-58.50288,-34.5947],[-58.50318,-34.59458],[-58.50354,-34.59445],[-58.50308,-34.59438],[-58.50347,-34.59395],[-58.50331,-34.59386],[-58.50214,-34.59313],[-58.50193,-34.593],[-58.50082,-34.59232],[-58.49949,-34.59149],[-58.4982,-34.5907],[-58.49707,-34.59],[-58.49593,-34.5893],[-58.49559,-34.58909],[-58.49536,-34.58895],[-58.49479,-34.58859],[-58.49423,-34.58824],[-58.49389,-34.58803],[-58.49366,-34.58789],[-58.49254,-34.58718],[-58.49197,-34.58682],[-58.49141,-34.58647],[-58.49085,-34.58612],[-58.49029,-34.58576],[-58.48956,-34.5853],[-58.48897,-34.58493],[-58.48879,-34.58482],[-58.48819,-34.58544],[-58.48809,-34.58555],[-58.48744,-34.58622],[-58.48689,-34.5868],[-58.4868,-34.5869],[-58.4867,-34.58701],[-58.48654,-34.58718],[-58.48644,-34.58728],[-58.48611,-34.58763],[-58.48556,-34.58822],[-58.48549,-34.58829],[-58.48543,-34.58835],[-58.48508,-34.58873],[-58.48471,-34.58912],[-58.48471,-34.58912],[-58.48399,-34.58937],[-58.48365,-34.58949],[-58.4825,-34.58989],[-58.48201,-34.59006],[-58.48186,-34.59012],[-58.48146,-34.59025],[-58.48129,-34.5903],[-58.48118,-34.59033],[-58.48087,-34.59041],[-58.47954,-34.59075],[-58.47808,-34.59112],[-58.47782,-34.59119],[-58.4772,-34.59135],[-58.47648,-34.59156],[-58.47589,-34.59172],[-58.47598,-34.59195],[-58.47604,-34.59209],[-58.47613,-34.59236],[-58.47621,-34.59259],[-58.47669,-34.59393],[-58.47671,-34.59399],[-58.47671,-34.594],[-58.4769,-34.59453],[-58.47712,-34.59511]]]]");
    	almagro = new BarrioBD("Almagro","[[[[-58.36524,-34.60549],[-58.36523,-34.60549],[-58.36522,-34.60549],[-58.36521,-34.60549],[-58.3652,-34.60548],[-58.36519,-34.60548],[-58.36518,-34.60549],[-58.36459,-34.60544],[-58.36457,-34.60544],[-58.36456,-34.60544],[-58.36456,-34.60544],[-58.36455,-34.60544],[-58.36455,-34.60544],[-58.36454,-34.60544],[-58.36454,-34.60544],[-58.36453,-34.60545],[-58.36453,-34.60545],[-58.36453,-34.60546],[-58.36453,-34.60546],[-58.36452,-34.60547],[-58.36452,-34.60547],[-58.36439,-34.6067],[-58.36424,-34.60792],[-58.36386,-34.61121],[-58.36382,-34.61159],[-58.36382,-34.61159],[-58.36382,-34.6116],[-58.36382,-34.61161],[-58.36382,-34.61161],[-58.36382,-34.61162],[-58.36383,-34.61162],[-58.36383,-34.61163],[-58.36384,-34.61163],[-58.36384,-34.61163],[-58.36385,-34.61163],[-58.36386,-34.61163],[-58.36386,-34.61163],[-58.36388,-34.61164],[-58.36388,-34.61164],[-58.36452,-34.61169],[-58.36453,-34.61169],[-58.36453,-34.61169],[-58.36454,-34.61169],[-58.36455,-34.61169],[-58.36456,-34.6117],[-58.36456,-34.6117],[-58.36457,-34.61171],[-58.36457,-34.61171],[-58.36457,-34.61172],[-58.36457,-34.61172],[-58.36457,-34.61173],[-58.36457,-34.61174],[-58.36454,-34.612],[-58.36476,-34.61202],[-58.36479,-34.61175],[-58.36479,-34.61174],[-58.3648,-34.61173],[-58.3648,-34.61173],[-58.36481,-34.61172],[-58.36481,-34.61172],[-58.36482,-34.61172],[-58.36482,-34.61172],[-58.36483,-34.61171],[-58.36484,-34.61171],[-58.36485,-34.61171],[-58.36486,-34.61171],[-58.36517,-34.61174],[-58.36548,-34.61176],[-58.36549,-34.61176],[-58.3655,-34.61176],[-58.36551,-34.61177],[-58.36552,-34.61177],[-58.36553,-34.61177],[-58.36553,-34.61176],[-58.36554,-34.61176],[-58.36554,-34.61176],[-58.36555,-34.61175],[-58.36555,-34.61175],[-58.36556,-34.61174],[-58.36556,-34.61174],[-58.36556,-34.61173],[-58.36556,-34.61173],[-58.36556,-34.61172],[-58.36556,-34.61171],[-58.36562,-34.61121],[-58.36598,-34.60806],[-58.36613,-34.6067],[-58.36626,-34.60562],[-58.36626,-34.60561],[-58.36626,-34.6056],[-58.36626,-34.6056],[-58.36626,-34.60559],[-58.36625,-34.60558],[-58.36625,-34.60558],[-58.36625,-34.60558],[-58.36624,-34.60557],[-58.36624,-34.60557],[-58.36623,-34.60557],[-58.36622,-34.60557],[-58.36622,-34.60557],[-58.36621,-34.60557],[-58.3662,-34.60557],[-58.3662,-34.60557],[-58.3656,-34.60552],[-58.36559,-34.60552],[-58.36558,-34.60552],[-58.36557,-34.60552],[-58.36556,-34.60552],[-58.36556,-34.60551],[-58.36555,-34.60551],[-58.36555,-34.60551],[-58.36554,-34.6055],[-58.36553,-34.6055],[-58.36553,-34.6055],[-58.36553,-34.60549],[-58.36552,-34.60549],[-58.36552,-34.60548],[-58.36552,-34.60548],[-58.36552,-34.60548],[-58.36552,-34.60547],[-58.36552,-34.60546],[-58.36552,-34.60546],[-58.36552,-34.60545],[-58.36551,-34.60545],[-58.36554,-34.6052],[-58.36532,-34.60518],[-58.36529,-34.60543],[-58.36529,-34.60543],[-58.36529,-34.60544],[-58.36528,-34.60545],[-58.36528,-34.60546],[-58.36528,-34.60546],[-58.36527,-34.60547],[-58.36527,-34.60548],[-58.36526,-34.60548],[-58.36525,-34.60548],[-58.36525,-34.60548],[-58.36524,-34.60549]]]]");
    	balvanera = new BarrioBD("Balvanera","[[[[-58.41192,-34.598],[-58.41029,-34.59809],[-58.40943,-34.59809],[-58.40872,-34.59808],[-58.40858,-34.59808],[-58.40815,-34.59807],[-58.40806,-34.59807],[-58.40663,-34.59805],[-58.40588,-34.59804],[-58.40559,-34.59804],[-58.40487,-34.59804],[-58.40473,-34.59804],[-58.40451,-34.59804],[-58.40372,-34.59846],[-58.40363,-34.5985],[-58.40345,-34.5986],[-58.40308,-34.5988],[-58.40254,-34.59909],[-58.40247,-34.59912],[-58.40201,-34.59937],[-58.40146,-34.59944],[-58.40121,-34.59947],[-58.40107,-34.59948],[-58.40107,-34.59948],[-58.40048,-34.59956],[-58.39992,-34.59962],[-58.39878,-34.59975],[-58.39872,-34.59976],[-58.39866,-34.59976],[-58.39719,-34.59973],[-58.39664,-34.59972],[-58.39582,-34.5997],[-58.39471,-34.59968],[-58.39468,-34.59968],[-58.3944,-34.59967],[-58.39308,-34.59964],[-58.39293,-34.59964],[-58.39277,-34.60081],[-58.39275,-34.60094],[-58.39259,-34.60199],[-58.39257,-34.60212],[-58.39239,-34.60316],[-58.39229,-34.60444],[-58.39221,-34.60549],[-58.39219,-34.60565],[-58.39212,-34.60664],[-58.39211,-34.60679],[-58.39204,-34.60785],[-58.39203,-34.60799],[-58.39196,-34.60917],[-58.39195,-34.60929],[-58.39195,-34.60929],[-58.39188,-34.61034],[-58.39186,-34.61056],[-58.39181,-34.61128],[-58.39179,-34.6115],[-58.39179,-34.61167],[-58.39179,-34.61167],[-58.39179,-34.61167],[-58.39177,-34.61246],[-58.39176,-34.61266],[-58.39175,-34.61282],[-58.39171,-34.61383],[-58.3917,-34.61407],[-58.39168,-34.61467],[-58.39168,-34.61469],[-58.39168,-34.61492],[-58.39167,-34.61518],[-58.39166,-34.61551],[-58.39166,-34.6157],[-58.39166,-34.61584],[-58.39168,-34.61688],[-58.3917,-34.61816],[-58.39203,-34.61818],[-58.39229,-34.61819],[-58.393,-34.61822],[-58.3932,-34.61823],[-58.3945,-34.6183],[-58.39599,-34.61838],[-58.39751,-34.61846],[-58.39896,-34.61854],[-58.39924,-34.61855],[-58.40004,-34.6186],[-58.40029,-34.61862],[-58.40098,-34.61867],[-58.40225,-34.61876],[-58.40351,-34.61884],[-58.40504,-34.61915],[-58.40639,-34.61943],[-58.40778,-34.61972],[-58.40925,-34.62002],[-58.41008,-34.62019],[-58.41052,-34.62028],[-58.41081,-34.62034],[-58.41254,-34.62064],[-58.41264,-34.61958],[-58.41264,-34.61939],[-58.41268,-34.61828],[-58.41269,-34.61807],[-58.41275,-34.61663],[-58.41282,-34.61544],[-58.41287,-34.61412],[-58.41312,-34.61342],[-58.41331,-34.61285],[-58.41344,-34.61261],[-58.41356,-34.61237],[-58.41401,-34.61155],[-58.41447,-34.61074],[-58.41458,-34.60938],[-58.41462,-34.60885],[-58.41466,-34.60819],[-58.4141,-34.60791],[-58.41394,-34.60735],[-58.41391,-34.60725],[-58.41364,-34.60612],[-58.41341,-34.60512],[-58.41323,-34.60433],[-58.41322,-34.6043],[-58.41318,-34.60414],[-58.41297,-34.60323],[-58.4128,-34.60251],[-58.41259,-34.6016],[-58.4123,-34.60035],[-58.41228,-34.60024],[-58.41225,-34.60011],[-58.41212,-34.5993],[-58.41192,-34.598]]]]");
    	
    	HandlerDS.saveBarrio(agronomia);
    	HandlerDS.saveBarrio(almagro);
    	HandlerDS.saveBarrio(balvanera);
    	
        medranoYcordoba = new Rampa(-34.59777071095415,-58.42014310000002,"Almagro",false,false,false,false,false,"");
  		medranoYtucuman = new Rampa(-34.59816741095431,-58.42018889999997,"Almagro",true,false,false,false,false,"");
  		medranoYlavalle = new Rampa(-34.59896381095469,-58.420347900000024,"Almagro",true,true,false,false,false,"");
  		medranoYrocamora = new Rampa(-34.59950261095487,-58.420448299999975,"Almagro",true,true,false,true,false,"");
  		medranoYrauch = new Rampa(-34.60001371095508,-58.42052460000002,"Almagro",true,true,true,false,false,"");
  		medranoYguardiaVieja = new Rampa(-34.600685110955375,-58.42059330000001,"Almagro",true,true,true,true,false,"");
  		medranoYhumahuaca = new Rampa(-34.60191351095585,-58.4207993,"Almagro",true,true,true,true,true,"Nueva");
  		medranoYcorrientes = new Rampa(-34.60316471095638,-58.420967099999984,"Almagro", true,true,true,true,false,"");
        
  		HandlerDS.saveRampa(medranoYcordoba);
        HandlerDS.saveRampa(medranoYtucuman);
        HandlerDS.saveRampa(medranoYlavalle);
        HandlerDS.saveRampa(medranoYrocamora);
        HandlerDS.saveRampa(medranoYrauch);
        HandlerDS.saveRampa(medranoYguardiaVieja);
        HandlerDS.saveRampa(medranoYhumahuaca);
        HandlerDS.saveRampa(medranoYcorrientes);
        
        federico = new Usuario("Federico","Diaz","fedee_vpc@hotmail.com","federico");
  		matias = new Usuario("Matias","Dionisi","matiasdionisi22@hotmail.com","matias");
		lucas = new Usuario("Lucas","Lencinas","lllencinas@gmail.com","lucas");
		daniel = new Usuario("DanielOrdoñez");
		martin = new Usuario("MartinSoifer");
		
        HandlerDS.saveUsuario(federico);
        HandlerDS.saveUsuario(matias);
        HandlerDS.saveUsuario(lucas);
        HandlerDS.saveUsuario(daniel);
        HandlerDS.saveUsuario(martin);
        
    }

    @After
    public void tearDown() {
        helper.tearDown();
    }
    
    /* Tests de Barrio */
    
    @Test
    public void getBarrios() {
    	ArrayList<BarrioBD> barrios = HandlerDS.getBarrios();
    	assertEquals(barrios.get(0).getId(),1,0);
    	assertEquals(barrios.get(1).getId(),2,0);
    	assertEquals(barrios.get(2).getId(),3,0);
    }
    
    @Test
    public void getBarrioByNombre() {
    	BarrioBD unBarrio = HandlerDS.getBarrioByNombre("Agronomia");
    	assertEquals(unBarrio.getId(),agronomia.getId(),0);
    }
    
    @Ignore
    @Test
    public void getBarrioByRampa() {
    	String barrio = HandlerDS.getBarrioByRampa(medranoYcorrientes);
    	assertTrue(barrio.equalsIgnoreCase(medranoYcorrientes.getBarrio()));
    }    
    
    @Ignore
    @Test
    public void getBarrioByRampaEnArray() {
    	assertTrue(almagro.contiene(medranoYcordoba));
    }
    
    /**Todos los Tests de Rampas que se puedan hacer. Add, Delete, Get, Update**/
    /**Hacer varias funciones del tipo findRampaByAlgo()...**/
    
    /* Tests de Rampa */
    
    @Test
    public void getRampas() {
    	ArrayList<Rampa> rampas = HandlerDS.getRampas();
    	assertEquals(rampas.get(0).getId(),medranoYcordoba.getId(),0);
    	assertEquals(rampas.get(1).getId(),medranoYtucuman.getId(),0);
    	assertEquals(rampas.get(2).getId(),medranoYlavalle.getId(),0);
    	assertEquals(rampas.get(3).getId(),medranoYrocamora.getId(),0);
    	assertEquals(rampas.get(4).getId(),medranoYrauch.getId(),0);
    	assertEquals(rampas.get(5).getId(),medranoYguardiaVieja.getId(),0);
    	assertEquals(rampas.get(6).getId(),medranoYhumahuaca.getId(),0);
    	assertEquals(rampas.get(7).getId(),medranoYcorrientes.getId(),0);
    }
    
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
    public void getRampasbyRuta() {
    	ArrayList<Rampa> rampasRuta = HandlerDS.getRampasByRuta(-34.6000,-58.4204,-34.5980,-58.4202);
    	assertEquals(rampasRuta.get(0).getId(),medranoYlavalle.getId(),0);
    }
    
    @Test
    public void getRampasRojas() {
    	ArrayList<Rampa> rampasRojas = HandlerDS.getRampasRojas();
    	assertEquals(rampasRojas.get(0).getId(),medranoYcordoba.getId(),0);
    	assertEquals(rampasRojas.get(1).getId(),medranoYtucuman.getId(),0);
    	assertEquals(rampasRojas.get(2).getId(),medranoYlavalle.getId(),0);
    	assertEquals(rampasRojas.get(3).getId(),medranoYhumahuaca.getId(),0);
    } 
    
    @Test
    public void getRampasNaranjas() {
    	ArrayList<Rampa> rampasNaranjas = HandlerDS.getRampasNaranjas();
    	assertEquals(rampasNaranjas.get(0).getId(),medranoYrocamora.getId(),0);
    }    

    @Test
    public void getRampasAmarillas() {
    	ArrayList<Rampa> rampasAmarillas = HandlerDS.getRampasAmarillas();
    	assertEquals(rampasAmarillas.get(0).getId(),medranoYrauch.getId(),0);
    }     
    
    @Test
    public void getRampasVerdes() {
    	ArrayList<Rampa> rampasVerdes = HandlerDS.getRampasVerdes();
    	assertEquals(rampasVerdes.get(0).getId(),medranoYguardiaVieja.getId(),0);
    	assertEquals(rampasVerdes.get(1).getId(),medranoYcorrientes.getId(),0);
  	}

    @Test
    public void getRampasReportadas() {
    	ArrayList<Rampa> rampasReportadas = HandlerDS.getRampasReportadas();
    	assertEquals(rampasReportadas.get(0).getId(),medranoYhumahuaca.getId(),0);
  	}
    
    @Test
    public void getRampasByBarrio() {
    	ArrayList<Rampa> rampasBarrio = HandlerDS.getRampasByBarrio("Almagro");
    	assertEquals(rampasBarrio.get(0).getId(),medranoYcordoba.getId(),0);
    	assertEquals(rampasBarrio.get(1).getId(),medranoYtucuman.getId(),0);
    	assertEquals(rampasBarrio.get(2).getId(),medranoYlavalle.getId(),0);
    	assertEquals(rampasBarrio.get(3).getId(),medranoYrocamora.getId(),0);
    	assertEquals(rampasBarrio.get(4).getId(),medranoYrauch.getId(),0);
    	assertEquals(rampasBarrio.get(5).getId(),medranoYguardiaVieja.getId(),0);
    	assertEquals(rampasBarrio.get(6).getId(),medranoYhumahuaca.getId(),0);
    	assertEquals(rampasBarrio.get(7).getId(),medranoYcorrientes.getId(),0);
    }
    
    /**Todos los Tests de Usuarios que se puedan hacer. Add, Delete, Get, Update**/
    
    /* Tests de Usuario */
    
    @Test
    public void getUsuarios() {
    	ArrayList<Usuario> usuarios = HandlerDS.getUsuarios();
    	assertEquals(usuarios.get(0).getId(),federico.getId(),0);
    	assertEquals(usuarios.get(1).getId(),matias.getId(),0);
    	assertEquals(usuarios.get(2).getId(),lucas.getId(),0);
    	assertEquals(usuarios.get(3).getId(),daniel.getId(),0);
    	assertEquals(usuarios.get(4).getId(),martin.getId(),0);
    }
    
    @Test
    public void getUsuarioById() {
		Usuario unUsuario = HandlerDS.getUsuarioById(federico.getId());
    	assertTrue(unUsuario.getNombre().equalsIgnoreCase(federico.getNombre()));
    	assertTrue(unUsuario.getApellido().equalsIgnoreCase(federico.getApellido()));
	}
    
    @Test
    public void getUsuarioByEmail() {
		Usuario unUsuario = HandlerDS.getUsuarioByMail(federico.getMail());
		assertEquals(unUsuario.getId(),federico.getId(),0);
	}
    
    @Test
    public void getUsuarioByFacebook() {
		Usuario unUsuario = HandlerDS.getUsuarioByFacebook(daniel.getFacebook());
		assertEquals(unUsuario.getId(),daniel.getId(),0);
    }
    
    /**Todos los Tests de Eventos que se puedan hacer. Add, Delete, Get, Update**/
    @Test
    public void getEventoById(){}

    @Test
    public void getEventoByIdUsuario(){}
    
    @Test
    public void getEventoByTipoDeEvento(){}
     
}



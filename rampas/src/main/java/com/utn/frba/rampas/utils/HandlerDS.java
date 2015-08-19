package com.utn.frba.rampas.utils;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;

import com.utn.frba.rampas.domain.BarrioBD;
import com.utn.frba.rampas.domain.Rampa;
import com.utn.frba.rampas.domain.Usuario;

public class HandlerDS {

	/* Barrio */
	
	public static String saveBarrio(BarrioBD unBarrio) {
		System.out.print("Guardar Barrio: " + unBarrio.getNombre());
		try {
			ofy().save().entity(unBarrio).now();
		}
		catch(Exception ex) {
			System.out.println(" Error - " + ex.getLocalizedMessage()); 
			return ex.getLocalizedMessage();
		}
		System.out.println(" OK"); 	
		return "OK";
	}
	
	public static String deleteBarrio(BarrioBD unBarrio) {
		System.out.print("Borrar Barrio: " + unBarrio.getNombre());
		try {
			ofy().delete().entity(unBarrio).now();
		}
		catch(Exception ex) {
			System.out.println(" Error - " + ex.getLocalizedMessage()); 
			return ex.getLocalizedMessage();
		}
		System.out.println(" OK"); 	
		return "OK";
	}
	
	public static ArrayList<BarrioBD> getBarrios() {
		System.out.print("Buscar Barrios: ");
		ArrayList<BarrioBD> barrios = new ArrayList<BarrioBD>();
		Iterable<BarrioBD> barriosDS = new ArrayList<BarrioBD>() ;
		try {
			barriosDS = ofy().load().type(BarrioBD.class).list();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}		
		for (BarrioBD unBarrio:barriosDS) {
			barrios.add(unBarrio);
			System.out.print(unBarrio.getId() + " ");	
		}
		System.out.println(" ");
		return barrios;
	}	
	
	public static BarrioBD getBarrioByNombre(String nombre) {
		System.out.print("Buscar Barrio por Nombre: ");
		BarrioBD unBarrio;
		try {
		  unBarrio = ofy().load().type(BarrioBD.class).filter("nombre",nombre).first().now();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		System.out.println("OK");
		return unBarrio;
	}
	
	public static String getBarrioByRampa(Rampa unaRampa) {
		System.out.print("Buscar Barrio por Rampa: ");
		Iterable<BarrioBD> barriosDS = new ArrayList<BarrioBD>() ;
		try {
			barriosDS = ofy().load().type(BarrioBD.class).list();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		for (BarrioBD unBarrio:barriosDS) {
			if (unBarrio.contiene(unaRampa)) {
				System.out.print(unBarrio.getNombre());	
				return unBarrio.getNombre();
			}
		}
		System.out.println("No existe ningun barrio cargado que contenga esa Rampa");
		return null;
	}		
	
/** TODO Rampa:Cambie de nombre todo lo que decia interseccion por rampa, preguntarle a los chicos**/
	
	/* Rampa */
	
	public static String saveRampa(Rampa unaRampa) {
		System.out.print("Guardar Rampa: " + unaRampa.getId());
		try {
			ofy().save().entity(unaRampa).now();
		}
		catch(Exception ex) {
			System.out.println(" Error - " + ex.getLocalizedMessage()); 
			return ex.getLocalizedMessage();
		}
		System.out.println(" OK"); 	
		return "OK";
	}
	
	public static String deleteRampa(Rampa unaRampa) {
		System.out.print("Borrar Rampa: " + unaRampa.getId());
		try {
			ofy().delete().entity(unaRampa).now();
		}
		catch(Exception ex) {
			System.out.println(" Error - " + ex.getLocalizedMessage()); 
			return ex.getLocalizedMessage();
		}
		System.out.println(" OK"); 	
		return "OK";
	}
	
	public static ArrayList<Rampa> getRampas() {
		System.out.print("Buscar Rampas: ");
		ArrayList<Rampa> rampas = new ArrayList<Rampa>();
		Iterable<Rampa> rampasDS = new ArrayList<Rampa>() ;
		try {
			rampasDS = ofy().load().type(Rampa.class).list();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		for (Rampa unaRampa:rampasDS) {
			rampas.add(unaRampa);
			System.out.print(unaRampa.getId() + " ");	
		}
		System.out.println(" ");
		return rampas;
	}

	public static Rampa getRampaById(long id) {
		System.out.print("Buscar Rampa por Id: ");
		Rampa unaRampa;
		try {
		  unaRampa = ofy().load().type(Rampa.class).id(id).now();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		System.out.println("OK");
		return unaRampa;
	}

	public static Rampa getRampaByLatitudLongitud(double latitud,double longitud) {
		System.out.print("Buscar Rampa por Latitud-Longitud: ");
		Rampa unaRampa;
		try {
			unaRampa = ofy().load().type(Rampa.class).filter("latitud",latitud).filter("longitud",longitud).first().now();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		System.out.println("OK");
		return unaRampa;
	}

	public static ArrayList<Rampa> getRampasRojas() {
		System.out.print("Buscar Rampas rojas: ");
		ArrayList<Rampa> rampasRojas = new ArrayList<Rampa>();
		Iterable<Rampa> rampasDS = new ArrayList<Rampa>() ;
		try {
			rampasDS = ofy().load().type(Rampa.class).list();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		for (Rampa unaRampa:rampasDS) 
			if (unaRampa.esRoja()) {
				rampasRojas.add(unaRampa);
				System.out.print(unaRampa.getId() + " ");		
			}
		System.out.println(" ");
		return rampasRojas;
	}	
	
	public static ArrayList<Rampa> getRampasNaranjas() {
		System.out.print("Buscar Rampas naranjas: ");
		ArrayList<Rampa> rampasNaranjas = new ArrayList<Rampa>();
		Iterable<Rampa> rampasDS = new ArrayList<Rampa>() ;
		try {
			rampasDS = ofy().load().type(Rampa.class).list();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		for (Rampa unaRampa:rampasDS) 
			if (unaRampa.esNaranja()) {	
				rampasNaranjas.add(unaRampa);
				System.out.print(unaRampa.getId() + " ");		
			}
		System.out.println(" ");
		return rampasNaranjas;
	}	
	
	public static ArrayList<Rampa> getRampasAmarillas() {
		System.out.print("Buscar Rampas amarillas: ");
		ArrayList<Rampa> rampasAmarillas = new ArrayList<Rampa>();
		Iterable<Rampa> rampasDS = new ArrayList<Rampa>() ;
		try {
			rampasDS = ofy().load().type(Rampa.class).list();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		for (Rampa unaRampa:rampasDS) 
			if (unaRampa.esAmarilla()) {
				rampasAmarillas.add(unaRampa);
				System.out.print(unaRampa.getId() + " ");		
			}
		System.out.println(" ");
		return rampasAmarillas;
	}	
	
	public static ArrayList<Rampa> getRampasVerdes() {
		System.out.print("Buscar Rampas verdes: ");
		ArrayList<Rampa> rampasVerdes = new ArrayList<Rampa>();
		Iterable<Rampa> rampasDS = new ArrayList<Rampa>() ;
		try {
			rampasDS = ofy().load().type(Rampa.class).list();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		for (Rampa unaRampa:rampasDS) 
			if (unaRampa.esVerde()) {
				rampasVerdes.add(unaRampa);
				System.out.print(unaRampa.getId() + " ");		
			}
		System.out.println(" ");
		return rampasVerdes;
	}

	public static ArrayList<Rampa> getRampasByBarrio(String barrio) {
		System.out.print("Buscar Rampas por Barrio: ");
		ArrayList<Rampa> rampasBarrio = new ArrayList<Rampa>();
		Iterable<Rampa> rampasDS = new ArrayList<Rampa>() ;
		try {
			rampasDS = ofy().load().type(Rampa.class).filter("barrio",barrio).list();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		for (Rampa unaRampa:rampasDS) {
			rampasBarrio.add(unaRampa);
			System.out.print(unaRampa.getId() + " ");		
		}
		System.out.println(" ");
		return rampasBarrio;
	}
	
	/* Usuario */
	
	public static String saveUsuario(Usuario unUsuario) {
		System.out.print("Guardar Usuario: " + unUsuario.getId());
		try {
			ofy().save().entity(unUsuario).now();
		}
		catch(Exception ex) {
			System.out.println(" Error - " + ex.getLocalizedMessage()); 
			return ex.getLocalizedMessage();
		}
		System.out.println(" OK"); 	
		return "OK";
	}
	
	public static String deleteUsuario(Usuario unUsuario) {
		System.out.print("Borrar Usuario: " + unUsuario.getId());
		try {
			ofy().delete().entity(unUsuario).now();
		}
		catch(Exception ex) {
			System.out.println(" Error - " + ex.getLocalizedMessage()); 
			return ex.getLocalizedMessage();
		}
		System.out.println(" OK"); 	
		return "OK";
	}

	public static ArrayList<Usuario> getUsuarios() {
		System.out.print("Buscar Usuarios: ");
		ArrayList<Usuario> usuarios = new ArrayList<Usuario>();
		Iterable<Usuario> usuariosDS = new ArrayList<Usuario>() ;
		try {
			usuariosDS = ofy().load().type(Usuario.class).list();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}		
		for (Usuario unUsuario:usuariosDS) {
			usuarios.add(unUsuario);
			System.out.print(unUsuario.getId() + " ");	
		}	
		System.out.println(" ");		
		return usuarios;
	}
	
	public static Usuario getUsuarioById(long id) {
		System.out.print("Buscar Usuario por Id: ");
		Usuario unUsuario;
		try {
		  unUsuario = ofy().load().type(Usuario.class).id(id).now();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		System.out.println("OK");
		return unUsuario;
	}
	
	public static Usuario getUsuarioByMail(String mail) {
		System.out.print("Buscar Usuario por Mail: ");
		Usuario unUsuario;
		try {
		  unUsuario = ofy().load().type(Usuario.class).filter("mail",mail).first().now();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		System.out.println("OK");
		return unUsuario;
	}
	
	public static Usuario getUsuarioByFacebook(String facebook) {
		System.out.print("Buscar Usuario por Facebook: ");
		Usuario unUsuario;
		try {
		  unUsuario = ofy().load().type(Usuario.class).filter("facebook",facebook).first().now();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		System.out.println("OK");
		return unUsuario;
	}
	
	

	
}	
	
/*Todo lo que esta aca abajo son ejemplos de lo que hice en TACS para guardar, obtener y modificar cosas en el DataStore*/	
	
/*	
	public static ListaDeItems items(){
		ListaDeItems itemsResult = new ListaDeItems();
		Iterable<Item> itemsDS = new ArrayList<Item>() ;
		try {
			itemsDS = ofy().load().type(Item.class).list();
		} catch(NotFoundException ex){
			System.out.println("Item no encontrado!!!!");
		}
		
		for (Item item : itemsDS) 
			itemsResult.add(item);
		return itemsResult;
	}
	
	public static long guardarItem(Item item){
		System.out.print("Guardar Item: " +item.toString());
		System.out.print(" --> Ofy = " + ofy().save().entity(item).now().getId());
		System.out.println("  OK");
		return item.getId();
	}
	
	public static String guardarUsuario(Usuario usuario){
		System.out.print("Guardar Usuario : " +usuario.toString());
		System.out.print(" --> Ofy = " + ofy().save().entity(usuario).now().getId());
		System.out.println("  OK"); 	
		return usuario.getId();
	}
	
	public static long guardarTrueque(Trueque trueque){
		System.out.print("Guardar Trueque :" + trueque.toString());
		System.out.print(" --> Ofy = " + ofy().save().entity(trueque).now().getId());
		System.out.println("  OK");
		return trueque.getId();
	}
	
	public static Trueque findTruequeById(long id){
		Trueque trueque;
		try{
		  trueque = ofy().load().type(Trueque.class).id(id).now();
		} catch (NullPointerException e){
		  trueque = null;
		}
		return trueque;
	}
	
	public static Item findItemById(long id){
		Item item;
		try{
		  item = ofy().load().type(Item.class).id(id).now();
		} catch (NullPointerException e){
		  item = null;
		}
		return item;
		
	}
	
	public static Usuario findUsuarioById(String id){
		Usuario user;
		 ofy();
		 ofy().load();
		 ofy().load().type(Usuario.class);
		 ofy().load().type(Usuario.class).id(id);
		 ofy().load().type(Usuario.class).id(id).now();
		 
		user = ofy().load().type(Usuario.class).id((String)id).now();
		if(user == null)
			System.out.println("EL USUARIO ES NULL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11");
		return user;

	}
	
	public static ListaDeTrueques findTruequeByUser(Usuario usuario){
		ListaDeTrueques truequesBuscados = new ListaDeTrueques();
    Iterable<Trueque> trueques = ofy().load().type(Trueque.class);
    for (Trueque trueque : trueques) {
    	//System.out.println("Un trueque traido del DS" + trueque.toString());
    	if(trueque.getUsuarioSolicitado().getId().equals(usuario.getId()) || 
    			trueque.getUsuarioSolicitante().getId().equals(usuario.getId()))
    		truequesBuscados.add(trueque);
    }
    System.out.println("Trueques de " +usuario.toString() +": " + truequesBuscados.toString());
		return truequesBuscados;
	}
	
	public static ListaDeTrueques findTruequeByItem (Item item){
		ListaDeTrueques truequesBuscados = new ListaDeTrueques();
    Iterable<Trueque> trueques = ofy().load().type(Trueque.class);
    for (Trueque trueque : trueques) 
			if(trueque.getItemOfrecido().getId() == item.getId() || 
					trueque.getItemSolicitado().getId() == item.getId())
				truequesBuscados.add(trueque);
    System.out.println("Trueques con " +item.toString() +": " + truequesBuscados.toString());
		return truequesBuscados;
	}
	
	public static ListaDeTrueques findAllTrueques(){
		ListaDeTrueques truequesBuscados = new ListaDeTrueques();
		Iterable<Trueque> trueques = ofy().load().type(Trueque.class);
		for (Trueque trueque : trueques) {
			truequesBuscados.add(trueque);
		}
		return truequesBuscados;
	}
	
	public static ListaDeTrueques findPendingTruequesByUser(Usuario usuario){
	ListaDeTrueques truequesBuscados = new ListaDeTrueques();
	Iterable<Trueque> trueques = ofy().load().type(Trueque.class);
	//		Negrada para saber donde rompe
	if(trueques == null){
		int a = 5/0;
	}
	for (Trueque trueque: trueques) {
			if(trueque == null) {
				int x = 3/0;
			}
		  if (trueque.getEstado() == TruequeStatusConstants.PENDING.getID() && trueque.getUsuarioSolicitado().getId().equals(usuario.getId())) {
		    truequesBuscados.add(trueque);
		  }
		}
	System.out.println("Trueques Pendientes: " + truequesBuscados.toString());
	return truequesBuscados;
	}

	public static boolean deleteItem(Item item, Usuario user) {
		ListaDeTrueques truequesPendientes = findPendingTruequesByUser(user);
		for (Trueque trueque : truequesPendientes) {
			if(trueque.getItemOfrecido().getId() == item.getId() || trueque.getItemSolicitado().getId() == item.getId())
				return false;
		}
		user.quitarItem(item);
		System.out.print("Item: " + item.toString() + "  Borrado");
		ofy().delete().entity(item).now();
		System.out.println("   OK");
		return true;
	}

	public static void deleteAll() {
		System.out.print("Borrado de Usuarios");
		List<Key<Usuario>> userKeys = ofy().load().type(Usuario.class).keys().list();
		ofy().delete().keys(userKeys).now();
		System.out.println("   OK");
		System.out.print("Borrado de Items");
		List<Key<Item>> itemKeys= ofy().load().type(Item.class).keys().list();
		ofy().delete().keys(itemKeys).now();
		System.out.println("   OK");
		System.out.print("Borrado de Trueques");
		List<Key<Trueque>> truequeKeys= ofy().load().type(Trueque.class).keys().list();
		ofy().delete().keys(truequeKeys).now();
		System.out.println("   OK");
	}

	public static ListaDeUsuarios findAllUsers() {
		Iterable<Usuario> usuarioDS=ofy().load().type(Usuario.class).list();
		ListaDeUsuarios listaDeUsuarios= new ListaDeUsuarios();
		for (Usuario usuario : usuarioDS) {
			listaDeUsuarios.add(usuario);
		}
		return listaDeUsuarios;
	}
	
	public static long getNewItemID(){
		Iterable<Item> items = ofy().load().type(Item.class);
		long id=0;
		for (Item item : items) {
			if(id < item.getId())
				id = item.getId();
		}
		return id + 1;
	}
	
	public static long getNewTruequeID(){
		Iterable<Trueque> trueques = ofy().load().type(Trueque.class);
		long id=0;
		for (Trueque trueque : trueques) {
			if(id < trueque.getId())
				id = trueque.getId();
		}
		return id + 1;
	}
	*/


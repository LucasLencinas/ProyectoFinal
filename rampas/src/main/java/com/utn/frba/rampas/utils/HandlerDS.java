package com.utn.frba.rampas.utils;

import static com.googlecode.objectify.ObjectifyService.ofy;
import com.googlecode.objectify.NotFoundException;

import java.util.ArrayList;

import com.utn.frba.rampas.domain.Interseccion;
import com.utn.frba.rampas.domain.Sesion;
import com.utn.frba.rampas.domain.Ubicacion;
import com.utn.frba.rampas.domain.Usuario;

public class HandlerDS {
	
	/* Usuario */
	
	public static Usuario loadUsuario(Sesion unaSesion) {
		Usuario unUsuario;
		System.out.print("Cargar Usuario: ");
		String estado = "OK";
		try {
			unUsuario = ofy().load().type(Usuario.class).filter("mail",unaSesion.getMail()).filter("contraseña",unaSesion.getContraseña()).first().now();
		} 
		catch(NotFoundException ex) {
			estado = "No existe";
			System.out.println(estado);
			return null;
		}
		System.out.println(estado);
		return unUsuario;
	}	
	
	public static boolean saveUsuario(Usuario unUsuario) {
		System.out.print("Guardar Usuario: ");
		String estado = "OK";
		try {
			ofy().save().entity(unUsuario).now();
		}
		catch(Exception ex) {
			estado = "Error";
			System.out.println(estado); 	
			return false;
		}
		System.out.println(estado); 	
		return true;
	}
	
	public static boolean deleteUsuario(Usuario unUsuario) {
		System.out.print("Borrar Usuario: ");
		String estado = "OK";
		try {
			ofy().delete().entity(unUsuario).now();
		}
		catch(Exception ex) {
			estado = "Error";
			System.out.println(estado); 	
			return false;
		}
		System.out.println(estado); 	
		return true;
	}
/*	
	public static long guardarUsuario(Usuario usuario){
		System.out.print("Guardar Usuario: " + usuario.getNombre());
		ofy().save().entity(usuario).now().getId();
		System.out.println(" OK"); 	
		return usuario.getId();
	}
*/	
	public static ArrayList<Usuario> getUsuarios() {
		ArrayList<Usuario> usuarios = new ArrayList<Usuario>();
		Iterable<Usuario> usuariosDS = new ArrayList<Usuario>() ;
		try {
			usuariosDS = ofy().load().type(Usuario.class).list();
		} 
		catch(NotFoundException ex) {
			System.out.println("No hay ningun usuario cargado");
			return null;
		}
		
		for (Usuario unUsuario:usuariosDS) 
			usuarios.add(unUsuario);
		return usuarios;
	}
	
	/* Interseccion */
	
	public static Interseccion loadInterseccion(Ubicacion unaUbicacion) {
		Interseccion unaInterseccion;
		System.out.print("Cargar Interseccion: ");
		String estado = "OK";
		try {
			unaInterseccion = ofy().load().type(Interseccion.class).filter("latitud",unaUbicacion.getLatitud()).filter("longitud",unaUbicacion.getLongitud()).first().now();
		} 
		catch(NotFoundException ex) {
			estado = "No existe";
			System.out.println(estado);
			return null;
		}
		System.out.println(estado);
		return unaInterseccion;
	}	
	
	public static boolean saveInterseccion(Interseccion unaInterseccion) {
		System.out.print("Guardar Interseccion: ");
		String estado = "OK";
		try {
			ofy().save().entity(unaInterseccion).now();
		}
		catch(Exception ex) {
			estado = "Error";
			System.out.println(estado); 	
			return false;
		}
		System.out.println(estado); 	
		return true;
	}
	
	public static boolean deleteInterseccion(Interseccion unaInterseccion) {
		System.out.print("Borrar Interseccion: ");
		String estado = "OK";
		try {
			ofy().delete().entity(unaInterseccion).now();
		}
		catch(Exception ex) {
			estado = "Error";
			System.out.println(estado); 	
			return false;
		}
		System.out.println(estado); 	
		return true;
	}
	
	public static ArrayList<Interseccion> getIntersecciones() {
		ArrayList<Interseccion> intersecciones = new ArrayList<Interseccion>();
		Iterable<Interseccion> interseccionesDS = new ArrayList<Interseccion>() ;
		try {
			interseccionesDS = ofy().load().type(Interseccion.class).list();
		} 
		catch(NotFoundException ex) {
			System.out.println("No hay ninguna interseccion cargada");
			return null;
		}
		for (Interseccion unaInterseccion:interseccionesDS) 
			intersecciones.add(unaInterseccion);
		return intersecciones;
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
}

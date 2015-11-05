package com.utn.frba.rampas.utils;

import static com.googlecode.objectify.ObjectifyService.ofy;

import java.util.ArrayList;

import com.utn.frba.rampas.domain.BarrioBD;
import com.utn.frba.rampas.domain.Rampa;
import com.utn.frba.rampas.domain.Usuario;

public class HandlerDS {

	/* Barrio */
	
	public static String saveBarrio(BarrioBD unBarrio) {
		System.out.print("Guardar Barrio: ");
		try {
			ofy().save().entity(unBarrio).now();
		}
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return ex.getLocalizedMessage();
		}
		System.out.println("OK"); 	
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
	
	public static String deleteBarrios(ArrayList<BarrioBD> barrios) {
		System.out.print("Borrar Barrios: ");
		for (BarrioBD unBarrio:barrios) {
			try {
				ofy().delete().entity(unBarrio).now();
			}
			catch(Exception ex) {
				System.out.println(" Error - " + ex.getLocalizedMessage()); 
				return ex.getLocalizedMessage();
			}
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
		if (barriosDS == null) {
			System.out.println("No hay barrios cargados");
			return null;
		}
		else {
			for (BarrioBD unBarrio:barriosDS) {
				barrios.add(unBarrio);
				System.out.print(unBarrio.getId() + " ");	
			}
			System.out.println(" ");
			return barrios;			
		}
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
		if (unBarrio == null) {
			System.out.println("No existe");
			return null;
		}
		else {
			System.out.println("OK");
			return unBarrio;
		}
	}

	/* Rampa */
	
	public static String saveRampa(Rampa unaRampa) {
		System.out.print("Guardar Rampa: ");
		try {
			ofy().save().entity(unaRampa).now();
		}
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return ex.getLocalizedMessage();
		}
		System.out.println("OK"); 	
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

	public static String deleteRampas(ArrayList<Rampa> rampas) {
		System.out.print("Borrar Rampas: ");
		for (Rampa unaRampa:rampas) {
			try {
				ofy().delete().entity(unaRampa).now();
			}
			catch(Exception ex) {
				System.out.println(" Error - " + ex.getLocalizedMessage()); 
				return ex.getLocalizedMessage();
			}
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
		if (rampasDS == null) {
			System.out.println("No hay rampas cargadas");
			return null;
		}
		else {
			for (Rampa unaRampa:rampasDS) {
				rampas.add(unaRampa);
				System.out.print(unaRampa.getId() + " ");	
			}
			System.out.println(" ");
			return rampas;
		}
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
		if (unaRampa == null) {
			System.out.println("No existe");
			return null;
		}
		else {
			System.out.println("OK");
			return unaRampa;
		}
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
		if (rampasBarrio.size() == 0) {
			System.out.println("No hay rampas cargadas en ese barrio");
			return null;
		}
		else {
			System.out.println(" ");
			return rampasBarrio;
		}
	}
	
	public static ArrayList<Rampa> getRampasReportadas() {
		System.out.print("Buscar Rampas reportadas: ");
		ArrayList<Rampa> rampasReportadas = new ArrayList<Rampa>();
		Iterable<Rampa> rampasDS = new ArrayList<Rampa>() ;
		try {
			rampasDS = ofy().load().type(Rampa.class).filter("reportada",true).list();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		if (rampasDS == null) {
			System.out.println("No hay rampas reportadas");
			return null;
		}
		else {
			for (Rampa unaRampa:rampasDS) {
				rampasReportadas.add(unaRampa);
				System.out.print(unaRampa.getId() + " ");	
			}
			System.out.println(" ");
			return rampasReportadas;
		}
	}
	
	public static ArrayList<Rampa> getRampasByRuta(double latmin,double lngmin,double latmax,double lngmax) {
		System.out.print("Buscar Rampas por Ruta: ");
		ArrayList<Rampa> rampasRuta = new ArrayList<Rampa>();
		Iterable<Rampa> rampasLatitud = new ArrayList<Rampa>();
		try {
			rampasLatitud = ofy().load().type(Rampa.class).filter("latitud >=",latmin).filter("latitud <=",latmax).list();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		for (Rampa unaRampa:rampasLatitud) {
			if (unaRampa.getLongitud() >= lngmin && unaRampa.getLongitud() <= lngmax) {
				rampasRuta.add(unaRampa);
				System.out.print(unaRampa.getId() + " ");
			}
		}
		if (rampasRuta.size() == 0) {
			System.out.println("No hay rampas cargadas en esa ruta");
			return null;
		}
		else {
			System.out.println(" ");
			return rampasRuta;
		}
	}
		
	/* Usuario */
	
	public static String saveUsuario(Usuario unUsuario) {
		System.out.print("Guardar Usuario: ");
		try {
			ofy().save().entity(unUsuario).now();
		}
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return ex.getLocalizedMessage();
		}
		System.out.println("OK"); 	
		return "OK";
	}
	
	public static String saveUsuarios(ArrayList<Usuario> usuarios) {
		System.out.print("Guardar Usuarios: ");
		for (Usuario unUsuario:usuarios) {
			try {
				ofy().save().entity(unUsuario).now();
			}
			catch(Exception ex) {
				System.out.println("Error - " + ex.getLocalizedMessage()); 
				return ex.getLocalizedMessage();
			}
		}
		System.out.println("OK"); 	
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

	public static String deleteUsuarios(ArrayList<Usuario> usuarios) {
		System.out.print("Borrar Usuarios: ");
		for (Usuario unUsuario:usuarios) {
			try {
				ofy().delete().entity(unUsuario).now();
			}
			catch(Exception ex) {
				System.out.println(" Error - " + ex.getLocalizedMessage()); 
				return ex.getLocalizedMessage();
			}
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
		if (usuariosDS == null) {
			System.out.println("No hay usuarios cargados");
			return null;
		}
		else {
			for (Usuario unUsuario:usuariosDS) {
				usuarios.add(unUsuario);
				System.out.print(unUsuario.getId() + " ");	
			}
			System.out.println(" ");		
			return usuarios;
		}
	}

	public static Usuario getUsuarioById(Long id) {
		System.out.print("Buscar Usuario por Id: ");
		Usuario unUsuario;
		try {
		  unUsuario = ofy().load().type(Usuario.class).id(id).now();
		} 
		catch(Exception ex) {
			System.out.println("Error - " + ex.getLocalizedMessage()); 
			return null;
		}
		if (unUsuario == null) {
			System.out.println("No existe");
			return null;
		}
		else {
			System.out.println("OK");
			return unUsuario;
		}
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
		if (unUsuario == null) {
			System.out.println("No existe");
			return null;
		}
		else {
			System.out.println("OK");
			return unUsuario;
		}
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
		if (unUsuario == null) {
			System.out.println("No existe");
			return null;
		}
		else {
			System.out.println("OK");
			return unUsuario;
		}
	}
	
}	
	

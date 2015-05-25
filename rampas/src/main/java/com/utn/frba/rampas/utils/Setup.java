package com.utn.frba.rampas.utils;

import java.util.ArrayList;

import com.googlecode.objectify.ObjectifyService;

import com.utn.frba.rampas.domain.Interseccion;
import com.utn.frba.rampas.domain.Usuario;

public class Setup {

	private static boolean isSet =false;
	static ArrayList<Usuario> usuarios;
	static ArrayList<Interseccion> intersecciones;
	
	public static void setup() {
		if(isSet == false) {
    	
			ObjectifyService.register(Usuario.class);
			
    		usuarios = new ArrayList<Usuario>();
			usuarios.add(new Usuario(1,"Federico","Diaz","fedee_vpc@hotmail.com","federico"));
			usuarios.add(new Usuario(2,"Matias","Dionisi","matiasdionisi22@hotmail.com","matias"));
			usuarios.add(new Usuario(3,"Lucas","Lencinas","lllencinas@gmail.com","lucas"));
			usuarios.add(new Usuario(4,"Daniel","Ordoñez","danivelez21@hotmail.com","daniel"));
			usuarios.add(new Usuario(5,"Martin","Soifer","marsoifer.91@gmail.com","martin"));
			
			for(Usuario usuario: usuarios) {
				HandlerDS.saveUsuario(usuario);
			}

	    	ObjectifyService.register(Interseccion.class);
				
	    	intersecciones = new ArrayList<Interseccion>();
			//Medrano y Cordoba
			intersecciones.add(new Interseccion(1,-34.59777071095415,-58.42014310000002,true,true,true));
			//Medrano y Tucuman
			intersecciones.add(new Interseccion(2,-34.59816741095431,-58.42018889999997,true,false,true));
			//Medrano y Lavalle
			intersecciones.add(new Interseccion(3,-34.59896381095469,-58.420347900000024,false,false,false));
			//Medrano y Rocamora
			intersecciones.add(new Interseccion(4,-34.59950261095487,-58.420448299999975,true,true,true));
			//Medrano y Rauch
			intersecciones.add(new Interseccion(5,-34.60001371095508,-58.42052460000002));
			//Medrano y Guardia Vieja
			intersecciones.add(new Interseccion(6,-34.600685110955375,-58.42059330000001));
			//Medrano y Humahuaca
			intersecciones.add(new Interseccion(7,-34.60191351095585,-58.4207993));
			//Medrano y Corrientes
			intersecciones.add(new Interseccion(8,-34.60316471095638,-58.420967099999984));
				
			for(Interseccion unaInterseccion: intersecciones){
				HandlerDS.saveInterseccion(unaInterseccion);
			}
			
			isSet = true;
		}
	}
	
}

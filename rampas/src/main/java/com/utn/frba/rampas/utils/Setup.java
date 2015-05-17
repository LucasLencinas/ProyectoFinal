package com.utn.frba.rampas.utils;

import java.util.ArrayList;

import com.googlecode.objectify.ObjectifyService;
import com.utn.frba.rampas.domain.Usuario;
import com.utn.frba.rampas.domain.Interseccion;

public class Setup {

	private static boolean isSet =false;
	static ArrayList<Usuario> usuarios;
	static ArrayList<Interseccion> intersecciones;
	
	public static void setup(){
		if(isSet == false){
    	ObjectifyService.register(Usuario.class);
			usuarios = new ArrayList<Usuario>();
			usuarios.add(new Usuario(1,"Leonardo"));
			usuarios.add(new Usuario(2,"Fede"));
			usuarios.add(new Usuario(3,"Mati"));
			usuarios.add(new Usuario(4,"Dani"));
			usuarios.add(new Usuario(5,"Martin"));
			
			for(Usuario usuario: usuarios){
				HandlerDS.guardarUsuario(usuario);
			}

	    	ObjectifyService.register(Interseccion.class);
				intersecciones = new ArrayList<Interseccion>();
				intersecciones.add(new Interseccion(1,"Medrano","Cordoba",-34.59777071095415,-58.42014310000002,true,true,true));
				intersecciones.add(new Interseccion(2,"Medrano","Tucuman",-34.59816741095431,-58.42018889999997,true,false,true));
				intersecciones.add(new Interseccion(3,"Medrano","Lavalle",-34.59896381095469,-58.420347900000024,false,false,false));
				intersecciones.add(new Interseccion(4,"Medrano","Rocamora",-34.59950261095487,-58.420448299999975,true,true,true));
				intersecciones.add(new Interseccion(5,"Medrano","Rauch",-34.60001371095508,-58.42052460000002,true,false,true));
				intersecciones.add(new Interseccion(6,"Medrano","Guardia Vieja",-34.600685110955375,-58.42059330000001,false,false,false));
				intersecciones.add(new Interseccion(7,"Medrano","Humahuaca",-34.60191351095585,-58.4207993,true,true,true));
				intersecciones.add(new Interseccion(8,"Medrano","Corrientes",-34.60316471095638,-58.420967099999984,true,false,true));
				
			for(Interseccion interseccion: intersecciones){
				HandlerDS.guardarInterseccion(interseccion);
			}
			
			isSet = true;
		}
	}
	
	public static ArrayList<Usuario> getUsuarios(){
		return HandlerDS.getUsuarios();
	}

	public static ArrayList<Interseccion> getIntersecciones(){
		return HandlerDS.getIntersecciones();
	}	
	
}

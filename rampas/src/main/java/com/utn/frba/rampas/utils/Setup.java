package com.utn.frba.rampas.utils;


import java.util.ArrayList;

import com.googlecode.objectify.ObjectifyService;
import com.utn.frba.rampas.domain.Usuario;

public class Setup {

	private static boolean isSet =false;
	static ArrayList<Usuario> usuarios;
	
	public static void setup(){
		if(isSet == false){
    	ObjectifyService.register(Usuario.class);
			usuarios = new ArrayList<Usuario>();
			usuarios.add(new Usuario(1,"Lucas"));
			usuarios.add(new Usuario(2,"Fede"));
			usuarios.add(new Usuario(3,"Mati"));
			usuarios.add(new Usuario(4,"Dani"));
			usuarios.add(new Usuario(5,"Martin"));
			
			for(Usuario usuario: usuarios){
				HandlerDS.guardarUsuario(usuario);
			}
			
			isSet = true;
		}
	}
	
	public static ArrayList<Usuario> getUsuarios(){
		//return usuarios;
		return HandlerDS.getUsuarios();
	}
    
   
}

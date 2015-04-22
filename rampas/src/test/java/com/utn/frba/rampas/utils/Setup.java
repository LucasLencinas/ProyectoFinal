package com.utn.frba.rampas.utils;


import java.util.ArrayList;
import com.utn.frba.rampas.domain.Usuario;

public class Setup {

	private static boolean isSet =false;
	static ArrayList<Usuario> usuarios;
	
	public static void setup(){
		if(isSet == false){
			usuarios = new ArrayList<Usuario>();
			usuarios.add(new Usuario("Lucas"));
			usuarios.add(new Usuario("Fede"));
			usuarios.add(new Usuario("Mati"));
			usuarios.add(new Usuario("Dani"));
			usuarios.add(new Usuario("Martin"));
			isSet = true;
		}
	}
	
	public static ArrayList<Usuario> getUsuarios(){
		return usuarios;
	}
    
   
}

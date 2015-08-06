package com.utn.frba.rampas.domain;

import java.util.ArrayList;
import com.google.gson.annotations.Expose;

public class ListadoIntersecciones {

	
	@Expose private ArrayList<Barrio> barrios;
	/* Es necesario este constructor para que funcione el GSON */
	public ListadoIntersecciones() {
		// TODO Auto-generated constructor stub
	};
	
	public ArrayList<Barrio> getBarrios(){
		return barrios;
	}

	
}

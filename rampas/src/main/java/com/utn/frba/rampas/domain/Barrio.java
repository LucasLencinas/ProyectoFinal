package com.utn.frba.rampas.domain;

import java.util.ArrayList;

import com.google.gson.annotations.Expose;

public class Barrio {

	/**
	 * var barrios = [
	{
	"nombre": "COGHLAN",
		"poligono": {
			"type":"MultiPolygon",
			"coordinates":
				"[[[[-58.47242,-34.5661],[-58.47296,-34.56642],[-58.47299,-34.56644],[-58.47242,-34.5661]]]]"
		},
		"calles":
		[{"coordenadas":[-34.5977376702305, -58.4217776331198], 
			"tieneInformacion": false, 
			"tieneRampa": false, 
			"buenEstado": false, 
			"crucesAccesibles": false, 
			"reportada": false}]
	},
	{},
	]
	 * **/
	
	@Expose private String nombre;
	@Expose private Poligono poligono;
	@Expose private ArrayList<Punto> calles;

	/* Es necesario este constructor para que funcione el GSON */
	public Barrio() {	} 
	
	public String getNombre(){
		return nombre;
	}
	
	public Poligono getPoligono(){
		return poligono;
	}
	
	public ArrayList<Punto> getCalles(){
		return calles;
	}
	
}

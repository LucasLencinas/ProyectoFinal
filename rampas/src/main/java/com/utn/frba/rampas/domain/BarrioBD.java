package com.utn.frba.rampas.domain;

import java.io.Serializable;

import com.google.gson.annotations.Expose;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class BarrioBD implements Serializable {

//	Ejemplo	
//	nombre: "Almagro"
// 	limites: "[[[[-58.47242,-34.5661],[-58.47296,-34.56642],[-58.47299,-34.56644],[-58.47242,-34.5661]]]]"

	@Expose @Id private Long id;
	@Expose @Index private String nombre;
	@Expose private String limites;	

	/* Es necesario este constructor para que funcione el GSON */
	public BarrioBD() { }
	
	public BarrioBD(String nombre,String limites) {
		setNombre(nombre);
		setLimites(limites);
	}

	public long getId() {
		return id;
	}

	public String getNombre() {
		return nombre;
	}
	
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public String getLimites() {
		return limites;
	}
	
	public void setLimites(String limites) {
		this.limites = limites;
	}

}

package com.utn.frba.rampas.domain;

import java.io.Serializable;

import com.google.gson.annotations.Expose;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
public class Usuario implements Serializable {
	
	
	@Expose @Id private long id;
	
	@Expose private String nombre;

	
	public Usuario(String unNombre){
		setNombre(unNombre);		
	}

	public Usuario(){	} /*Es necesario este constructor para que funcione el GSON*/
	
	public Usuario(long unId, String unNombre) {
		setNombre(unNombre);		
		setId(unId);		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
  @Override
  public String toString(){
  	return "Usuario: " + nombre;
  }
	
}

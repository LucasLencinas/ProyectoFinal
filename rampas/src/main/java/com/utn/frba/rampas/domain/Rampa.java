package com.utn.frba.rampas.domain;

import java.io.Serializable;

import com.google.gson.annotations.Expose;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@SuppressWarnings("serial")
@Entity
public class Rampa implements Serializable {
	
	@Expose @Id private long id;
	/* El par de coordenadas usado por GoogleMaps es (lat;lng) */
	@Expose @Index private double lat; 
	@Expose @Index private double lng; 
	@Expose private boolean esInterseccion;
	@Expose private boolean buenEstado;
	@Expose private boolean todosCrucesAccesibles;
	
	/* Es necesario este constructor para que funcione el GSON */
	public Rampa () { }
	
	public Rampa(long unId, double latitud, double longitud) {
		setId(unId);
		setLat(latitud);
		setLng(longitud);
		setEsInterseccion(false);
		setBuenEstado(false);
		setTodosCrucesAccesibles(false);				
	}
	
	public Rampa(long unId, double latitud, double longitud, boolean esInterseccion, boolean buenEstado, boolean todosCrucesAccesibles) {
		setId(unId);
		setLat(latitud);
		setLng(longitud);
		setEsInterseccion(esInterseccion);
		setBuenEstado(buenEstado);
		setTodosCrucesAccesibles(todosCrucesAccesibles);			
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public double getLat() {
		return lat;
	}
	
	public void setLat(double latitud) {
		this.lat = latitud;
	}

	public double getLng() {
		return lng;
	}
	
	public void setLng(double longitud) {
		this.lng = longitud;
	}	

	
	public boolean getEsInterseccion() {
		return esInterseccion;
	}
	
	public void setEsInterseccion(boolean esInterseccion) {
		this.esInterseccion = esInterseccion;
	}

	public boolean getBuenEstado() {
		return buenEstado;
	}
	
	public void setBuenEstado(boolean buenEstado) {
		this.buenEstado = buenEstado;
	}

	public boolean getTodosCrucesAccesibles() {
		return todosCrucesAccesibles;
	}
	
	public void setTodosCrucesAccesibles(boolean todosCrucesAccesibles) {
		this.todosCrucesAccesibles = todosCrucesAccesibles;
	}
	
}


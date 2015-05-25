package com.utn.frba.rampas.domain;

import java.io.Serializable;

import com.google.gson.annotations.Expose;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Interseccion implements Serializable {
	
	@Expose @Id private long id;
	/* El par de coordenadas usado por GoogleMaps es (latitud;longitud) */
	@Expose @Index private double latitud; 
	@Expose @Index private double longitud; 
	@Expose private boolean tieneInformacion;
	@Expose private boolean tieneRampas;
	@Expose private boolean buenEstado;
	@Expose private boolean todosCrucesAccesibles;
	
	/* Es necesario este constructor para que funcione el GSON */
	public Interseccion () { }
	
	public Interseccion(long unId, double latitud, double longitud) {
		setId(unId);
		setLatitud(latitud);
		setLongitud(longitud);
		setTieneInformacion(false);
		setTieneRampas(false);
		setBuenEstado(false);
		setTodosCrucesAccesibles(false);				
	}
	
	public Interseccion(long unId, double latitud, double longitud, boolean tieneRampas, boolean buenEstado, boolean todosCrucesAccesibles) {
		setId(unId);
		setLatitud(latitud);
		setLongitud(longitud);
		setTieneInformacion(true);
		setTieneRampas(tieneRampas);
		setBuenEstado(buenEstado);
		setTodosCrucesAccesibles(todosCrucesAccesibles);			
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public double getLatitud() {
		return latitud;
	}
	
	public void setLatitud(double latitud) {
		this.latitud = latitud;
	}

	public double getLongitud() {
		return longitud;
	}
	
	public void setLongitud(double longitud) {
		this.longitud = longitud;
	}	

	public boolean getTieneInformacion() {
		return tieneRampas;
	}
	
	public void setTieneInformacion(boolean tieneRampas) {
		this.tieneRampas = tieneRampas;
	}	
	
	public boolean getTieneRampas() {
		return tieneRampas;
	}
	
	public void setTieneRampas(boolean tieneRampas) {
		this.tieneRampas = tieneRampas;
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


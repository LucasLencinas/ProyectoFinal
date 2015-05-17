package com.utn.frba.rampas.domain;

import java.io.Serializable;

import com.google.gson.annotations.Expose;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
@SuppressWarnings("serial")
public class Interseccion implements Serializable {
	
	@Expose @Id private long id;
	@Expose private String calle1;
	@Expose private String calle2;	
	/* El par de coordenadas usado por GoogleMaps es (latitud;longitud)*/
	@Expose private double latitud; 
	@Expose private double longitud; 
	@Expose private boolean tieneRampas;
	@Expose private boolean buenEstado;
	@Expose private boolean todosCrucesAccesibles;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getCalle1() {
		return calle1;
	}

	public void setCalle1(String calle1) {
		this.calle1 = calle1;
	}
	
	public String getCalle2() {
		return calle2;
	}
	
	public void setCalle2(String calle2) {
		this.calle2 = calle2;
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
	
	public Interseccion(long unId, String calle1, String calle2, double latitud, double longitud, boolean tieneRampas, boolean buenEstado, boolean todosCrucesAccesibles) {
		setId(unId);
		setCalle1(calle1);		
		setCalle2(calle2);
		setLatitud(latitud);
		setLongitud(longitud);
		setTieneRampas(tieneRampas);
		setBuenEstado(buenEstado);
		setTodosCrucesAccesibles(todosCrucesAccesibles);
	}

}


package com.utn.frba.rampas.domain;

import java.io.Serializable;

import com.google.gson.annotations.Expose;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Rampa implements Serializable {
	
	@Expose @Id private long id;
	/* El par de coordenadas usado por GoogleMaps es (latitud;longitud) */
	@Expose @Index private double latitud; 
	@Expose @Index private double longitud;
	@Expose @Index private String barrio;
	@Expose private boolean tieneInformacion;
	@Expose private boolean tieneRampas;
	@Expose private boolean buenEstado;
	@Expose private boolean todosCrucesAccesibles;
	@Expose private boolean reportada;
	
	/* Es necesario este constructor para que funcione el GSON */
	public Rampa () { }
	
	public Rampa(long unId, double latitud, double longitud, String barrio, boolean tieneInformacion, boolean tieneRampas, boolean buenEstado, boolean todosCrucesAccesibles, boolean reportada) {
		setId(unId);
		setLatitud(latitud);
		setLongitud(longitud);
		setBarrio(barrio);
		setTieneInformacion(tieneInformacion);
		setTieneRampas(tieneRampas);
		setBuenEstado(buenEstado);
		setTodosCrucesAccesibles(todosCrucesAccesibles);
		setReportada(reportada);
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

	public String getBarrio() {
		return barrio;
	}
	
	public void setBarrio(String barrio) {
		this.barrio = barrio;
	}
	
	public boolean getTieneInformacion() {
		return tieneInformacion;
	}
	
	public void setTieneInformacion(boolean tieneInformacion) {
		this.tieneInformacion = tieneInformacion;
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

	public boolean getReportada() {
		return reportada;
	}
	
	public void setReportada(boolean reportada) {
		this.reportada = reportada;
	}	
	
	public boolean esRoja() {
		if ((getTieneInformacion() && getTieneRampas() && !getTodosCrucesAccesibles() && !getBuenEstado() && !getReportada()) ||
			(getTieneInformacion() && !getTieneRampas()) ||
			!getTieneInformacion() || 
			 getReportada()) {
			return true;
		}
		return false;
	}
	
	public boolean esNaranja() {
		if (getTieneInformacion() &&
			getTieneRampas() &&
			getTodosCrucesAccesibles() &&
		   !getBuenEstado() &&
		   !getReportada()) {
			return true;
		}
		return false;
	}
	
	public boolean esAmarilla() {
		if (getTieneInformacion() &&
			getTieneRampas() &&
		   !getTodosCrucesAccesibles() &&
			getBuenEstado() &&
		   !getReportada()) {
			return true;
		}
		return false;
	}
	
	public boolean esVerde() {
		if (getTieneInformacion() &&
			getTieneRampas() &&
			getTodosCrucesAccesibles() &&
			getBuenEstado() &&
		   !getReportada()) {
			return true;
		}
		return false;
	}
	
}


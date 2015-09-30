package com.utn.frba.rampas.domain;

import java.io.Serializable;

import com.google.gson.annotations.Expose;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Rampa implements Serializable {
	
	@Expose @Id private Long id;
	/* El par de coordenadas usado por GoogleMaps es (latitud;longitud) */
	@Expose @Index private double latitud; 
	@Expose @Index private double longitud;
	@Expose @Index private String barrio;
	@Expose private boolean tieneInformacion;
	@Expose private boolean tieneRampas;
	@Expose private boolean buenEstado;
	@Expose private boolean crucesAccesibles;
	@Expose private boolean reportada;
	@Expose private String reportes;
	
	/* Es necesario este constructor para que funcione el GSON */
	public Rampa () { }
	
	public Rampa(double latitud, double longitud, String barrio, boolean tieneInformacion, boolean tieneRampas, boolean buenEstado, boolean crucesAccesibles, boolean reportada, String reportes) {
		setLatitud(latitud);
		setLongitud(longitud);
		setBarrio(barrio);
		setTieneInformacion(tieneInformacion);
		setTieneRampas(tieneRampas);
		setBuenEstado(buenEstado);
		setCrucesAccesibles(crucesAccesibles);
		setReportada(reportada);
		setReportes(reportes);
	}
	
	public Rampa(Long id, double latitud, double longitud, String barrio, boolean tieneInformacion, boolean tieneRampas, boolean buenEstado, boolean crucesAccesibles, boolean reportada, String reportes) {
		setId(id);
		setLatitud(latitud);
		setLongitud(longitud);
		setBarrio(barrio);
		setTieneInformacion(tieneInformacion);
		setTieneRampas(tieneRampas);
		setBuenEstado(buenEstado);
		setCrucesAccesibles(crucesAccesibles);
		setReportada(reportada);
		setReportes(reportes);
	}	
	
	public long getId() {
		return id;
	}

	public void setId(Long id) {
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

	public boolean getCrucesAccesibles() {
		return crucesAccesibles;
	}
	
	public void setCrucesAccesibles(boolean crucesAccesibles) {
		this.crucesAccesibles = crucesAccesibles;
	}

	public boolean getReportada() {
		return reportada;
	}
	
	public void setReportada(boolean reportada) {
		this.reportada = reportada;
	}	
	
	public String getReportes() {
		return reportes;
	}
	
	public void setReportes(String reportes) {
		this.reportes = reportes;
	}
	
	public boolean esRoja() {
		if ((getTieneInformacion() && getTieneRampas() && !getCrucesAccesibles() && !getBuenEstado() && !getReportada()) ||
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
			getCrucesAccesibles() &&
		   !getBuenEstado() &&
		   !getReportada()) {
			return true;
		}
		return false;
	}
	
	public boolean esAmarilla() {
		if (getTieneInformacion() &&
			getTieneRampas() &&
		   !getCrucesAccesibles() &&
			getBuenEstado() &&
		   !getReportada()) {
			return true;
		}
		return false;
	}
	
	public boolean esVerde() {
		if (getTieneInformacion() &&
			getTieneRampas() &&
			getCrucesAccesibles() &&
			getBuenEstado() &&
		   !getReportada()) {
			return true;
		}
		return false;
	}
	
	public boolean estaReportada() {
		return getReportada();
	}
	
}


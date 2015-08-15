package com.utn.frba.rampas.domain;

import java.util.ArrayList;
import com.google.gson.annotations.Expose;

public class Punto {
/**
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
	@Expose private ArrayList<Double> coordenadas;
	@Expose private boolean tieneInformacion;
	@Expose private boolean tienetieneRampa;
	@Expose private boolean buenEstado;
	@Expose private boolean crucesAccesibles;
	@Expose private boolean reportada;
	
	public Punto(){}
	
	public ArrayList<Double> getCoordenadas(){
		return coordenadas;
	}
	
	public boolean getTieneInformacion(){
		return tieneInformacion;
	}
	public boolean getTieneRampa(){
		return tienetieneRampa;
	}
	public boolean getBuenEstado(){
		return buenEstado;
	}
	public boolean getCrucesAccesibles(){
		return crucesAccesibles;
	}
	public boolean getReportada(){
		return reportada;
	}
	
	
	
	
	
	
}

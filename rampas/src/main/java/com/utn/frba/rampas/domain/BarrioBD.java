package com.utn.frba.rampas.domain;

import java.io.Serializable;
import java.util.ArrayList;

import com.google.gson.annotations.Expose;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class BarrioBD implements Serializable {

//	Ejemplo	
//	nombre: "Almagro"
// 	limites: "[[[[-58.47242,-34.5661],[-58.47296,-34.56642],[-58.47299,-34.56644],[-58.47242,-34.5661]]]]"

	@Expose @Id private long id;
	@Expose @Index private String nombre;
	@Expose private String limites;	

	/* Es necesario este constructor para que funcione el GSON */
	public BarrioBD() { }
	
	public BarrioBD(long id,String nombre,String limites) {
		setId(id);
		setNombre(nombre);
		setLimites(limites);
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
	
	public String getLimites() {
		return limites;
	}
	
	public void setLimites(String limites) {
		this.limites = limites;
	}
	
	public ArrayList<Double> getCoordenadas() {
		ArrayList<Double> limitesDouble = new ArrayList<Double>();
		String limitesSinCorchetes = getLimites().substring(4,getLimites().length()-4);
		String[] limitesComoArray = limitesSinCorchetes.split("\\],\\[");
		String[] aux;
		for (int i = 0; i < limitesComoArray.length; i++) {
			aux = limitesComoArray[i].split(",");
			limitesDouble.add(Double.parseDouble(aux[0]));
			limitesDouble.add(Double.parseDouble(aux[1]));
		}
		return limitesDouble;
	}
	
	public boolean contiene(Rampa unaRampa) {
		ArrayList<Double> coordenadas = new ArrayList<Double>();
		coordenadas = getCoordenadas();
		ArrayList<Point> puntos = new ArrayList<Point>();
		for (int i = 0; i < coordenadas.size(); i += 2) {
			puntos.add(new Point(coordenadas.get(i),coordenadas.get(i+1)));
		}
		Polygon poligono = Polygon.Builder().addVertexes(puntos).build();
		if (poligono.contains(new Point(unaRampa.getLatitud(),unaRampa.getLongitud()))) {
			return true;
		}	
		else {
			return false;
		}
	}
	
}

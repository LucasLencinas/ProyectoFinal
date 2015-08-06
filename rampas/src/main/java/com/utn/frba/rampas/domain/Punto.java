package com.utn.frba.rampas.domain;

import java.util.ArrayList;
import com.google.gson.annotations.Expose;

public class Punto {
/**
	"calles":
		[{"coordenadas":[-34.5535366295266, -58.47358614652592]},{"coordenadas":[-34.5544263051994, -58.47517607932252]}]
	},
	{},
	]
	 * **/
	@Expose private ArrayList<Double> coordenadas;
	
	public Punto(){}
	
	public ArrayList<Double> getCoordenadas(){
		return coordenadas;
	}
}

package com.utn.frba.rampas.endpoints;

import java.util.ArrayList;
import java.util.Arrays;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.utn.frba.rampas.domain.Barrio;
import com.utn.frba.rampas.domain.BarrioBD;
import com.utn.frba.rampas.domain.Punto;
import com.utn.frba.rampas.domain.Rampa;
import com.utn.frba.rampas.utils.HandlerDS;
import com.utn.frba.rampas.utils.Setup;

@Path("/Barrios")
public class BarriosBD {

	@POST
	@Consumes("application/json")
	public Response saveBarrio(String barrio_json) {
		Gson parser = new Gson();
		Barrio unBarrio = parser.fromJson(barrio_json,Barrio.class);
		BarrioBD barrioBD;
		Punto punto;
		Rampa rampa;
		 
		barrioBD = new BarrioBD(unBarrio.getNombre(), unBarrio.getPoligono().getCoordinates());
		String estado = HandlerDS.saveBarrio(barrioBD);
		if (estado == "OK") {
			for(int j = 0; j < unBarrio.getCalles().size(); j++){
				punto = unBarrio.getCalles().get(j);
				rampa = new Rampa(punto.getCoordenadas().get(0), 
						          punto.getCoordenadas().get(1), 
						          unBarrio.getNombre(), 
						          punto.getTieneInformacion(), 
						          punto.getTieneRampa(),
						          punto.getBuenEstado(),
						          punto.getCrucesAccesibles(),
						          punto.getReportada(),
						          "Nueva");
				estado = HandlerDS.saveRampa(rampa);
				if (estado != "OK") {
					return Response.serverError().entity("Agregar Rampa: Error - " + estado).build();
				}
			}
			return Response.status(Response.Status.OK).build();
		} 
		else {
			return Response.serverError().entity("Agregar Barrio: Error - " + estado).build();
		}
	}
	
	@GET 
	@Path("/barrios")
	@Produces("application/json")
	public Response loadBarrios() {
		ArrayList<BarrioBD> barrios = HandlerDS.getBarrios();
		if (barrios == null || barrios.size() == 0) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(barrios),MediaType.APPLICATION_JSON).build();		
		}
	}
	
	@GET 
	@Path("/barrios/{barrio}")
	@Produces("application/json")
	public Response loadBarrioByNombre(@PathParam("barrio") String nombre) {
		BarrioBD unBarrio = HandlerDS.getBarrioByNombre(nombre);
		if (unBarrio == null) {
			return Response.status(Response.Status.NOT_FOUND).build();		
		}
		else {
			return Response.ok(new Gson().toJson(unBarrio),MediaType.APPLICATION_JSON).build();		
		}
	}

	@DELETE
	@Path("/{barrio}")
	@Produces("application/json")
	public Response deleteBarrioByNombre(@PathParam("barrio") String nombre) {
		BarrioBD unBarrio = HandlerDS.getBarrioByNombre(nombre);
		String estado = HandlerDS.deleteBarrio(unBarrio);
		if (estado == "OK") {
			ArrayList<Rampa> rampasBarrio = HandlerDS.getRampasByBarrio(nombre);
			if (rampasBarrio == null){
				return Response.status(Response.Status.OK).build();
			}
			else {
				estado = HandlerDS.deleteRampas(rampasBarrio);
				if (estado == "OK") {
					return Response.status(Response.Status.OK).build();
				} 
				else {
					return Response.serverError().entity("Eliminar Rampas: Error - " + estado).build();
				}			
			}
		}
		else {
			return Response.serverError().entity("Eliminar Barrio: Error - " + estado).build();
		}
	}
}

package com.utn.frba.rampas.endpoints;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;
import com.utn.frba.rampas.utils.Setup;



@Path("/usuarios")
public class Usuarios {
	
	@GET 
  @Produces("application/json")
  public Response index(){
		Setup.setup();
		String usuariosJson = new Gson().toJson(Setup.getUsuarios());
    return Response.ok(usuariosJson,MediaType.APPLICATION_JSON).build();
  }

    
   
}

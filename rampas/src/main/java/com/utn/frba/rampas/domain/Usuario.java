package com.utn.frba.rampas.domain;

import java.io.Serializable;

import com.google.gson.annotations.Expose;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
public class Usuario implements Serializable {
	
	@Expose @Id private long id;
	@Expose private String nombre;
	@Expose private String apellido;
	@Expose private String mail;
	@Expose private String contraseña;
	@Expose private String facebook;
	@Expose private boolean usuarioPropio;

	/* Es necesario este constructor para que funcione el GSON */
	public Usuario() {	} 
	
	public Usuario(long id, String nombre, String apellido, String mail, String contraseña) {
		setId(id);	
		setNombre(nombre);		
		setApellido(apellido);
		setMail(mail);
		setContraseña(contraseña);
		setUsuarioPropio(true);
	}

	public Usuario(long id, String facebook) {
		setId(id);	
		setFacebook(facebook);		
		setUsuarioPropio(false);
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
	
	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}
	
	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}
	
	public String getContraseña() {
		return contraseña;
	}

	public void setContraseña(String contraseña) {
		this.contraseña = contraseña;
	}
	
	public String getFacebook() {
		return facebook;
	}

	public void setFacebook(String facebook) {
		this.facebook = facebook;
	}

	public boolean getUsuarioPropio() {
		return usuarioPropio;
	}

	public void setUsuarioPropio(boolean usuarioPropio) {
		this.usuarioPropio = usuarioPropio;
	}
	
}

package com.utn.frba.rampas.domain;

import java.io.Serializable;

import com.google.gson.annotations.Expose;

import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
public class Usuario implements Serializable {
	
	@Expose @Id private Long id;
	@Expose private String nombre;
	@Expose private String apellido;
	@Expose @Index private String mail;
	@Expose private String contraseña;
	@Expose @Index private String facebook;
	@Expose private boolean administrador;

	/* Es necesario este constructor para que funcione el GSON */
	public Usuario() {	} 
	
	public Usuario(String nombre, String apellido, String mail, String contraseña, boolean administrador) {
		setNombre(nombre);		
		setApellido(apellido);
		setMail(mail);
		setContraseña(contraseña);
		setAdministrador(administrador);
	}

	public Usuario(Long id, String nombre, String apellido, String mail, String contraseña,boolean administrador) {
		setId(id);
		setNombre(nombre);		
		setApellido(apellido);
		setMail(mail);
		setContraseña(contraseña);
		setAdministrador(administrador);
	}
	
	public Usuario(String nombre, String apellido, String facebook, boolean administrador) {
		setNombre(nombre);
		setApellido(apellido);
		setFacebook(facebook);		
		setAdministrador(administrador);
	}

	public Usuario(Long id, String nombre, String apellido, String facebook, boolean administrador) {
		setId(id);
		setNombre(nombre);
		setApellido(apellido);
		setFacebook(facebook);		
		setAdministrador(administrador);
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(Long id) {
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

	public boolean getAdministrador() {
		return administrador;
	}

	public void setAdministrador(boolean administrador) {
		this.administrador = administrador;
	}
	
}

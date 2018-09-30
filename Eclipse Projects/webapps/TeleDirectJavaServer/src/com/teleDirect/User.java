package com.teleDirect;

/**
 * This class represents the 'user' entity and contains their username, name and priveleges.
 * @author AG041955
 *
 */
public class User {
	private String username;
	private String name;
	private String priveleges;
	
	public User(String username, String name, String priveleges) {
		this.username = username;
		this.name = name;
		this.priveleges = priveleges;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPriveleges() {
		return priveleges;
	}
	public void setPriveleges(String priveleges) {
		this.priveleges = priveleges;
	}
	
}

package com.test.teleDirect;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.teleDirect.User;

public class TestUser {

	private User user;
	private String username;
	private String name;
	private String priveleges;
	
	@Before
    public void setUp() {
		username = "akash";
		name = "Akash";
		priveleges = "rw";
		user = new User(username, name, priveleges);
    }
	
	@Test
	public void shouldBeAbleToGetUsername() {
		assertEquals(username, user.getUsername());
	}

	@Test
	public void shouldBeAbleToGetName() {
		assertEquals(name, user.getName());
	}
	
	@Test
	public void shouldBeAbleToGetPriveleges() {
		assertEquals(priveleges, user.getPriveleges());
	}

	@Test
	public void shouldBeAbleToSetUsername() {
		String username2 = "sagar";
		user.setUsername(username2);
		assertEquals(username2, user.getUsername());
	}
	
	@Test
	public void shouldBeAbleToSetName() {
		String name2 = "Sagar";
		user.setName(name2);
		assertEquals(name2, user.getName());
	}
	
	@Test
	public void shouldBeAbleToSetPriveleges() {
		String priveleges2 = "r";
		user.setPriveleges(priveleges2);
		assertEquals(priveleges2, user.getPriveleges());
	}

}

package com.test.teleDirect;

import static org.junit.Assert.*;

import java.util.UUID;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.teleDirect.Security;
import com.teleDirect.Session;
import com.teleDirect.server.Response;
import com.teleDirect.server.ServerCoordinator;

public class TestSecurity {

	Security security;
	
	@Before
    public void setUp() {
        security = new Security();
    }

    @After
    public void tearDown() {
    	//after execution
    }
    
	@Test
	public void shouldBeAbleToValidateSession() {
		String username = "akash";
		String password = "akash";
		String token = ServerCoordinator.convertParamsToString(UUID.randomUUID().toString());
		Response response;
		
		response = security.validateSession(username, token);
		assertEquals("failure", response.getStatus());
		assertEquals("Session not valid.", response.getMessage());
		
		response = security.login(username, password);
		Session session = (Session) response.getData();
		token = session.getToken();
		response = security.validateSession(username, token);
		assertEquals("success", response.getStatus());
		assertEquals("Sesssion is valid.", response.getMessage());
		
	}
	
	@Test
	public void shouldBeAbleToLogin() {
		Response response;
		String username = "akash";
		String password = "akash";
		
		response = security.login(username, password);
		assertEquals("success", response.getStatus());
		assertEquals("Welcome, " + username, response.getMessage());
		assertEquals(username, ((Session)response.getData()).getUser().getUsername());
		
		username = "akash";
		password = "akassh";
		response = security.login(username, password);
		assertEquals("failure", response.getStatus());
		assertEquals("Wrong username/password", response.getMessage());
		assertNull(response.getData());
	}
	
	@Test
	public void shouldBeAbleToLogout() {
		Response response;
		String username = "akash";
		
		response = security.logout(username);
		assertEquals("success", response.getStatus());
		assertEquals(username + " has logged out successfully.", response.getMessage());
	}

}

package com.test.teleDirect;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.teleDirect.Session;
import com.teleDirect.User;

public class TestSession {

	private User user;
	private Session session;
	private final int STRING_ARRAY_LENGTH = 1000;
	
	@Before
    public void setUp() {
		user = new User("akash", "Akash", "rw");
    }
	
	@Test
	public void shouldBeAbleToStartSession() {
		session = Session.start(user);
		
		assertTrue(session instanceof Session);
		assertEquals(user, session.getUser());
		
	}
	
	@Test
	public void shouldBeAbleToEndSession() {
		session = Session.start(user);
		boolean success = session.end();
		
		assertTrue(success);
		
	}
	
	@Test
	public void shouldBeAbleToGenerateUniqueToken() {

		String tokens[] = new String[STRING_ARRAY_LENGTH];
		for(int i=0; i<tokens.length; i++)
			tokens[i] = Session.generateUniqueToken();
		
		for (int i=0; i<tokens.length-1; i++)
			for(int j=i+1; j<tokens.length; j++)
				assertNotEquals(tokens[i], tokens[j]);
		
	}

}

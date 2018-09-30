package com.test.teleDirect;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.teleDirect.Operation;
import com.teleDirect.server.Request;

public class TestRequest {

	private Request request;
	private String username;
	private String params;
	private Operation operation;
	
	@Before
    public void setUp() {
		username = "akash";
		operation = Operation.FETCH_DETAILS;
		params = "someParams";
		request = new Request(username, operation, params);
    }
	
	@Test
	public void shouldBeAbleToGetUsername() {
		assertEquals(username, request.getUsername());
	}
	
	@Test
	public void shouldBeAbleToSetUsername() {
		assertEquals(username, request.getUsername());
		String username2 = "sagar";
		request.setUsername(username2);
		assertNotEquals(username, request.getUsername());
		assertEquals(username2, request.getUsername());
	}
	
	@Test
	public void shouldBeAbleToGetOperation() {
		assertEquals(operation, request.getOperation());
	}
	
	@Test
	public void shouldBeAbleToSetOperation() {
		assertEquals(operation, request.getOperation());
		Operation operation2 = Operation.FETCH_LIST;
		request.setOperation(operation2);
		assertNotEquals(operation, request.getOperation());
		assertEquals(operation2, request.getOperation());
	}
	
	@Test
	public void shouldBeAbleToGetParams() {
		assertEquals(params, request.getParams());
	}
	
	@Test
	public void shouldBeAbleToSetParams() {
		assertEquals(params, request.getParams());
		String params2 = "someOtherParams";
		request.setParams(params2);
		assertNotEquals(params, request.getParams());
		assertEquals(params2, request.getParams());
	}

}

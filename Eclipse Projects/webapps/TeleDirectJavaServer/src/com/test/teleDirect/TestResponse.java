package com.test.teleDirect;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.teleDirect.server.Response;

public class TestResponse {

	private Response response;
	private String status;
	private String message;
	private Object data;
	
	@Before
    public void setUp() {
		status = "success";
		message = "test Message";
		data = new String("someObject");
		response = new Response(status, message, data);
    }
	
	@Test
	public void shouldBeAbleToGetStatus() {
		assertEquals(status, response.getStatus());
	}
	
	@Test
	public void shouldBeAbleToSetStatus() {
		String status2= "failure";
		response.setStatus(status2);
		assertEquals(status2, response.getStatus());
	}
	
	@Test
	public void shouldBeAbleToGetMessage() {
		assertEquals(message, response.getMessage());
	}
	
	@Test
	public void shouldBeAbleToSetMessage() {
		String message2 = "another test message";
		response.setMessage(message2);
		assertEquals(message2, response.getMessage());
	}
	
	@Test
	public void shouldBeAbleToGetData() {
		assertEquals(data, response.getData());
	}
	
	@Test
	public void shouldBeAbleToSetData() {
		Object data2 = (Object)new String("AnotherObject");
		response.setData(data2);
		assertEquals(data2, response.getData());
	}
}

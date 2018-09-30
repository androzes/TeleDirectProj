package com.test.teleDirect;

import static org.junit.Assert.*;

import org.junit.Test;

import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;
import com.teleDirect.Operation;
import com.teleDirect.server.ServerCoordinator;

public class TestServerCoordinator {

	@Test
	public void testLinkedTreeMapToJsonString() {
		String json, expectedStr; 
		Request req;
		LinkedTreeMap ltm;
		
		json = "{\"username\":\"#system\",\"operation\":\"login\",\"params\":{\"username\":\"akash\",\"password\":\"akash\"}}";
		req = new Gson().fromJson(json, Request.class);
		ltm = (LinkedTreeMap)req.getParams();
		
		expectedStr = "{\"username\":\"akash\", \"password\":\"akash\"}";
		assertEquals(expectedStr, ServerCoordinator.linkedTreeMapToJsonString(ltm));	
	}
	
	@Test
	public void testConvertParamsToString() {
		String json; 
		String expectedStr; 
		
		json = "{\"username\":\"#system\",\"operation\":\"login\",\"params\":{\"username\":\"akash\",\"password\":\"akash\"}}";
		expectedStr = "{\"username\":\"#system\",\"operation\":\"login\",\"params\":\"{\\\"username\\\":\\\"akash\\\",\\\"password\\\":\\\"akash\\\"}\"}"; 
		assertEquals(expectedStr, ServerCoordinator.convertParamsToString(json));
		
		json = "{\"username\":\"akash\",\"operation\":\"fetchList\"}";
		expectedStr = "{\"username\":\"akash\",\"operation\":\"fetchList\"}";
		assertEquals(expectedStr, ServerCoordinator.convertParamsToString(json));
		
	}
	
	public class Request {
		private String username;
		private Operation operation;
		private Object params;
		
		public Request(String username, Operation operation, Object params){
			this.username = username;
			this.operation = operation;
			this.params = params;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public Operation getOperation() {
			return operation;
		}

		public void setOperation(Operation operation) {
			this.operation = operation;
		}

		public Object getParams() {
			return params;
		}

		public void setParams(Object params) {
			this.params = params;
		}
		
	}

}

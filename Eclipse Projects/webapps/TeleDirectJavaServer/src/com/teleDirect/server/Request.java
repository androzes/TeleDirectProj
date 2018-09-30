package com.teleDirect.server;

import com.teleDirect.Operation;

/**
 * This class is used to form a request from the user and contains information about:
 * (1) username - the username of the user requesting the operation,
 * (2) operation - the operation to execute, and
 * (3) params - parameters required to execute the operation
 * 
 * @author AG041955
 *
 */
public class Request {
	private String username;
	private Operation operation;
	private String params;
	
	public Request(String username, Operation operation, String params){
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

	public String getParams() {
		return params;
	}

	public void setParams(String params) {
		this.params = params;
	}
	
}

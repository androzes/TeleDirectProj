package com.teleDirect.server;

/**
 * This class is a response to a request from the user and contains information about:
 * (1) status - the status of the requested operation,
 * (2) message - an appropriate message to show to the user on the client-side, and
 * (3) data - contains the result of a requested operation
 * 
 * @author AG041955
 *
 */
public class Response {

	private String status;
	private String message;
	private Object data;
	
	public Response(String status, String message, Object data){
		this.status = status;
		this.message = message;
		this.data = data;
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	
}

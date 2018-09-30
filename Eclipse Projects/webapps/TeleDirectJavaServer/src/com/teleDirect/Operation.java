package com.teleDirect;
/**
 * The following list of enums are used to identify the
 * type of operation that is being requested by the user
 * 
 * @author AG041955
 *
 */
public enum Operation {
	FETCH_LIST("fetchList"), 
	FETCH_DETAILS("fetchDetails"), 
	READ("read"), 
	ADD("add"), 
	EDIT("edit"), 
	DELETE("delete"), 
	SAVE("save"), 
	LOGIN("login"), 
	LOGOUT("logout"), 
	VALIDATE_SESSION("validateSession");
	
	private String operation;
	
	Operation(String operation){
		this.operation = operation;
	}
	
	public String getOperationString(){
		return this.operation;
	}
}

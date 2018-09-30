function Request(username, operation, params){
	
	this.username = username;
	this.operation = operation;
	this.params = params;
	
	this.setParams = function(params){
		this.params = params;
	}

	this.getOperation = function(){
		return this.operation;
	}

	this.getUsername = function(){
		return this.username;
	}
	
	this.setUsername = function(username){
		this.username = username;
	}
	
	this.getParams = function(){
		return params;
	}
}


function User(params){
	this.username = null;
	
	this.name = null;
	this.priveleges = null;
	
	for(var key in params){
		this[key] = params[key];
	}
}

User.prototype.getUsername = function(){
	return this.username;
}

User.prototype.getPriveleges = function(){
	return this.priveleges;
}

User.prototype.setPriveleges = function(priv){
	this.priveleges = priv;
}

User.prototype.getName = function(){
	return this.name;
}
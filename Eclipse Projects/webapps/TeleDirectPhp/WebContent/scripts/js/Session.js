function Session(){
	this.token = undefined;
	this.user = undefined;
	this.KEY_USER = 'user';
	this.KEY_SESSION = 'session';
	this.KEY_TOKEN = 'token'
	
	this.start = function(token, user){
		this.token = token;
		this.user = user;
		
		var sessionObj = {};
		sessionObj[this.KEY_TOKEN] = token;
		
		// add to jStorage session and user details
		$.jStorage.set(this.KEY_SESSION, JSON.stringify(sessionObj));
		$.jStorage.set(this.KEY_USER, JSON.stringify(user));
		
		return true;
	}

	/**
		Gets the session details from the locally created session
		and returns the Session object
	**/
	this.getFromBrowser = function(){
		if( $.jStorage.get(this.KEY_SESSION) && $.jStorage.get(this.KEY_USER) ){
			var token = JSON.parse($.jStorage.get(this.KEY_SESSION)).token;
			var user = new User(JSON.parse($.jStorage.get(this.KEY_USER)));
			this.user = user;
			this.token = token;
			return this;
		}
		return undefined;
	}
	
	/**
		Sends a request to the server to validate the session details
		and returns whether the session is valid or not (true/false).
	**/
	this.valid = function(){
		if(this.token && this.user){
			
			var req = new Request('#system', Operation.VALIDATE_SESSION,
				{
					'username' : this.user.getUsername(),
					'token' : this.token
				}
			);
			var validateSessionEventHandler = new RequestEventHandler();
			validateSessionEventHandler.success = function(response){
				if(response.status == 'success'){
					//alert(response.status + " " + response.message);
					//return true;
				}else{
					alert(response.status + " " + response.message);
					window.location.assign('login.html');
				}
			}
			var coordinator = new UICoordinator();
			coordinator.sendRequest(req, validateSessionEventHandler );
			return true;
		}
		return false;
		
	}

	this.end = function(){
		this.token = undefined;
		this.user = undefined;
		// remove from jStorage session and user details
		$.jStorage.deleteKey(this.KEY_USER);
		$.jStorage.deleteKey(this.KEY_SESSION);
	}
	
	this.addUser = function(user){
		if(!this.user){
			this.user = user;
			$.jStorage.set(this.KEY_USER, JSON.stringify(this.user));
			return true;
		}
		return false;
	}
	
	this.getUser = function(){
		return this.user;
	}
}


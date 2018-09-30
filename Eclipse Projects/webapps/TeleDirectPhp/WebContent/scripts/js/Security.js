function Security(){
	this.USER_KEY = 'user';
	this.session = undefined;
	
	/**
		Returns true if the user session is set and it is validated from the database
	**/
	this.isAuthenticated = function (session){
		if(session.getUser() == null) return false;
		else{
			return session.valid();
		}
	}
	
	/**
		Returns true if the user is priveleged to perform the specific operation
	**/
	this.isPriveleged = function(operation, user){
		switch(operation){
			case Operation.FETCH_LIST:
			case Operation.FETCH_DETAILS:
			case Operation.READ:
				if(user.priveleges.search('r') != -1) return true;
			case Operation.ADD:
			case Operation.EDIT:
			case Operation.DELETE:
				if(user.priveleges.search('w') != -1) return true;
			default:
				return false;
		}
	}
	
	
	/**
		Sends a login request to the server and redirects the user to the 
		listContacts page if the credentials are correct. Otherwise, shows an
		invalid username/password message.
	**/
	this.login = function(username, password){
		
		var req = new Request('#system', Operation.LOGIN,
			{
				'username' : username,
				'password' : password
			}
		);
		
		var loginEventHandler = new RequestEventHandler();
		var security = this;
		loginEventHandler.success = function(response){
			var loginHandler = new LoginHandler();
			
			console.log("response : " + JSON.stringify(response));				
			var msg = response.message;
			
			if(response.status == 'success'){
				
				//create a new Session with the given user
				var mUser = new User(response.data.user);
				security.session = new Session().start(response.data.session.token, mUser);
				
				//show welcome message
				loginHandler.showWelcomeMessage(msg);
				
				//redirectToHome
				loginHandler.redirectToListPersons();
			}
			else if (response.status == 'failure'){
				loginHandler.showFailureMessage(msg);
			}
			else if (response.status == 'error'){
				loginHandler.showErrorMessage(msg);
			}
		}
		
		//send a request to server and get a response
		var coordinator = new UICoordinator();
		coordinator.sendRequest(req, loginEventHandler);
		
	}
	
	this.getSession = function(){
		if(!this.session){
			this.session = new Session().getFromBrowser();
		}
		return this.session;
	}
	
	/**
		Sends a logout request to the server and ends the local session created 
		on the client side.
	**/
	this.logout = function(){
		
		var username = JSON.parse($.jStorage.get('user')).username;
		
		var req = new Request('#system', Operation.LOGOUT,
			{
				'username' : username,
			}
		);
		
		var logoutEventHandler = new RequestEventHandler();
		var security = this;
		logoutEventHandler.success = function(response){
			if(response.status == 'success'){
				// end UI Session
				if(security.session){
					security.session.end();					
				}
				console.log("Loggin out");
				// redirectToLoginPage
				window.location.assign('login.html');
			}
			else if (response.status == 'failure'){
				alert(response.status + " " + response.message);
			}
			else if (response.status == 'error'){
				alert(response.status + " " + response.message);
			}
		}
		
		// send a request to server and get a response
		var coordinator = new UICoordinator();
		coordinator.sendRequest(req, logoutEventHandler);
		
	}

}
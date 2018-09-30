describe('Security', function(){
	var security;
	var username, operation, params;
	
	beforeEach(function(){
		
		jasmine.Ajax.install();
		jasmine.Ajax.addCustomParamParser({
		  test: function(xhr) {
			// return true if you can parse
			return true;
		  },
		  parse: function(params) {
			// parse and return
			return params;
		  }
		});
		
		security = new Security();
	});
	
	afterEach(function(){
		jasmine.Ajax.uninstall();
	});
	
	it('should be able to authenticate the user session', function(){
		
		var session = new Session();
		var user = new User({});
		security.session = session;
		
		spyOn(session, "valid").and.returnValue(true);
		spyOn(session, "getUser").and.returnValue(user);
		
		expect(security.isAuthenticated(session)).toBeTruthy();
	});
	
	it('should be able to tell whether the user is privileged', function(){
		var operation = Operation.DELETE;
		var userObj = {
			username 	: "androzes",
			name 		: "Andro Zeus",
			priveleges 	: "rw"
		}
		var user = new User(userObj);
		expect(security.isPriveleged(operation, user)).toBeTruthy();
		
		user.setPriveleges("r");
		expect(security.isPriveleged(operation, user)).toBeFalsy();
		
	});
	
	it('should be able return the current session', function(){
		var operation = Operation.DELETE;
		var userObj = {
			username 	: "androzes",
			name 		: "Andro Zeus",
			priveleges 	: "rw"
		}
		var user = new User(userObj);
		expect(security.isPriveleged(operation, user)).toBeTruthy();
		
		user.setPriveleges("r");
		expect(security.isPriveleged(operation, user)).toBeFalsy();
		
	});
	
	it('should be able to login using username and password', function(){
		var onSuccess = jasmine.createSpy('onSuccess');
		var onFailure = jasmine.createSpy('onFailure');
		var onBeforeSend = jasmine.createSpy('onBeforeSend');
		var onComplete = jasmine.createSpy('onComplete');
		
		var requestObj = new Request("system", "login",{username:"akash",password:"hello"});
		eventHandler = {
			success: onSuccess,
			error: onFailure,
			beforeSend: onBeforeSend,
			complete: onComplete
		};
		
		coord = new UICoordinator();
		coord.sendRequest(requestObj, eventHandler);
		
		var request = jasmine.Ajax.requests.mostRecent();
		request.respondWith(TestResponses.login.success);
		
		expect(onSuccess).toHaveBeenCalledWith(JSON.parse(TestResponses.login.success.responseText));
		expect(security.session).not.toBeNull();
	});
	
	it('should be able to logout the current user', function(){
		var onSuccess = jasmine.createSpy('onSuccess');
		var onFailure = jasmine.createSpy('onFailure');
		var onBeforeSend = jasmine.createSpy('onBeforeSend');
		var onComplete = jasmine.createSpy('onComplete');
		
		var requestObj = new Request("system", "logout",{username:"akash"});
		eventHandler = {
			success: function(response){
						if(response.status == 'success'){
							// end UI Session
							if(security.session){
								security.session.end();					
							}
						}
						else if (response.status == 'failure'){
							alert(response.status + " " + response.message);
						}
						else if (response.status == 'error'){
							alert(response.status + " " + response.message);
						}
					},
			error: onFailure,
			beforeSend: onBeforeSend,
			complete: onComplete
		};
		
		spyOn(eventHandler, "success").and.callThrough();
		
		var session = new Session();
		var user = new User({});
		session.start('4535gh', user);
		security.session = session;
		
		coord = new UICoordinator();
		coord.sendRequest(requestObj, eventHandler);
		var request = jasmine.Ajax.requests.mostRecent();
		
		expect(security.session.user).not.toBeUndefined();
		expect(security.session.token).not.toBeUndefined();
		
		request.respondWith(TestResponses.logout.success);
		
		expect(eventHandler.success).toHaveBeenCalledWith(JSON.parse(TestResponses.logout.success.responseText));
		expect(security.session.user).toBeUndefined();
		expect(security.session.token).toBeUndefined();
	});
	
});
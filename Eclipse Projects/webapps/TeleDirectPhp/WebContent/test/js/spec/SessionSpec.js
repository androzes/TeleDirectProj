describe('Session', function(){
	var user, token, session;
	
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
		
		user = new User({
			username : "akash",
			name : "Akash Gupta",
			priveleges: "rw"
		});
		
		token = "2sdc#$";
		session = new Session();
	});
	
	afterEach(function(){
		jasmine.Ajax.uninstall();
		
		session.end();
	});
	
	it('should be able to start a new session',function(){
		expect(session.start(token, user)).toBeTruthy();
	});
	
	it('should be able to get the session from the browser',function(){
		expect(session.getFromBrowser()).toBeUndefined();
		
		$.jStorage.set(session.KEY_SESSION, '{"token":"'+token+'"}');
		$.jStorage.set(session.KEY_USER, JSON.stringify(user));
		expect(session.getFromBrowser()).toBe(session);
	});
	
	it('should be able to end the session',function(){
		session.start(token, user);
		expect(session.getFromBrowser()).not.toBeUndefined();
		
		session.end();
		expect(session.getFromBrowser()).toBeUndefined();
	});
	
	it('should be able to add user to the session',function(){
		expect(session.addUser(user)).toBeTruthy();
		// cannot add another user to the existing session
		expect(session.addUser(user)).toBeFalsy();
	});
	
	it('should be able to get user from the session',function(){
		session.addUser(user);
		expect(session.getUser()).toBe(user);
	});
	
	it('should be able to return whether a session is valid',function(){
		var request;
		var reqObject = new Request('#system', Operation.VALIDATE_SESSION,
			{
				'username' : user.getUsername(),
				'token' : token
			}
		);
		
		expect(session.valid()).toBeFalsy();
		
		session.start(token, user);
		expect(session.valid()).toBeTruthy();
		request = jasmine.Ajax.requests.mostRecent();
		expect(request.data()).toEqual(JSON.stringify(reqObject));
		
		session.end();
		expect(session.valid()).toBeFalsy();
	});
});
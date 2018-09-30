describe('Request', function(){
	var req;
	var username, operation, params;
	
	beforeEach(function(){
		username = 'system';
		operation = 'login';
		params = '{"username":"hello","password":"hello"}';	
		
		req = new Request(username, operation, params);
	});
	
	it('should be able to get the operation', function(){
		expect(req.getOperation()).toEqual(operation);
	});
	
	
	it('should be able to get the username', function(){
		expect(req.getUsername()).toEqual(username);
	});
	
	
	it('should be able to get the parameters', function(){
		expect(req.getParams()).toEqual(params);
	});
	
	
	it('should be able to set the username', function(){
		var tUser = 'akash';
		req.setUsername(tUser);
		
		expect(req.getUsername()).toEqual(tUser);
	});
});
describe('UICoordinator', function(){
	var coord, request, eventHandler, requestObj;
	var onSuccess, onFailure, onBeforeSend, onComplete;
	
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
		
		onSuccess = jasmine.createSpy('onSuccess');
		onFailure = jasmine.createSpy('onFailure');
		onBeforeSend = jasmine.createSpy('onBeforeSend');
		onComplete = jasmine.createSpy('onComplete');
		
		requestObj = new Request("system", "login",{username:"akash",password:"hello"});
		eventHandler = {
			success: onSuccess,
			error: onFailure,
			beforeSend: onBeforeSend,
			complete: onComplete
		};
		
		coord = new UICoordinator();
		coord.sendRequest(requestObj, eventHandler);
		
		request = jasmine.Ajax.requests.mostRecent();
	});
	
	afterEach(function(){
		jasmine.Ajax.uninstall();
	});
	
	it('should make the request to correct url', function(){
		var url = 'http://localhost:8080/TeleDirectJavaServer/ServerMain.jsp' ;
		expect(request.url).toBe(url);
	});
	
	it('should make the request with correct method type', function(){
		expect(request.method).toBe('POST');
	});
	
	it('should make the request with correct data', function(){
		expect(request.data()).not.toBeUndefined();
		expect(request.data()).toBe(JSON.stringify(requestObj));
	});
	
	it('should execute the success function on success', function(){
		request.respondWith(TestResponses.login.success);
		
		expect(onSuccess).toHaveBeenCalled();
		expect(onFailure).not.toHaveBeenCalled();
	});
	
	it('should execute the failure function on failure', function(){
		request.respondWith(TestResponses.login.failure);
		expect(onSuccess).not.toHaveBeenCalled();
		expect(onFailure).toHaveBeenCalled();
	});
	
	it('should execute the beforeSend before request call', function(){
		request.respondWith(TestResponses.login.success);
		expect(onBeforeSend).toHaveBeenCalled();
	});
	
	it('should execute the complete function after request completion', function(){
		request.respondWith(TestResponses.login.success);
		expect(onComplete).toHaveBeenCalled();
	});
});
describe('User',function(){
	var user, username, name, priveleges;
	
	beforeEach(function(){
		username = "akash";
		name = "Akash Gupta";
		priveleges = "rw";
		user = new User({
			username	: username,
			name 		: name,
			priveleges	: priveleges
		});
	});
	
	it('should be able to return the Username',function(){
		expect(user.getUsername()).toEqual(username);
	});
	
	it('should be able to get the name of the user',function(){
		expect(user.getName()).toEqual(name);
	});
	
	it('should be able to get the user priveleges',function(){
		expect(user.getPriveleges()).toEqual(priveleges);
	});
	
	it('should be able to set the user priveleges',function(){
		user.setPriveleges("r");
		expect(user.getPriveleges()).not.toEqual(priveleges);
		expect(user.getPriveleges()).toEqual("r");
	});
});
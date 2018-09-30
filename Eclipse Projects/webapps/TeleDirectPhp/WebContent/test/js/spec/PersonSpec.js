describe('Person',function(){
	var person;
	var pJSONString = {
			"id"					:		"1",
			"title"					:		"Mr",
			"firstName"				:		"Akash",
			"middleName"			:		"",
			"lastName"				:		"Gupta",
			"email"					:		"akash.gpta@gmail.com",
			"company"				:		"cerner",
			"workContact"			:		"9900322005",
			"homeContact"			:		"",
			"dob"					:		"1991-10-22",
			"workAddress"			:		"Manyata",
			"homeAddress"			:		"Babusapalya",
			"notes"					:		"",
			"avatar"				:		"no",
			"avatarFilename"		:		""
	};
	
	beforeEach(function(){
		person = new Person(pJSONString.id);
		person.addDetails(pJSONString);
	});
	
	it('should be able to return id',function(){
		expect(person.getID()).toBe(pJSONString.id);
	});
	
	it('should be able to set id',function(){
		person.setID('2');
		expect(person.getID()).toBe('2');
	});
	
	it('should be able to add person details',function(){
		
		person.addDetails(pJSONString);
		
		expect(person.id).toEqual(pJSONString.id);
		expect(person.title).toEqual(pJSONString.title);
		expect(person.firstName).toEqual(pJSONString.firstName);
		expect(person.middleName).toEqual(pJSONString.middleName);
		expect(person.lastName).toEqual(pJSONString.lastName);
		expect(person.email).toEqual(pJSONString.email);
		expect(person.company).toEqual(pJSONString.company);
		expect(person.workContact).toEqual(pJSONString.workContact);
		expect(person.homeContact).toEqual(pJSONString.homeContact);
		expect(person.dob).toEqual(pJSONString.dob);
		expect(person.workAddress).toEqual(pJSONString.workAddress);
		expect(person.homeAddress).toEqual(pJSONString.homeAddress);
		expect(person.notes).toEqual(pJSONString.notes);
		expect(person.avatar).toEqual(pJSONString.avatar);
		expect(person.avatarFilename).toEqual(pJSONString.avatarFilename);
	});
	
	it ('should be able to get the full name', function(){
		expect(person.getFullName()).toBe('Akash Gupta');
		
		person.firstName = "";
		person.lastName = "";
		expect(person.getFullName()).toBe('');
	});
	
	it ('should be able to check for duplicate email', function(){
		var email = 'akash.gpta@gmail.com';
		var workContact = '9900123456';
		
		expect(person.isDuplicate(email, workContact)).toBe('email');
	});
	
	it ('should be able to check for duplicate work Contact', function(){
		var email = 'somebody@somewhere.com';
		var workContact = '9900322005';
		
		expect(person.isDuplicate(email, workContact)).toBe('workContact');
	});
	
	it('should return undefined when duplicate is not found', function(){
		var email = 'somebody@somewhere.com';
		var workContact = '9900123456';
		
		expect(person.isDuplicate(email, workContact)).toBeUndefined();
	});
	
});
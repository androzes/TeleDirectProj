describe('PersonCollection',function(){
	var pCollection;
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
	
	person = new Person(pJSONString.id);
	person.addDetails(pJSONString);
	
	beforeEach(function(){
		pCollection = new PersonCollection();
		pCollection.add(person);
	});
	
	it('should be able to add a person identified by a key',function(){
		var tJSONString = {
			"id"					:		"4",
			"title"					:		"Mrs",
			"firstName"				:		"Sangeeta",
			"middleName"			:		"",
			"lastName"				:		"Gupta",
			"email"					:		"sangeeta.knp@gmail.com",
			"company"				:		"Self-Employed",
			"workContact"			:		"9918932456",
			"homeContact"			:		"",
			"dob"					:		"1991-07-10",
			"workAddress"			:		"Hoolanganj",
			"homeAddress"			:		"Hoolanganj",
			"notes"					:		"",
			"avatar"				:		"no",
			"avatarFilename"		:		""
		};
		var tPerson = new Person(tJSONString.id);
		tPerson.addDetails(tJSONString);
		
		expect(pCollection.add(tPerson)).toBe(2);
		expect(pCollection.add(tPerson)).toBeUndefined(); //adding an item that already exists, returns undefined
	});
	
	it('should be able to remove a person identified by id',function(){
		expect(pCollection.remove(pJSONString.id)).toBe(0);
		expect(pCollection.remove(pJSONString.id)).toBeUndefined();
	});
	
	it('should be able to get a person identified by id',function(){
		expect(pCollection.person(pJSONString.id)).not.toBeNull();
		expect(pCollection.person(pJSONString.id)).toBe(person);
	});
	
	it('should be able to get the size of PersonCollection',function(){
		expect(pCollection.size()).toEqual(1);
	});
	
	it('should be able to tell whether it contains a person with id',function(){
		expect(pCollection.contains(pJSONString.id)).toBeTruthy();
		expect(pCollection.contains('4')).toBeFalsy();
	});
	
	it('should be able to tell whether the collection is empty',function(){
		expect(pCollection.isEmpty()).toBeFalsy();
		pCollection.remove(pJSONString.id);
		expect(pCollection.isEmpty()).toBeTruthy();
	});
	
	it('should be able to iterate over all the persons',function(){
		var tJSONString = {
			"id"					:		"4",
			"title"					:		"Mrs",
			"firstName"				:		"Sangeeta",
			"middleName"			:		"",
			"lastName"				:		"Gupta",
			"email"					:		"sangeeta.knp@gmail.com",
			"company"				:		"Self-Employed",
			"workContact"			:		"9918932456",
			"homeContact"			:		"",
			"dob"					:		"1991-07-10",
			"workAddress"			:		"Hoolanganj",
			"homeAddress"			:		"Hoolanganj",
			"notes"					:		"",
			"avatar"				:		"no",
			"avatarFilename"		:		""
		};
		var tPerson = new Person(tJSONString.id);
		tPerson.addDetails(tJSONString);
		
		pCollection.add(tPerson);
		
		var persons = [];
		pCollection.forEach(function(item){
			persons.push(item);
		});
		
		expect(persons[0]).toBe(person);
		expect(persons[1]).toBe(tPerson);
	});
	
	/* it('should be able to return the JSON String representation of the collection',function(){
		JSON = '[{"id":"1","title":"Mr","firstName":"Akash","middleName":"","lastName":"Gupta","email":"akash.gpta@gmail.com","company":"cerner","workContact":"9900322005","homeContact":"","dob":"1991-10-22","workAddress":"Manyata","homeAddress":"Babusapalya","notes":"","avatar":"no","avatarFilename":""}]';
		expect(pCollection.serializeJSONString()).toEqual(JSON);
	}); */
	
});
function Person(id){
	this.id = id;
	
	// default values
	this.title = '';
	this.firstName = '';
	this.middleName = '';
	this.lastName = '';
	this.email = '';
	this.company = '';
	this.workContact = '';
	this.homeContact = '';
	this.dob = '';
	this.workAddress = '';
	this.homeAddress = '';
	this.notes = '';
	this.avatar = 'no';
	this.avatarFilename = '';	
	
	/**
	* Returns the full name of the person
	* by concatenating the firstName, middleName and lastName.
	**/
	this.getFullName = function(){
		var name = "";
		if (this.firstName != "") 	name += this.firstName + " ";
		if (this.middleName != "") 	name += this.middleName + " ";
		if (this.lastName != "") 	name += this.lastName + " ";
		return name.trim();
	}
	
	/**
	* Receives the person details as a key-value pair
	* and adds the corresponding details to this instance of Person
	**/
	this.addDetails = function(fields){
		// for each key in array add to this['fieldname']
		for(var field in fields){
			if(fields[field] == null) fields[field]=""; //convert null values to empty string
			this[field] = fields[field];
		}
	}
	
	this.getID = function(){
		return this.id;
	}

	this.setID = function(id){
		this.id = id;
	}
	
	/** returns which of the email or workContact is duplicate **/
	this.isDuplicate = function(email, workContact){
		if (this.workContact.toUpperCase() == workContact.toUpperCase())
			return 'workContact';
		else if(this.email.toUpperCase() == email.toUpperCase())
			return 'email';
		return undefined;
	}
}



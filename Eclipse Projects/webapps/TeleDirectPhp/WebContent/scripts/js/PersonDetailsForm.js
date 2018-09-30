function PersonDetailsForm(){
	this.mForm = $('#form_person_details');
	this.submitButton = $('#submit');
	this.resetButton = $('#reset');
	this.messageContainer = $('#messageForm');
	
	// setup form validation
	this.formValidator = new FormValidator();
	this.formValidator.validate(this.mForm);
	
	this.reset = function(){
		console.log('Resetting form');
		// clear all input values
		this.resetForm();
		// remove all error messages by the validator
		this.formValidator.removeErrorMessages();
		// remove all highlighting from error placements
		$('.ui-state-highlight').removeClass('ui-state-highlight');
		// clear messages in messageForm
		this.messageContainer.html('');
	}
	
	this.submit = function(){
		this.mForm.submit();
	}
	
	this.resetForm = function(){
		this.mForm.find('input[type=text], textarea, select').val('');
	}
	
	this.valid = function(){
		return this.mForm.valid();
	}
	
	/**
		Receives a Person Object and fills up the corresponding details 
		onto the corresponding input on the form.
	**/
	this.populate = function(person){
		for(var property in person){
			if(person.hasOwnProperty(property)){
				// get the html element to populate to
				var HtmlElement = document.getElementById(property);
				if(typeof person[property] !== 'function' && HtmlElement!=null){
					if(property =='dob'){
						// format date according to the system locale
						HtmlElement.value = (person[property]=='' || person[property]=='0000-00-00')? '' : new Date(person[property]).toLocaleDateString();
					}else{
						HtmlElement.value = person[property]; 
					}
				}
			}
		}
	}
	
	this.getForm = function(){
		return this.mForm;
	}
	
	this.serialize = function(){
		return this.mForm.serialize();
	}
}
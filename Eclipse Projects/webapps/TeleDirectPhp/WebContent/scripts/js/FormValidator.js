function FormValidator(){
	this.validator = undefined;
	
	this.validate = function(form){
		this.intializeValidator();
		this.validator = form.validate();
		return true;
	}
	
	this.intializeValidator = function (){
	
		// add custom method for 'name' validation (include space,apostrophe and dot in name)
		$.validator.addMethod("person_name", function(value, element) {
			return this.optional(element) || /[a-zA-Z]+(?:(?:. |[' ])[a-zA-Z]+)*/.test(value);
		}, "Please enter a valid name.");
		
		// associate class='name' with the validation rule 'person_name'
		$.validator.addClassRules({
			name: {
				person_name: true,
				minlength: 3
			}
		});
		
		// Custom method for phone number validation from google's libPhoneNumber
		/** $.validator.addMethod("phone", function(value, element) {
			var phoneUtil = $.PhoneNumberUtil.getInstance();
			return this.optional(element) || phoneUtil.isValidNumber(value,'IN');
		}, "Please enter a valid phone number."); **/
		
		// set defaults values 
		$.validator.setDefaults({
			highlight: function(input) {
				$(input).addClass("ui-state-highlight");
				$(input).addClass("ui-element-state-error");
			},
			unhighlight: function(input) {
				$(input).removeClass("ui-state-highlight");
				$(input).removeClass("ui-element-state-error");
			},
			errorClass: 'error_msg',
			wrapper : 'td',
			errorPlacement : function(error, element) {
				error.addClass('ui-state-error');
				error.prepend('<span class="ui-icon ui-icon-alert"></span>');
				
				var thirdCol = element.closest('td').nextAll('.third-col');
				error.appendTo(thirdCol);//.effect('highlight', {}, 2000)
			}
		});
	}
	
	this.removeErrorMessages = function(){
		this.validator.resetForm();
	}
}
function PersonDetailsDialog(){
	this.mDialog = $('#dialog');
	this.operation = Operation.EDIT;
	this.mForm = new PersonDetailsForm();
	this.confirmCloseDialog = $('#confirm-close');
	this.datePicker = $('#dob');
	
	/**
	* Sets up the person details dialog, the close confirmation dialog 
	* and the datepicker for the form
	*
	**/
	this.setup = function(){
		//setup confirmation dialog
		this.confirmCloseDialog.dialog({
			autoOpen: false,
			modal: true,
			height: 'auto'
		});
		
		// setup person Details dialog
		this.mDialog.dialog({
			autoOpen: false,
			modal: true,
			draggable: true,
			resizable: false,
			//position: 'center',
			show: 'blind',
			//hide: 'blind',
			width: 1000,
			close: function (event, ui){
				// add your own close function
				if (typeof closeFunction === 'function') closeFunction();
			}	
		});	
		
		this.datePicker.datepicker({
			changeMonth: true,//this option for allowing user to select month
			changeYear: true, //this option for allowing user to select from year range
			showAnim: "slideDown",
			defaultDate: "-20y",
			yearRange: "-100:+0"
		});
		
		
	}
	
	this.open = function(){
		this.mDialog.dialog('open');
	}
	
	this.close = function(){
		this.mDialog.dialog('close');
	}
	
	this.getForm = function(){
		return this.mForm;
	}
	
	this.on = function(event,block){
		this.mDialog.on(event,block);
	}
	
	this.setTitle = function(title){
		this.mDialog.dialog('option', 'title', title);
	}
	
	/**
	* Sets the operation meant for the dialog form
	* and sets the title of the dialog accordingly
	**/
	this.setOperation = function(operation){
		this.operation = operation;
		if(operation == Operation.ADD){
			this.setTitle('Add Person');
		}else if(operation == Operation.EDIT){
			this.setTitle("Person Details ");
		}
	}
	
	this.getOperation = function(){
		return this.operation;
	}
}
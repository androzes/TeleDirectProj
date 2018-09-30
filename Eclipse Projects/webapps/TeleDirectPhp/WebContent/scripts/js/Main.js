
var security = new Security();

var curSession = security.getSession();
var curUser;

var coordinator = new UICoordinator();
var fetchEventHandler = new RequestEventHandler();
var saveEventHandler = new RequestEventHandler();
var persons = new PersonCollection();

/** UI elements **/
var personDetailsDialog;
var personDetailsForm;
var addButton;
var saveButton;
var logoutButton;
var container;
var messageContainer;

if(curSession && curSession.valid()){
	
	curUser = curSession.getUser();
	$(document).ready(function(){
		
		/** Intializing UI elements **/
		personDetailsDialog = new PersonDetailsDialog();
		personDetailsForm = personDetailsDialog.getForm();
		addButton = $('#add_button');
		saveButton = $('#save_button');
		logoutButton = $('#username');
		container = $('#container');  		// container to add UI elements to
		messageContainer = $('#message'); 	// show error messages and the status

		// setup click on add button
		addButton.click(function(){
			console.log("Add button clicked");
			personDetailsDialog.setOperation(Operation.ADD);
			personDetailsDialog.open();
			personDetailsForm.reset();
			var rndmID = randomString(4)+'AG'+randomString(4);
			personDetailsForm.populate(new Person(rndmID));
		});
		
		// setup click on save button
		saveButton.click(function(){
			console.log("Save button clicked");
			//initiateSave(coordinator, saveEventHandler);
			console.log("initiating save");
			var req = new Request(curUser.getUsername(), Operation.SAVE, JSON.parse('{"persons": '+persons.serializeJSONString()+'}'));
			coordinator.sendRequest(req, saveEventHandler);
		});

		// setup click on logout button
		logoutButton.click(function(){
			console.log("Logout button clicked");
			security.logout();
		});
		
		//set username
		logoutButton.html(curUser.getName());
		
		//setup person details dialog
		personDetailsDialog.setup();
		
		//setup confirmation dialog
		var forceClose = false;
		personDetailsDialog.mDialog.dialog({
			open: function(event, ui){
				forceClose = false;
			},
			beforeClose: function(event, ui){
				if(!forceClose){
					event.preventDefault();
					var confirmCloseDialog = $('#confirm-close');
					confirmCloseDialog.dialog({
						buttons: {
							OK: function(){
								forceClose = true;
								$(this).dialog('close');
								personDetailsDialog.close();
							},
							Cancel: function() {
								forceClose = false;
								$(this).dialog('close');
							}
						}
					});
					confirmCloseDialog.dialog('open');
				}
			}
		});
		
		
		/** setup form buttons **/
		//setup save Form click event
		personDetailsForm.submitButton.click(function(event){
			event.preventDefault();
			console.log('Save Clicked');
			// allow the form data to be saved only after the form is valid
			if(personDetailsForm.valid()) {
				console.log('Form is valid');
				//trigger save function
				personDetailsForm.submit();
			}
		});
		
		//setup reset button
		personDetailsForm.resetButton.unbind().click(function(){
			console.log('Reset Clicked');
			// trigger reset
			personDetailsForm.reset();
		});
		
		/** setup ui events **/
		//setup form submit event
		personDetailsForm.getForm().submit(function(event){
			console.log("submit event triggered");
	
			//serialize form information into JSON
			var personJSON = $(this).serializeObject();
			
			//convert date to SQL format
			personJSON.dob = (personJSON.dob == '')? personJSON.dob : (new Date(personJSON.dob)).toSQLDateFormat();
			
			//duplicate record check
			var duplicateFound = false;
			var duplicateField = undefined;
			var duplicatePerson = undefined;
			persons.forEach(function(person){
				// do not compare with self record
				if(person.id != personJSON.id){
					var tempField;
					if(tempField = person.isDuplicate( personJSON.email, personJSON.workContact)){
						duplicateField = tempField;
						duplicatePerson = person;
						duplicateFound = true;
						//break;
					}
				}
			});
			
			if(duplicateFound){
				/** show an error message that given email or workContact already exists **/
				var inputElement = personDetailsForm.getForm().find('#'+duplicateField);
				$('#messageForm').html("Given " + duplicateField + ": '" + inputElement.val() + "' already exists.");
				console.log("Duplicate " + duplicateField + " found in " + duplicatePerson.getFullName());
			}
			else{
				if(personDetailsDialog.getOperation() == Operation.EDIT){
					if(!persons.isEmpty()){
						console.log('Editing personID : '+ personJSON.id);
						var personObj = persons.person(personJSON.id);	// get person from collection
						personObj.addDetails(personJSON); 				// update details	
						console.log('Updated successfully');
					}else{
						console.log("Serious error occured : persons collection is unknowingly empty.");
					}
				}else if (personDetailsDialog.getOperation() == Operation.ADD){
					var personObj = new Person(personJSON.id);
					personObj.addDetails(personJSON);
					console.log("Adding: " + JSON.stringify(personObj));
					persons.add(personObj);
				}
				
				
				forceClose = true; 		// set the flag to true for the confirmation dialog
				personDetailsDialog.close();
				populatePersonsOnUI(persons, container, personDetailsDialog );
			}			
		});

		//setup openDialog event
		personDetailsDialog.on('dialogopen',function(){
			console.log("Dialog opened");
		});
		
		//setup closeDialog event
		personDetailsDialog.on('dialogclose',function(){
			console.log("Dialog closed");
		});
		
		//call reformed styling script on the form 
		personDetailsForm.getForm().reformed({
			styleSelects : false
		});
		
		fetchAndShowPersonList();		
	});		
}else{
	// navigate to login page
	window.location.assign('login.html');
}

/**
* Creates a request to fetch the list of persons.
* On successful receipt of the response, the list of persons
* received in the form of JSON are parsed and added to the PersonCollection object.
* Creates a coordinator object and sends the fetch request
**/
function fetchAndShowPersonList(){
	
	/** on request success event handler **/
	fetchEventHandler.success = function(response){
		if(response.status == 'success'){
			if(response.data.hasOwnProperty('persons')){	// add persons on the UI if response has a 'persons' object
				var personArray = response.data.persons;
				for (var i in personArray ){
					
					var person = new Person(personArray[i].id);
					person.addDetails(personArray[i]);
					console.log(JSON.stringify(personArray[i]));
					persons.add(person); 
				}
				
				populatePersonsOnUI(persons, container, personDetailsDialog );
			}
			else{
				messageContainer.html('No contacts found');
			}
		}else{
			messageContainer.html(response.message);
		}
	}

	/** on request beforSend event handler **/
	fetchEventHandler.beforeSend = function(){
		messageContainer.html('<img class="loading" src="images/spinner.gif"/>');
	}

	/** on request error event handler **/
	fetchEventHandler.error = function(XMLHttpRequest, textStatus, errorThrown){
		messageContainer.html("Status: " + textStatus + " Error: " + errorThrown + " Response: " + XMLHttpRequest.responseText);
	}

	/** send request to fetch person list **/
	var req = new Request(curUser.getUsername(), Operation.FETCH_LIST);
	coordinator.sendRequest(req, fetchEventHandler);
}

/**
* Parses through the collection of persons and adds each person to the html container as a box 
* Sets up the click events on the boxes. Adds a delete button to each of the box and the corresponding  
* click event on the delete button.
**/
function populatePersonsOnUI(personCollection, container, dialog){
	
	if(personCollection.isEmpty()){
		$('#message').html('No contacts found');
	}else{
		$('.box').remove(); 		// remove all boxes
		messageContainer.html(''); 	// remove all messages
		personCollection.forEach(function(person){
			var id = person.getID();
			var fullName = person.getFullName();
			
			// add to layout
			var box = 
			'<div id="box' + id + '" class="box">' +
				'<a>' +
					'<div>' +
						'<img class="delete" src="images/delete-icon.png" />' + 
					'</div>'+
					'<div id="box' + id + '-click">' +
						'<img class="photo" src="images/avatar.png" />' +
						'<div class="fullName">' + fullName + '</div>' +
					'</div>'+
				'</a>' + 
			'</div>';
						
			// add contact element to html
			container.append(box);
			
			// hide delete button
			$(('#box'+id)).find('.delete').css('visibility','hidden');
			
			//setup box onClick event
			$(('#box' + id + '-click')).unbind().click(function(){
				//alert(this.id);
				this.boxId = this.id.replace("box","").replace("-click","");
				dialog.setOperation(Operation.EDIT);
				console.log("Person ID: " + this.boxId);
				dialog.open();
				var form = dialog.getForm();
				form.reset();
				form.populate(personCollection.person(this.boxId));
			});
			
			// setup box mouseover and mouseout events
			$(('#box'+id)).mouseover(function(event){
			   $(this).find('.delete').css('visibility','visible');
			});
			$(('#box'+id)).mouseout(function(event){
			   $(this).find('.delete').css('visibility','hidden');
			});
			
			//setup box on delete click event
			$(('#box'+id)).find('.delete').click(function(){
				console.log("delete clicked");
				
				//get box element
				var tBox = $(this).closest('.box');
				// get id of clicked element
				var tempid = tBox.attr('id').replace("box","");
				var fullName = tBox.find('.fullName').html();
				
				//set Message on dialog form
				$('#confirm-delete').html("Are you sure you want to remove '" + fullName + "' ?");
				
				//show confirmation dialog
				$('#confirm-delete').dialog({
					modal: true,
					height: 'auto',
					width: 300,
					buttons: {
						OK: function(){
							//remove from collection
							personCollection.remove(tempid);
							//remove from UI
							tBox.remove();
							console.log("Deleted personID=" + tempid);
							
							$(this).dialog('close');
						},
						Cancel: function() {
							$(this).dialog('close');
						}
					}
				});
				
			});
		});		
	}			
}

function randomString(length) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

	if (! length) {
		length = Math.floor(Math.random() * chars.length);
	}

	var str = '';
	for (var i = 0; i < length; i++) {
		str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}


function toJSONObject(obj){
	return JSON.parse(JSON.stringify(obj));
}
	


function RequestEventHandler(){
	
	/**
		Fired when the AJAX request receives an appropriate response from the server
	**/
	this.success= function(response){
		alert(response.status + " " + response.message);
	}
	
	/**
		Fired when the AJAX request receives an inappropriate/no response from the server
	**/
	this.error = function(XMLHttpRequest, textStatus, errorThrown){
		alert("Status: " + textStatus + " Error: " + errorThrown + " Response: " + XMLHttpRequest.responseText);
	}
	
	/**
		Fired after the success or error functios are fired
	**/
	this.complete = function(){
		// do something
	}
	
	/**
		Fired before sending the AJAX request
	**/
	this.beforeSend = function(){
		// do something
	}
	
}
function LoginHandler(){
	
	this.messageImage = $("#img_error");
	this.messageText = $("#msg_error");
	
	this.showWelcomeMessage = function(message){
		this.messageImage.css('display','inline');
		this.messageImage.attr("src","images/welcome.png");
		
		this.messageText.css('color','green');
		this.messageText.html(message);
	}
	
	this.showFailureMessage = function(message){
		this.messageImage.css('display','inline');
		this.messageImage.attr("src","images/alert.jpg");
		
		this.messageText.css('color','#FF9900');
		this.messageText.html(message);
	}
	
	this.showErrorMessage = function(message){
		this.messageImage.css('display','none');
		
		this.messageText.css('color','red');
		this.messageText.html(message);
	}
	
	this.redirectToListPersons = function(){
		window.location.assign('listPersons.html');
	}
	
	
}
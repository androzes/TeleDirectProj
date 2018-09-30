function LoginButton(){
	this.usernameInput = $("#username");
	this.passwordInput = $("#password");
	
	this.onLoginClick = function(){
			
		var username = this.usernameInput.val();
		var password = this.passwordInput.val();
		console.log(username + ' ' + password);
		
		var mySecurity = new Security();
		mySecurity.login(username, password);
	}
}
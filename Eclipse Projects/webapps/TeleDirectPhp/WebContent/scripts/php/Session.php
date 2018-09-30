<?php
require_once 'DatabaseProvider.php';

class Session{
	private $token;
	private $user;
	
	function __construct($user){
		$this->token = null;
		$this->user = $user;
	}
	
	/** 
	 * Create a unique token for a new session and saves it in the database
	 * This token is sent in a response to the client to identify the session 
	**/
	function start(){
		global $file;
		
		// generate a random token
		$token = md5(uniqid($this->user->getUsername(),true));
		
		$this->token = $token;
		$username = $this->user->getUsername();
			
		$dbProvider = new DatabaseProvider();
		$database = $dbProvider->getDatabase();
		
		// add token to database
		$stmt = @$database->prepare('UPDATE users SET session_token=:token WHERE username = :username');
		$stmt->bindParam(':token', $token, PDO::PARAM_STR);
		$stmt->bindParam(':username', $username , PDO::PARAM_STR);
		$success = $stmt->execute();
		error_log($file."Added token: ".$token." to database\n", 3, "debug.log");
		
		return $success;
	}
	
	function getToken(){
		return $this->token;
	}
	
	function setToken($token){
		$this->token = $token;
	}
	
	function getUser(){
		return $this->user;
	}
	
	function toArray(){
		return array('token' => $this->token);
	}
	
	/** 
	 * Ends the session associated with the current user.
	 * Sets the session_token in database to empty string
	 * and returns true if the database opeartion was successful 
	**/
	function end(){
		global $file;
		
		$dbProvider = new DatabaseProvider();
		$database = $dbProvider->getDatabase();
		
		/*** prepare the select ***/
		$stmt = @$database->prepare('UPDATE users SET session_token="" WHERE username = :username');
		
		/*** execute the prepared statement ***/
		$success = @$stmt->execute(array(':username' => $this->user->getUsername()));
		
		return $success;
	}
}
?>
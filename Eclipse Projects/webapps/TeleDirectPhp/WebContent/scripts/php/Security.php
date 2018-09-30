<?php

$file = basename(__FILE__ ).': ';

require_once 'Session.php';
require_once 'User.php';
require_once 'DatabaseProvider.php';

class Security{
	
	function login($username, $password){
		global $file;
		$response = null;
	
		error_log($file."username = ".$username.", password = ".$password."\n", 3, PHP_SCRIPT_PATH."debug.log");
		
		$dbProvider = new DatabaseProvider();
		$database = $dbProvider->getDatabase();
		try
		{
	
			error_log($file."Preparing SQL statement\n", 3, PHP_SCRIPT_PATH."debug.log");
	
			/*** prepare the select ***/
			$stmt = @$database->prepare('SELECT name, priveleges FROM users WHERE username = :username AND password = :password');
	
			/*** execute the prepared statement ***/
			@$stmt->execute(array(':username' => $username, ':password' => $password));
	
			error_log($file."Got results\n", 3, "debug.log");
			$numResults = $stmt->rowCount();
	
			error_log($file.$numResults." match found\n", 3, PHP_SCRIPT_PATH."debug.log");
	
			//echo $numResults ." results found\n";
			if($numResults == 1){
				$results = $stmt->fetch(PDO::FETCH_ASSOC);
	
				$user = new User($username, $results['name'], $results['priveleges']);
				$session = new Session($user);
				$session->start();
				
				$status = 'success';
				$message = "Welcome, ".$user->getName();
	
				$response =	array(
						'session' => $session->toArray(),
						'user' => $user->toArray()
				);
					
			}elseif ($numResults == 0){
				/** no user found **/
				$status = 'failure';
				$message = "Wrong username/password";
			}else{
				/** there is some problem **/
				throw new Exception("More than one username/password pair exist in the database.");
			}
		}
		catch(Exception $e)
		{
			$status = 'error';
			/*** if we are here, something has gone wrong with the database ***/
			$message = $e->getMessage() .' We are unable to process your request. Please try again later.';
		}
	
		return  json_encode(array(
				'status' => $status,
				'message' => $message,
				'data' => $response
		));
	}
	
	function logout($username){
		global $file;
		$response = null;
		try
		{
		
			$user = new User($username,'','');
			$session = new Session($user);
			$success = $session->end();
		
			if($success){
				
				$status = 'success';
				$message = $username. " has logged out successfully.";

			}else{
				$status = 'failure';
				$message = $username. " could not be logged out.";
			}
		}
		catch(Exception $e)
		{
			$status = 'error';

			/*** if we are here, something has gone wrong with the database ***/
			$message = $e->getMessage() .' We are unable to process your request. Please try again later.';
		}
		
		return  json_encode(array(
				'status' => $status,
				'message' => $message,
				'data' => $response
		));		
	}
	
	function valid($username, $token){
		global $file;
		
		$dbProvider = new DatabaseProvider();
		$database = $dbProvider->getDatabase();
		
		try
		{
		
			/*** prepare the select ***/
			$stmt = @$database->prepare('SELECT session_token FROM users WHERE username = :username');
			
			/*** execute the prepared statement ***/
			$success = @$stmt->execute(array(':username' => $username));
		
			if($success){
				
				$results = $stmt->fetch(PDO::FETCH_ASSOC);
				$dbToken = $results['session_token'];
				
				error_log($file."token = ".$token.", dbToken = ".$dbToken."\n", 3, PHP_SCRIPT_PATH."debug.log");
				if($token == $dbToken){
					$status = 'success';
					$message = "Session is valid.";
				}else{
					$status = 'failure';
					$message = "Session not valid.";
				}
			}
		}
		catch(Exception $e)
		{
			$status = 'error';
			
			/*** if we are here, something has gone wrong with the database ***/
			$message = $e->getMessage() .' We are unable to process your request. Please try again later.';
		}
		
		return  json_encode(array(
				'status' => $status,
				'message' => $message,
		));
	}
	
}


?>
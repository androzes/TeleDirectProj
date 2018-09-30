<?php

require_once 'Operation.php';
require_once 'DatabaseProvider.php';
require_once 'Security.php';

$file =  basename(__FILE__ ).': ';

class ServerCoordinator{
	private $request;
	private $response;
	
	// constructor
	function __construct(){
		$this->request = array();
		$this->response = '';
	}
	
	function getRequest(){
		global $file;
		$this->request = json_decode(file_get_contents("php://input", true));
		//$this->request = json_decode(file_get_contents("./add.txt", true));
		error_log($file."Request received: ".json_encode($this->request)."\n", 3, PHP_SCRIPT_PATH."debug.log");
	}
	
	function parseRequest(){
		global $file;
	
		$userName = $this->request->username;
		$operation = $this->request->operation;
		$params = $this->request->params;
		
		
		switch($operation){
			case Operation::LOGIN :
				error_log($file."Operation : Login\n", 3, PHP_SCRIPT_PATH."debug.log");
				$sec = new Security();
				$this->response = $sec->login($params->username, $params->password);
				break;
				
			case Operation::LOGOUT :
				error_log($file."Operation : Logout\n", 3, PHP_SCRIPT_PATH."debug.log");
				$sec = new Security();
				$this->response = $sec->logout($params->username);
				break;
				
			case Operation::VALIDATE_SESSION :
				error_log($file."Operation : Validate Session\n", 3, PHP_SCRIPT_PATH."debug.log");
				$sec = new Security();
				$this->response = $sec->valid($params->username,$params->token);
				break;
				
			case Operation::FETCH_LIST :
				error_log($file."Operation : Fetch Person List\n", 3, PHP_SCRIPT_PATH."debug.log");
				$dbProvider = new DatabaseProvider();
				$this->response = $dbProvider->fetchPersonList();
				break;
				
			case Operation::SAVE :
				error_log($file."Operation : Save\n", 3, PHP_SCRIPT_PATH."debug.log");
				$dbProvider = new DatabaseProvider();
				$pCollection = new PersonCollection();
				$pCollection->add($params->persons);
				$this->response = $dbProvider->savetoDatabase($pCollection->get());
				break;
				
			case Operation::EDIT :
				error_log($file."Operation : Edit\n", 3, PHP_SCRIPT_PATH."debug.log");
				$dbProvider = new DatabaseProvider();
				$pCollection = new PersonCollection();
				$pCollection->add($params->persons);
				$this->response = $dbProvider->updatePersons($pCollection->get());
				break;
				
			case Operation::DELETE :
				error_log($file."Operation : Edit\n", 3, PHP_SCRIPT_PATH."debug.log");
				$dbProvider = new DatabaseProvider();
				$ids = $params->ids;
				$this->response = $dbProvider->deletePersons($ids);
				break;
			
			default: 
				break;
		}
	}
	
	function generateResponse(){
		//$response = "Some response";
		$status = 'success';
		$message = 'Saved successfully';
		
		$this->response = json_encode(array(
			'status' => $status,
			'message' => $message
		));
	}
	
	function sendResponse(){
		echo $this->response;
	}
	
}

?>
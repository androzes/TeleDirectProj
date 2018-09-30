<?php
require_once 'config.php';
require_once 'PersonCollection.php';
require_once 'FieldMap.php';
//include ('FieldMap.php');

$file =  basename(__FILE__ ).': ';

class DatabaseProvider{
	private $database;
	
	function __construct(){
		global $file;
		$this->database = new PDO('mysql:host='.DB_SERVER.';dbname='.DB_DATABASE, DB_USERNAME, DB_PASSWORD);
		// set the error mode to exceptions
		$this->database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		error_log($file."Connected to database\n", 3, PHP_SCRIPT_PATH."debug.log");
	}
	
	function getDatabase(){
		return $this->database;
	}
	
	/**
	 * Fetches the list of persons and their details from the database.
	 * The results are added to PersonCollection object and sent into a response to the client
	 */
	function fetchPersonList(){
		global $file;
	
		$pCollection = new PersonCollection();
		try
		{
	
			$sql = $this->generateFetchQuery();
			$stmt = @$this->database->prepare($sql);
	
			// execute the prepared statement
			@$stmt->execute();
	
			$numResults = $stmt->rowCount();
			$rows = array();
	
			// if no contacts are found
			if($numResults == 0){
				$status = 'failure';
				$message = 'No contacts found';
			}elseif ($numResults > 0){
				$status = 'success';
				$message = $numResults .' contacts found';
			}
	
			/* Add each row to rows one at a time */
			while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
				$rows[] = $row;
				error_log($file.json_encode($row), 3, PHP_SCRIPT_PATH."debug.log");
			}
				
			// add to collection
			$pCollection->add($rows);
		}
		catch(Exception $e)
		{
			$status = 'error';
			// if we are here, something has gone wrong with the database
			$message = $e->getMessage() .' We are unable to process your request. Please try again later.';
		}
	
		return json_encode(array(
				'status' => $status,
				'message' => $message,
				'data' => array(
						'persons' => $pCollection->get()
					)
			));
	}
	
	
	/**
	 * Generates a fetch query based on the attributes defined in the $personDB of FieldMap
	 */
	
	function generateFetchQuery(){
	
		global $PersonDB, $PersonJS;
	
		// generate select fields string
		$selectFields = '';
		foreach ($PersonDB as $attr => $string){
			if($attr == 'ID')
				$selectFields .= 'persons.'.$PersonDB->$attr.' AS '.$PersonJS->$attr.', ';
			else
				$selectFields .= $PersonDB->$attr.' AS '.$PersonJS->$attr.', ';
		}
		$selectFields = substr($selectFields, 0, -2);
	
		//create the query
		$sql = 'SELECT '.$selectFields.' FROM persons INNER JOIN personadddetails '.
				'ON persons.'.$PersonDB->ID.' = personadddetails.'.$PersonDB->ID.//;
				' ORDER BY '.$PersonJS->FIRST_NAME;
		
		error_log($file."fecth query = ".$sql." \n", 3, "debug.log");
		
		return $sql;
	}
	
	
	/**
	 * Used to save the changes made to the persons on the client side.
	 * The SQL procedure is called to add the details of the person.
	 * The array of persons is iterated through and the person details are extracted into $values
	 * which is then passed to the SQL procedure to add the corresponding person to the database 
	 */
	function saveToDatabase($persons){
		global $file, $PersonDB, $PersonJS;
		$status ='';
		$message= '';
	
		if($persons){
			try{	
	
				$sql = "CALL INITIATE_ADD()";
				$stmt = $this->database->prepare($sql);
				$stmt->execute();
				
				//prepare query
				$sql = "CALL ADD_PERSON(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				$stmt = $this->database->prepare($sql);
					
				foreach($persons as $person){
					error_log($file."Got person: ".json_encode($person)."\n", 3, "debug.log");
	
					$values = array();
					foreach($person as $attr => $value){
						if($attr != $PersonJS->ID)
							array_push($values, $value);
					}
	
					error_log($file."Adding Person : ".implode(" ", $values).PHP_EOL, 3, "debug.log");
	
					/*** execute the prepared statement ***/
					$success = $stmt->execute($values);
	
					if($success){
						/** added succesfully **/
						$status = 'success';
					}else{
						/** there is some problem **/
						//throw new Exception("Could not add : ".implode(" ", $values));
						$message .= "Could not add : ".implode(" ", $values).PHP_EOL;
					}
	
				}
				$message .= "Saving Completed".PHP_EOL;
	
			}
			catch(Exception $e)
			{
				$status = 'error';
					
				/*** if we are here, something has gone wrong with the database ***/
				$message = $message .'We are unable to process your request. Please try again later.';
				$message = $message.' '.($e->getMessage());
				error_log($file."Error message ".$e->getMessage()." \n", 3, "debug.log");
			}
		}
	
		return json_encode(array(
				'status' => $status,
				'message' => $message
		));
	}
	
	
	/**
	 * Used to add the persons to the database.
	 * The SQL procedure is called to add the details of the person.
	 * The array of persons is iterated through and the person details are extracted into $values
	 * which is then passed to the SQL procedure to add the corresponding person to the database
	 */
	function addPersons($persons){
		global $file, $PersonDB, $PersonJS;
		$status ='';
		$message= '';
	
		if($persons){
			try{
				//prepare query
				$sql = "CALL ADD_PERSON(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				$stmt = $this->database->prepare($sql);
					
				foreach($persons as $person){
					error_log($file."Got person: ".json_encode($person)."\n", 3, "debug.log");
	
					$values = array();
					foreach($person as $attr => $value){
						if($attr != $PersonJS->ID)
							array_push($values, $value);
					}
	
					error_log($file."Adding Person : ".implode(" ", $values).PHP_EOL, 3, "debug.log");
	
					/*** execute the prepared statement ***/
					$success = $stmt->execute($values);
	
					if($success){
						/** added succesfully **/
						$status = 'success';
					}else{
						/** there is some problem **/
						//throw new Exception("Could not add : ".implode(" ", $values));
						$message .= "Could not add : ".implode(" ", $values).PHP_EOL;
					}
	
				}
				$message .= "Adding Completed".PHP_EOL;
	
			}
			catch(Exception $e)
			{
				$status = 'error';
					
				/*** if we are here, something has gone wrong with the database ***/
				$message = $message .'We are unable to process your request. Please try again later.';
				$message = $message.' '.($e->getMessage());
				error_log($file."Error message ".$e->getMessage()." \n", 3, "debug.log");
			}
		}
	
		return json_encode(array(
				'status' => $status,
				'message' => $message
		));
	}
	/**
	 * Used to delete the persons from the database
	 * identified by the 'ids' given in the $ids object
	 */
	function deletePersons($ids){
		global $file;
		$status ='';
		$message= '';
	
		if($ids){
			try{
				$success = true;
	
				foreach($ids as $id){
					
					$sql = "CALL DELETE_PERSON(:id)";
					$stmt = $this->database->prepare($sql);
					$success &= $stmt->execute(array(':id' => $id));
					
					if($success){
					
						/** deleted succesfully **/
						$status = 'success';
					
					}else{
						/** there is some problem **/
						//throw new Exception("Could not add : ".implode(" ", $values));
						$message .= "Could not delete person id: ".$id.PHP_EOL;
					}
	
				}
				$message .= "Deletion Completed".PHP_EOL;
	
			}
			catch(Exception $e)
			{
				$status = 'error';
					
				/*** if we are here, something has gone wrong with the database ***/
				$message = $message .'We are unable to process your request. Please try again later.';
				$message = $message.' '.($e->getMessage());
				error_log($file."Error message ".$e->getMessage()." \n", 3, "debug.log");
			}
		}
	
		return json_encode(array(
				'status' => $status,
				'message' => $message
		));
	}
	
	/**
	 * Used to update the details of the persons
	 * sent in the persons object
	 */
	function updatePersons($persons){
		global $file, $PersonDB, $PersonJS;
		$status ='';
		$message= '';
	
		if($persons){
			try{	
	
				
				$sql = "CALL UPDATE_PERSON(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
				$stmt = $this->database->prepare($sql);
					
				foreach($persons as $person){
					error_log($file."Got person: ".json_encode($person)."\n", 3, "debug.log");
	
					$values = array();
					foreach($person as $attr => $value){
						array_push($values, $value);
					}
	
					error_log($file."Updating Person : ".implode(" ", $values).PHP_EOL, 3, "debug.log");
	
					/*** execute the prepared statement ***/
					$success = $stmt->execute($values);
	
					if($success){
						/** added succesfully **/
						$status = 'success';
					}else{
						/** there is some problem **/
						//throw new Exception("Could not add : ".implode(" ", $values));
						$message .= "Could not update : ".implode(" ", $values).PHP_EOL;
					}
	
				}
				$message .= "Updating Completed".PHP_EOL;
	
			}
			catch(Exception $e)
			{
				$status = 'error';
					
				/*** if we are here, something has gone wrong with the database ***/
				$message = $message .'We are unable to process your request. Please try again later.';
				$message = $message.' '.($e->getMessage());
				error_log($file."Error message ".$e->getMessage()." \n", 3, "debug.log");
			}
		}
	
		return json_encode(array(
				'status' => $status,
				'message' => $message
		));
	}
}

?>
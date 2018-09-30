<?php
require_once 'DatabaseProvider.php';

class TestDatabaseProvider extends PHPUnit_Framework_TestCase{
	protected $dbProvider;
	
	protected function setUp(){
		$this->dbProvider = new DatabaseProvider();
	}
	
	public function testFetchPersonList(){
		$actualResponse = json_decode($this->dbProvider->fetchPersonList());
		$expectedResponse = json_decode(json_encode(array(
				"status" => "success",
				"message" => "/.*contacts found/"
		)));
		$this->assertEquals($expectedResponse->status, $actualResponse->status);
		$this->assertRegExp($expectedResponse->message, $actualResponse->message);
	}
	
	public function testAddPersons(){
		$persons = json_decode('[{"id":"1","title":"Mr","firstName":"Akash","middleName":"","lastName":"Gupta","email":"akash.gpta@gmail.com","company":"cerner","workContact":"9900322005","homeContact":"","dob":"1991-10-22","workAddress":"Manyata","homeAddress":"Babusapalya","notes":"","avatar":"no","avatarFilename":""}]');
		$actualResponse = json_decode($this->dbProvider->addPersons($persons));
		$expectedResponse = json_decode(json_encode(array(
				"status" => "success",
				"message" => "Adding Completed".PHP_EOL
		)));
		$this->assertEquals($expectedResponse->status, $actualResponse->status);
		$this->assertEquals($expectedResponse->message, $actualResponse->message);
	}
	
	public function testDeletePersons(){
		$ids = array(29, 30);
		$actualResponse = json_decode($this->dbProvider->deletePersons($ids));
		$expectedResponse = json_decode(json_encode(array(
				"status" => "success",
				"message" => "Deletion Completed".PHP_EOL
		)));
		$this->assertEquals($expectedResponse->status, $actualResponse->status);
		$this->assertEquals($expectedResponse->message, $actualResponse->message);
	}
	
	public function testUpdatePersons(){
		$persons = json_decode('[{"id":"1","title":"Mr","firstName":"Akash","middleName":"","lastName":"Gupta","email":"akash.gpta@gmail.com","company":"Cerner","workContact":"9900322005","homeContact":"","dob":"1991-10-22","workAddress":"Manyata","homeAddress":"Babusapalya","notes":"","avatar":"no","avatarFilename":""}]');
		$actualResponse = json_decode($this->dbProvider->updatePersons($persons));
		$expectedResponse = json_decode(json_encode(array(
				"status" => "success",
				"message" => "Updating Completed".PHP_EOL
		)));
		$this->assertEquals($expectedResponse->status, $actualResponse->status);
		$this->assertEquals($expectedResponse->message, $actualResponse->message);
	}
}
?>
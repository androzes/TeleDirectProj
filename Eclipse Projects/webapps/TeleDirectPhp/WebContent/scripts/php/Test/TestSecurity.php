<?php
require_once 'Security.php';

class TestSecurity extends PHPUnit_Framework_TestCase{
	protected $security, $username, $password, $token;
	
	protected function setUp(){
		$this->security = new Security();
		$this->username = "akash";
		$this->password = "akash";
	}
	
	public function testLogin(){
		
		$actualResponse = json_decode($this->security->login($this->username, $this->password));
		
		$expectedResponse = json_decode(json_encode(array(
			"status" => "success",
			"message" => "Welcome, Akash"
		)));
		
		$this->assertEquals($expectedResponse->status, $actualResponse->status);
		$this->assertEquals($expectedResponse->message, $actualResponse->message);
		
		$this->token = $actualResponse->data->session->token;
	}
	
	
	public function testValid(){
		$actualResponse = json_decode($this->security->valid($this->username, $this->token));
		
		$expectedResponse = json_decode(json_encode(array(
				"status" => "failure",
				"message" => "Session not valid"
		)));
		
		$this->assertEquals($expectedResponse->status, $actualResponse->status);
		$this->assertEquals($expectedResponse->message, $actualResponse->message);
	}
	
	public function testLogout(){
		$this->username = "akash";
	
		$actualResponse = json_decode($this->security->logout($this->username));
	
		$expectedResponse = json_decode(json_encode(array(
				"status" => "success",
				"message" => "akash has logged out successfully."
		)));
	
		$this->assertEquals($expectedResponse->status, $actualResponse->status);
		$this->assertEquals($expectedResponse->message, $actualResponse->message);
	}
	
	
}
?>
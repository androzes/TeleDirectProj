<?php
	require_once 'User.php';
	
	class TestUser extends PHPUnit_Framework_TestCase{
		protected $user, $username, $name, $priveleges;
		
		protected function setUp(){
			$this->username = "akash";
			$this->name = "Akash Gupta";
			$this->priveleges = "rw";
			
			$this->user = new User($this->username, $this->name, $this->priveleges);
		} 
		
		/** @test **/
		public function testGetUsername(){
			$this->assertSame($this->user->getUsername(), $this->username);
		}
		
		public function testGetName(){
			$this->assertSame($this->user->getName(), $this->name);
		}
		
		public function testGetPriveleges(){
			$this->assertSame($this->user->getPriveleges(), $this->priveleges);
		}
		
		public function testToArray(){
			$array = array(
				'username' => $this->username,
				'name' => $this->name,
				'priveleges' => $this->priveleges	
			);
			
			$this->assertSame($this->user->toArray(), $array);
			
		}
	}
?>
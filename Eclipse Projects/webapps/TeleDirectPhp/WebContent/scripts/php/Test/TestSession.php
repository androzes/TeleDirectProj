<?php
	require_once 'User.php';
	require_once 'Session.php';
	
	class TestSession extends PHPUnit_Framework_TestCase{
		protected $session,$user;
		
		protected function setUp(){
			$this->user = new User("akash", "Akash Gupta", "rw");
			$this->session = new Session($this->user);
		}

		public function testGetToken(){
			$this->assertNull($this->session->getToken());
			
			$this->session->setToken("ABCD");
			$this->assertEquals($this->session->getToken(), "ABCD");
		}
		
		public function testGetUser(){
			$this->assertSame($this->session->getUser(), $this->user);
		}
		
		public function testToArray(){
			$this->session->setToken("ABCD");
			$array = array(
					"token" => $this->session->getToken()
			);
			$this->assertSame($this->session->toArray(), $array);
		}
		
		public function testStart(){
			$this->assertTrue($this->session->start());
		}
		
		public function testEnd(){
			$this->assertTrue($this->session->end());
		}
	}
?>
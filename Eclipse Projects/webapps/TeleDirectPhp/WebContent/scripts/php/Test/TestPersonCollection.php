<?php
	require_once 'PersonCollection.php';
	
	class TestPersonCollection extends PHPUnit_Framework_TestCase{
		protected $pColl,$persons;
		
		protected function setUp(){
			$this->persons = array(
					array(
							"id" 		=> 1,
							"firstName" => "Akash",
							"lastName"	=> "Gupta",
							"age"		=> 23		
					),
					array(
							"id" 		=> 2,
							"firstName" => "Sagar",
							"lastName"	=> "Gupta",
							"age"		=> 21
					)
					
			);
			
			$this->pColl = new PersonCollection();
			
		}
		
		
		public function testAdd(){
			$this->assertSame($this->pColl->get(),array());
			
			$this->pColl->add($this->persons);
			$this->assertSame($this->pColl->get(), $this->persons);
		}
		
		public function testGet(){
			$this->pColl->add($this->persons);
			
			$this->assertSame($this->pColl->get(), $this->persons);
		}
		
		public function testContains(){
			$this->pColl->add($this->persons);
			$this->assertTrue($this->pColl->contains(1));
			$this->assertTrue($this->pColl->contains(2));
			$this->assertFalse($this->pColl->contains(3));
		}
		
		public function testIsEmpty(){
			$this->assertTrue($this->pColl->isEmpty());
			$this->pColl->add($this->persons);
			$this->assertFalse($this->pColl->isEmpty());
		}
		
		public function testSize(){
			$this->pColl->add($this->persons);
			$this->assertEquals(2, $this->pColl->size());
		}
	}
?>
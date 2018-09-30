<?php
class User{
	private $username;
	private $name;
	private $priveleges;
	
	function __construct($username, $name, $priveleges){
		$this->username = $username;
		$this->name = $name;
		$this->priveleges = $priveleges;
	}
	
	function getUsername(){
		return $this->username;
	}
	
	function getName(){
		return $this->name;
	}
	
	function getPriveleges(){
		return $this->priveleges;
	}
	
	function toArray(){
		return array(
				'username' => $this->username,
				'name' => $this->name,
				'priveleges' => $this->priveleges
		);
	}
}
?>
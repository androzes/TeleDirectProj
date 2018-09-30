<?php

$file = basename(__FILE__ ).': ';

class PersonCollection{
	private $pCollection;
	
	function __construct(){
		$this->pCollection = array();
	}
	
	function add($persons){
		$this->pCollection = $persons;
	}
	
	function get(){
		return $this->pCollection;
	}
	
	function contains($id){
		foreach($this->pCollection as $person ){
			if($person['id'] == $id)
				return true;
		}
		return false;
	}
	
	function isEmpty(){
		if($this->size() == 0) return true;
		return false;
	}
	
	function size(){
		return sizeof($this->pCollection);
	}
	
}



?>
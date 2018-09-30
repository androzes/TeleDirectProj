/**
	This class is an implementation of the Collection class for 
	storing a collection of 'Person' objects
**/
function PersonCollection(){
	this.collection = new Collection();
	
	this.add = function(person){
		return this.collection.add(person.getID(), person);
	}
	
	this.remove = function(id){
		return this.collection.remove(id);
	}
	
	this.contains = function(id){
		return this.collection.contains(id);
	}
	
	this.size = function(){
		return this.collection.getCount();
	}
	
	this.forEach = function(block){
		this.collection.forEach(block);
	}
	
	this.person = function(id){
		return this.collection.item(id);
	}
	
	this.isEmpty = function(){
		return this.collection.isEmpty();
	}
	
	this.serializeJSONString = function(){
		return this.collection.serializeJSONString();
	}
}
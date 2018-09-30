/**
	This class is a representation of a collection of items
	and contains functions operable on a collection object
**/
function Collection(){
	this.count = 0;
	this.collection = {};
	
	/**
		Adds a key-item pair to the collection if the key doesn't exist already.
		If the key exists already, returns 'undefined',
		Else returns the new size of the collection
	**/
	this.add=function(key,item){
		if(this.collection[key]!= undefined)
			return undefined;
		this.collection[key]=item;
		return ++this.count;
	}
	
	/**
		Removes a key-item pair from the collection.
		If the key doesn't exist, returns 'undefined',
		Else returns the new size of the collection
	**/
	this.remove=function(key){
		if(this.collection[key]==undefined)
			return undefined;
		delete this.collection[key];
		return --this.count;
	}
	
	this.item=function(key){
		return this.collection[key];
	}
	
	this.getCount =function(){
		return this.count;
	}
	
	/**
		Used to iterate through each item in the collection
		and perfom the operations defined in the block
	**/
	this.forEach=function(block){
		for (var key in this.collection) {
			if(this.collection.hasOwnProperty(key)){
				block(this.collection[key]);
			}
		}
	}
	
	this.contains = function(key){
		return !(typeof this.collection[key] === 'undefined');
	}
	
	this.isEmpty = function(){
		return this.count == 0;
	}
	
	
	/**
		Returns the JSON string representation of the collection object.
	**/
	this.serializeJSONString = function(){
		var array = [];
		this.forEach(function(item){
			array.push(item);
		});
		return JSON.stringify(array);
	}
	
}
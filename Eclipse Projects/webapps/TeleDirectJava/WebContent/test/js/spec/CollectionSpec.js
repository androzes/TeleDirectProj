describe('Collection',function(){
	var collection;
	var boy;
	
	beforeEach(function(){
		boy = {
			name 		: 'John Miller',
			age  		: 12,
			standard 	: 'VI'
		};
		
		collection = new Collection();
		collection.add('boy', boy);
	});
	
	it('should be able to add an item identified by a key',function(){
		var girl = {
			name 		: 'Selma Hayek',
			age  		: 15,
			standard 	: 'VIII'
		};
		
		expect(collection.add('girl', girl)).toBe(2);
		expect(collection.add('girl', girl)).toBeUndefined(); //adding an item with a key that already exists returns undefined
	});
	
	it('should be able to remove an item identified by a key',function(){
		expect(collection.remove('boy')).toBe(0);
		expect(collection.remove('boy')).toBeUndefined();
	});
	
	it('should be able to get an item identified by a key',function(){
		expect(collection.item('boy')).not.toBeNull();
		expect(collection.item('boy')).toBe(boy);
	});
	
	it('should be able to get the size of collection',function(){
		expect(collection.getCount()).toEqual(1);
	});
	
	it('should be able to tell whether it contains a key',function(){
		expect(collection.contains('boy')).toBeTruthy();
		expect(collection.contains('animal')).toBeFalsy();
	});
	
	it('should be able to tell whether the collection is empty',function(){
		expect(collection.isEmpty()).toBeFalsy();
		collection.remove('boy');
		expect(collection.isEmpty()).toBeTruthy();
	});
	
	it('should be able to iterate over all the items',function(){
		var girl = {
			name 		: 'Selma Hayek',
			age  		: 15,
			standard 	: 'VIII'
		};
		
		collection.add('girl', girl);
		
		var items = [];
		collection.forEach(function(item){
			items.push(item);
		});
		
		expect(items[0]).toBe(boy);
		expect(items[1]).toBe(girl);
	});
	
	it('should be able to return the JSON String representation of the collection',function(){
		boyJSON = '[{"name":"John Miller","age":12,"standard":"VI"}]';
		expect(collection.serializeJSONString()).toEqual(boyJSON);
	});
	
});
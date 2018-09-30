describe('Date',function(){
	
	it('shoulf be able to return a zero padded number',function(){
		expect(twoDigits(9)).toEqual('09');
		expect(twoDigits(1)).toEqual('01');
		expect(twoDigits(-3)).toEqual('-03');
		expect(twoDigits(13)).toEqual('13');
	});
	
	it('should be able to return a date in the SQL format',function(){
		var date = new Date('12/13/2015');
		expect(date.toSQLDateFormat()).toEqual('2015-12-13');
	});
});
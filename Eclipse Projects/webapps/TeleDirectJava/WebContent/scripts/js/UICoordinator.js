function UICoordinator(){
	this.request = null;
	this.response = null;
	
	/**
		Sends an AJAX request to the server with the given request,
		eventHandler and an optional scriptName
	**/
	this.sendRequest = function(request, eventHandler, scriptName){
		if(scriptName === undefined){
			scriptName = 'ServerMain';
		}
		
		request = this.toJSONText(request);
		console.log(request);
		
		$.ajax({
			type: "POST",
			url: "http://localhost:8080/TeleDirectJavaServer/"+scriptName+".jsp",
			data: "json=" + request,
			dataType: "json",
			
			success: function(response){
				if(typeof eventHandler.success === 'function'){
					eventHandler.success(response);
				}
			},
			
			error: function(XMLHttpRequest, textStatus, errorThrown) { 
				if(typeof eventHandler.error === 'function'){
					eventHandler.error(XMLHttpRequest, textStatus, errorThrown);
				}
			},   
			
			complete: function(){
				if(typeof eventHandler.complete === 'function'){
					eventHandler.complete();
				}
			},
			
			beforeSend:function(){		
				if(typeof eventHandler.beforeSend === 'function'){
					eventHandler.beforeSend();
				}
			}
		});
	}
	
	this.toJSONObject = function (obj){
		return JSON.parse(JSON.stringify(obj));
	}
	this.toJSONText = function (obj){
		return JSON.stringify(obj);
	}
}

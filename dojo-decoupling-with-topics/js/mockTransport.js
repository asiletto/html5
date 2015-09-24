//astrazione della sorgente dati RESTful
define(["dojo/_base/array"], function(array){
	return {
		getStruttura: function (callback, errorCallback){
			console.log("transport::getStruttura start");

			//servizio mock, da sostituire in seguito con chiamate a servizi REST
			require(["dojo/text!js/mockServices/struttura.json"], function(data){
				callback(JSON.parse(data));
			});

			/*
			request(baseUrl + "rest/struttura?tipo="+tipo, {handleAs: "json"})
			.then(function(data){
				if(data.result.type==0)
					callback(data);
				else
					errorCallback(data.result);	
			}, function(err){
					errorCallback(err);
			});
			*/
			
			console.log("transport::getStruttura end");
		},
		
		getDettaglio: function (id, callback, errorCallback){
			console.log("transport::getDettaglio start");
			
			require(["dojo/text!js/mockServices/struttura.json"], function(data){
				var obj = JSON.parse(data);

				array.forEach(obj.list, function(item){
					if(item.id === id)
						callback(item);
				});
				
			});

			console.log("transport::getDettaglio end");
		}
		
	};

});
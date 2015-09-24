define([/*moduli dojo*/
		"dojo/_base/declare", "dojo/_base/array", "dojo/topic", "dojo/_base/lang", "dojo/dom-construct", "dojo/on", "dojo/query", 
		"dojo/dom-attr", "dojo/dom", "dojo/_base/config", "dojo/io-query", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojox/dtl/_DomTemplated",
		/*moduli applicativi*/
		"dojo/text!js/templates/dettaglioEstesoWidget.html","js/mockTransport"], 
	
	function(declare, array, topic, lang, domConstruct, on, query, domAttr, dom, config, ioQuery, _WidgetBase, _TemplatedMixin, _DomTemplated,
			template, transport){
    	 
	return declare([ _WidgetBase, _TemplatedMixin, _DomTemplated ], {			
		
		constructor: function(){
			this.templateString = template;
		},
		
		postCreate : function() {
			//aggancio gli eventi di dojo/topic
			topic.subscribe("/strutturaSelezionata", lang.hitch(this, "onStrutturaSelezionata"))
		},
						
		startup: function(){
			
		},
		
		onStrutturaSelezionata: function(id){
			console.log("evento strutturaSelezionata ricevuto:"+id);

			//faccio una seconda chiamata per avere il dettaglio
			transport.getDettaglio(
				id,
				lang.hitch(this, "onDettaglioSuccess"),
				lang.hitch(this, "genericErrorCallback")
			);			
			
		},
		
		onDettaglioSuccess: function(data){
			console.log("onDettaglioSuccess, data:",data);
			
			//leggo coordinate e zoom
			var coords = data.coordinates;

			var arr = coords.split(",");
			var zoom = arr[2];
			console.log("zoom:",zoom);
			zoom = zoom.substring(0, zoom.length - 1);
			zoom = Math.round( parseFloat(zoom) ) - 2;
			//inserisco l'immagine statica di google maps
			domConstruct.empty(this.dettaglioContainer);

			var node1 = domConstruct.toDom("<h3>Mappa di:"+data.name+"</h3>");
			domConstruct.place(node1, this.dettaglioContainer, 'last');


			var node2 = domConstruct.toDom("<img src=\"https://maps.googleapis.com/maps/api/staticmap?maptype=satellite&center="+arr[0]+","+arr[1]+"&zoom="+zoom+"&size=640x400&key=AIzaSyAWUPYYTDKVgenO120UirM4MKwSNE831Oc\"/>");
			domConstruct.place(node2, this.dettaglioContainer, 'last');
			
		},
		genericErrorCallback: function(method, error){
			
			console.log("error on method "+method+":", error);
			
			alert("error calling "+method+" :" +error.message);
		}
		
	});

});

define([/*moduli dojo*/
		"dojo/_base/declare", "dojo/_base/array", "dojo/topic", "dojo/_base/lang", "dojo/dom-construct", "dojo/on", "dojo/query", 
		"dojo/dom-attr", "dojo/dom", "dojo/_base/config", "dojo/io-query", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojox/dtl/_DomTemplated",
		/*moduli applicativi*/
		"dojo/text!js/templates/dettaglioWidget.html","js/mockTransport"], 
	
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
			domConstruct.empty(this.dettaglioContainer);
			var node = domConstruct.toDom("hai selezionato: "+id);
			domConstruct.place(node, this.dettaglioContainer, 'last');
			
		},
		
	});

});

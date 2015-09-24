define([/*moduli dojo*/
		"dojo/_base/declare", "dojo/_base/array", "dojo/topic", "dojo/_base/lang", "dojo/dom-construct", "dojo/on", "dojo/query", 
		"dojo/dom-attr", "dojo/dom", "dojo/_base/config", "dojo/io-query", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dojox/dtl/_DomTemplated",
		/*librerie esterne*/
		"js/ext/vanillatree",
		/*moduli applicativi*/
		"dojo/text!js/templates/strutturaWidget.html","js/mockTransport"], 
	
	function(declare, array, topic, lang, domConstruct, on, query, domAttr, dom, config, ioQuery, _WidgetBase, _TemplatedMixin, _DomTemplated,
			VanillaTree,
			template, transport){
    	 
	return declare([ _WidgetBase, _TemplatedMixin, _DomTemplated ], {			
		
		constructor: function(){
			this.templateString = template;
		},
		
		postCreate : function() {
			
		},
						
		startup: function(){
			
			//dopo aver caricato il widget faccio la chiamata ajax
			transport.getStruttura(
				lang.hitch(this, "getStrutturaSuccess"),
				lang.hitch(this, "genericErrorCallback")
			);
			
		},
		
		getStrutturaSuccess: function(data){
			//se i dati sono stati caricati con successo
			console.log("getStrutturaSuccess, data:",data);
			
			//creo il tree
			this.tree = new VanillaTree(this.treeContainer, {
			  placeholder: 'loading...'
			});
			
			var self = this;
			
			//aggiungo i nodi
			array.forEach(data.list, function(item){
				self.tree.add({
				  id: item.id,
				  parent: item.parent,
				  label: item.name
				});
			});
			
			//aggiungo gli eventi
			on(this.treeContainer, "vtree-select", function(evt){
				console.log(evt.detail.id + ' is selected');
				//sulla selezione invio un messaggio sul topic
				topic.publish("/strutturaSelezionata", evt.detail.id);
			});

			on(this.treeContainer, "vtree-close", function(evt){
				console.log(evt.detail.id + ' is closed');
			});

			on(this.treeContainer, "vtree-open", function(evt){
				console.log(evt.detail.id + ' is opened');
			});
			
		},
		
		genericErrorCallback: function(method, error){
			
			console.log("error on method "+method+":", error);
			
			alert("error calling "+method+" :" +error.message);
		}
		
	});

});

define(["jquery"], function($) {

	function BaseComponent(containerId, warningId){
		this.containerId = containerId;
		this.warningId = warningId;
	}

	BaseComponent.prototype.initialize = function(){
		try{
			this.init();
		}catch(err){
			this.warning("errore:" + err);
			//qui si puo' ad esempio nascondere il componente o gestire l'errore
			//this.hide();
		}
	}

	BaseComponent.prototype.warning = function(msg){
		console.log(this.containerId + " warning()");
		$("#" + this.warningId).append(msg);
	}

	BaseComponent.prototype.hide = function(){
		console.log(this.containerId + " hide()");
		$("#" + this.containerId).css({display:"none"});
	}
	
	BaseComponent.prototype.show = function(){
		console.log(this.containerId + " show()");
		$("#" + this.containerId).css({display:"block"});
	}
	
  return BaseComponent;
});
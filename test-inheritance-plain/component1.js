function MyComponent(containerId, warningId){		
	BaseComponent.call( this, containerId, warningId);
}

MyComponent.prototype = Object.create( BaseComponent.prototype );

MyComponent.prototype.init = function(){
	console.log(this.containerId + " init()");
	throw new Error("prova lancio eccezione dal componente");
	$("#" + this.containerId).html("hello world");	
}

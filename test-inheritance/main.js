require.config({
    "paths": {
        "jquery": "../lib/jquery"
    }
});

require(['jquery', 'component1'], function ($, MyComponent) {
	$( document ).ready(function() {

		console.log( "ready!" );

		var comp = new MyComponent("div1", "errors");
		comp.initialize();
		
	}); 	

	
});

	

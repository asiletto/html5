require.config({
    "paths": {
        "jquery": "../lib/jquery"
    }
});

require(['jquery', 'page'], function ($, Page) {
	$( document ).ready(function() {

		console.log( "ready!" );

		var page = new Page();
		page.setup();

		
	}); 	

	
});

	

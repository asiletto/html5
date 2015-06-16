$(function () {
    "use strict";

    var socket = $.atmosphere;
    var name = Math.floor((Math.random() * 1000000) + 1);
    
    // We are now ready to cut the request
    var request = { url: 'http://127.0.0.1:8080/test-ws', contentType : "application/json", transport : 'websocket'};

    request.onOpen = function(response) {
        console.log('Atmosphere connected using ' + response.transport );

        subSocket.push(jQuery.stringifyJSON({ name:name, text:"hello"}));
    };

    request.onMessage = function (response) {
        var message = response.responseBody;
        try {
            var json = jQuery.parseJSON(message);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message);
            return;
        }

        console.log("received: ",message);

    };

    request.onClose = function(response) {
    	console.log('socket closed')
    }

    request.onError = function(response) {
        console.log('Sorry, but there\'s some problem with your socket or the server is down');
    };

    console.log("subscribing...");
    var subSocket = socket.subscribe(request);

    

});


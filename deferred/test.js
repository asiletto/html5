//da http://stackoverflow.com/questions/17718673/how-is-a-promise-defer-library-implemented
var Promise = function () {};
Promise.prototype = {
	done: function (callback) {
		this.okCallback = callback;
		return this;
	},
	fail: function (callback) {
		this.koCallback = callback;
		return this;
	}
};

var Defer = function () {
  this.promise = new Promise();
};
Defer.prototype = {
	resolve: function (data) {
		var self = this;
		setTimeout(function(){ self.promise.okCallback(data); }, 0);
	},
	reject: function (error) {
		var self = this;
		setTimeout(function(){ self.promise.koCallback(error); }, 0);
  }
};

//TEST
function test(name) {
	
	var defer = new Defer();

	if(name == "pippo")
		defer.resolve("correct name");
	else
		defer.reject("wrong name, should be 'pippo'");

	return defer.promise;
}

test("pluto").done(function (text) {
	console.log("success: "+text);
}).fail(function (error) {
	console.log("error: " + error);
});

test("pippo").done(function (text) {
	console.log("success: "+text);
}).fail(function (error) {
	console.log("error: " + error);
});

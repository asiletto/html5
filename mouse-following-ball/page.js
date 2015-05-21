define(["jquery","ball"], function($, Ball) {

	function Page(){
		this.elementID = null;
		this.balls = [];
		this.colors = [
			"Red",
			"Cyan",
			"Blue",
			"DarkBlue",
			"LightBlue",
			"Purple",
			"Yellow",
			"Lime",
			"Magenta"
		];
	}

	Page.prototype.setup = function(){
		var self = this;
		this.elementID = 'canvas' + $('canvas').length; // Unique ID

		$('<canvas>').attr({ id: this.elementID }).appendTo('body');
		
		window.addEventListener('resize', this.resizeCanvas, false);
		
		this.canvas = document.getElementById(this.elementID);
		this.ctx = this.canvas.getContext("2d");

		
		this.resizeCanvas();
		
		this.balls.push( new Ball(
							self.getRandom(100), 
							self.getRandom(100), 
							3, 
							self.getRandom(100), 
							self.getRandomColor(), 
							self.getRandomColor(),
							this.elementID)
						);
		
		setInterval(function(){self.redraw();}, 10);
	}

	Page.prototype.getRandom = function(max){
		return Math.floor((Math.random() * max) + 2);
	}

	Page.prototype.getRandomColor = function(){
		return this.colors[ Math.floor((Math.random() * this.colors.length) + 1) ];
	}
	
	Page.prototype.redraw = function(){

		this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		$.each(this.balls, function( index, ball ) {
			ball.draw();
			ball.move();
		});
	}
	
	Page.prototype.resizeCanvas = function(){
		console.log("resizeCanvas");
		$("#" + this.elementID).attr("width", window.innerWidth);    
		$("#" + this.elementID).attr("height", window.innerHeight); 
	}
	
	Page.prototype.getCanvasId = function(){
		return this.elementID;
	}	
	
	
  return Page;
});
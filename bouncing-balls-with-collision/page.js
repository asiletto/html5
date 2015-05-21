define(["jquery","bouncingBall"], function($, BouncingBall) {

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
		this.elementID = 'canvas01';

		$('<canvas>').attr({ id: this.elementID }).appendTo('body');
		
		window.addEventListener('resize', this.resizeCanvas, false);
		
		this.canvas = document.getElementById(this.elementID);
		this.ctx = this.canvas.getContext("2d");

		
		this.resizeCanvas();
		
		for(x=0;x<5;x++){
			this.balls.push( new BouncingBall(
								(x+1)*100, 
								(x+1)*100, 
								self.getRandom(20), 
								self.getRandom(20),
								50, 
								"red", 
								"#c0c0c0",
								this.elementID)
							);
		}
		
		setInterval(function(){self.redraw();}, 30);
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
			ball.move();
		});
		
		var self = this;
		
		$.each(self.balls, function( index1, ball1 ) {
			$.each(self.balls, function( index2, ball2 ) {
				if(index1 !== index2){//not the same ball
					if(ball1.AABBOverlaps(ball2)){
						if(ball1.collided(ball2)){
							
						}
					}
				}
			});
		});

		$.each(this.balls, function( index, ball ) {
			ball.draw();
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
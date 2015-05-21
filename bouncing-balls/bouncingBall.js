define(["jquery",], function($) {

	function BouncingBall(x, y, xVel, yVel, radius, borderColor, color, canvasId){
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");
		this.x = x - radius < 0 ? x + radius : x;
		this.y = y - radius < 0 ? y + radius : y;
		this.color = color;
		this.borderColor = borderColor;
		this.radius = radius;
		this.xIncr = xVel;
		this.yIncr = yVel;
	}

	BouncingBall.prototype.draw = function(){
		this.ctx.fillStyle = this.color;
		this.ctx.strokeStyle = this.borderColor;
		this.ctx.beginPath();
		this.ctx.lineWidth   = 10;
		this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		this.ctx.stroke();
		this.ctx.fill();
	}


	BouncingBall.prototype.move = function(){
		this.x = this.x + this.xIncr;
		this.y = this.y + this.yIncr;
		
		if(this.x + this.radius > window.innerWidth)
			this.xIncr = this.xIncr * -1;
		if(this.x - this.radius < 0)
			this.xIncr = this.xIncr * -1;
		
		if(this.y + this.radius > window.innerHeight)
			this.yIncr = this.yIncr * -1;
		if(this.y - this.radius < 0)
			this.yIncr = this.yIncr * -1;
	}	
	
  return BouncingBall;
});
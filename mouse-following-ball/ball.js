define(["jquery",], function($) {

	function Ball(x, y, vel, radius, borderColor, color, canvasId){
		var self = this;
		this.canvas = document.getElementById(canvasId);
		this.ctx = this.canvas.getContext("2d");
		this.x = x - radius < 0 ? x + radius : x;
		this.y = y - radius < 0 ? y + radius : y;
		this.color = color;
		this.borderColor = borderColor;
		this.radius = radius;
		this.vel = vel;
		this.mouseX = window.innerWidth / 2;
		this.mouseY = window.innerHeight / 2;
	
		this.canvas.onmousemove = function(e) {
            self.mouseX = e.clientX;
            self.mouseY = e.clientY;
        };
	}

	Ball.prototype.draw = function(){
		this.ctx.fillStyle = this.color;
		this.ctx.strokeStyle = this.borderColor;
		this.ctx.beginPath();
		this.ctx.lineWidth   = 10;
		this.ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		this.ctx.stroke();
		this.ctx.fill();
	}


	Ball.prototype.move = function(){
		console.log("this.mouseX: ",this.mouseX);
		console.log("this.mouseY: ",this.mouseY);

		
		var dX = Math.abs(this.x - this.mouseX);
		var dY = Math.abs(this.y - this.mouseY);
		console.log("dX: "+ dX + " dY: "+dY);
		
		var pX = (dX * 100) / (dX + dY);
		var pY = (dY * 100) / (dX + dY);
		console.log("pX: "+ pX + " pY: "+pY);

		var velX = ((this.vel * pX) / 100);
		var velY = ((this.vel * pY) / 100);
		console.log("vel: "+this.vel+" velX: "+ velX + " velY: "+velY);
		
		if(this.x > this.mouseX)
			this.x = this.x - velX;
		else
			this.x = this.x + velX;
			
		if(this.y > this.mouseY)
			this.y = this.y - velY;
		else
			this.y = this.y + velY;
		
		if(this.x > window.innerWidth)
			this.x = window.innerWidth;

		if(this.y > window.innerHeight)
			this.y = window.innerHeight;
		
	}	
	
  return Ball;
});
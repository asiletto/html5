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
		this.inCollision=false;
		this.alreadyCollided = false;
	}

	BouncingBall.prototype.draw = function(){
		this.ctx.fillStyle = this.color;
		if(this.inCollision)
			this.ctx.strokeStyle = "blue";
		else
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
		
		if(this.x + this.radius > window.innerWidth){
			this.xIncr = this.xIncr * -1;
			this.x = window.innerWidth - this.radius;
		}
		if(this.x - this.radius < 0){
			this.xIncr = this.xIncr * -1;
			this.x = this.radius;
		}
		
		if(this.y + this.radius > window.innerHeight){
			this.yIncr = this.yIncr * -1;
			this.y = window.innerHeight - this.radius;
		}
		if(this.y - this.radius < 0){
			this.yIncr = this.yIncr * -1;
			this.y = this.radius;
		}
		
		this.inCollision = false;
		this.alreadyCollided = false;
	}	
	
	
	/*
	   http://gamedevelopment.tutsplus.com/tutorials/when-worlds-collide-simulating-circle-circle-collisions--gamedev-769
	   
	   AABB stands for axis-aligned bounding box,
	   and refers to a rectangle drawn to fit tightly
	   around an object, aligned so that its sides
	   are parallel to the axes.
	 */
	BouncingBall.prototype.AABBOverlaps = function(secondBall){
		if (this.x + this.radius + secondBall.radius > secondBall.x 
			&& this.x < secondBall.x + this.radius + secondBall.radius
			&& this.y + this.radius + secondBall.radius > secondBall.y 
			&& this.y < secondBall.y + this.radius + secondBall.radius)
			return true;
		return false;
	}
	
	BouncingBall.prototype.collided = function(secondBall){
		var distance = Math.sqrt(
			(
				(this.x - secondBall.x) * (this.x - secondBall.x)
			)
			+
			(
				(this.y - secondBall.y) * (this.y - secondBall.y)
			)
		);
		
		if (distance < this.radius + secondBall.radius){
			this.inCollision = true;
			if(this.alreadyCollided == false && secondBall.alreadyCollided == false){
				var thisRadiusSum = (this.radius + secondBall.radius);
				var thisRadiusDiff = (this.radius - secondBall.radius);
				var thisXIncr = (this.xIncr * thisRadiusDiff + (2 * secondBall.radius * secondBall.xIncr)) / thisRadiusSum;			
				var thisYIncr = (this.yIncr * thisRadiusDiff + (2 * secondBall.radius * secondBall.yIncr)) / thisRadiusSum;
				
				var otherRadiusSum = (secondBall.radius + this.radius);
				var otherRadiusDiff = (secondBall.radius - this.radius);
				var otherXIncr = (secondBall.xIncr * otherRadiusDiff + (2 * this.radius * this.xIncr)) / otherRadiusSum;			
				var otherYIncr = (secondBall.yIncr * otherRadiusDiff + (2 * this.radius * this.yIncr)) / otherRadiusSum;
				
				this.xIncr = thisXIncr;
				this.yIncr = thisYIncr;
				this.alreadyCollided = true;
				
				secondBall.xIncr = otherXIncr;
				secondBall.yIncr = otherYIncr;
				secondBall.alreadyCollided = true;
			}
			
		}
		return this.inCollision;
	}


  return BouncingBall;
});
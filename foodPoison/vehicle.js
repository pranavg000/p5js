class Vehicle {

	constructor(DNA){
		this.acceleration = createVector(0,0);
		this.velocity = createVector(0,-2);
		this.location = createVector(random(0,width),random(0,height));
		this.r = 3;
		this.maxspeed = 5;
		this.maxacc = 0.5;
		this.maxHealth = 100;
		this.health = this.maxHealth;
		//this.DNA = [random(-2,2),random(-2,2)];
		if(!DNA){
		this.DNA = [];
		this.DNA[0] = random(-maxAttraction,maxAttraction);
		this.DNA[1] = random(-maxAttraction,maxAttraction);
		this.DNA[2] = random(0,maxRadius);
		this.DNA[3] = random(0,maxRadius);
		}
		else {
			this.DNA = DNA;
		}
		this.score = 0;
	}

	seek(target, index){
		let desired = p5.Vector.sub(target, this.location);

		desired.limit(this.maxspeed);

		let steer = p5.Vector.sub(desired, this.velocity);
		steer.mult(this.DNA[index]);
		steer.limit(this.maxacc);
		this.applyAcceleration(steer);
	}

	eat(food) {
		let smallG = Infinity;
		let smallB = Infinity;
		let nearestFoodG = -1;
		let nearestFoodB = -1;
		let dist = 0.0;
		for(let i=0; i<food.length ;i++){
			if(food[i].type===1){
			dist = this.location.dist(food[i].location);
			if(dist<smallG && dist<this.DNA[3]){
				smallG = dist;
				nearestFoodG = i;
			}
		}
			if(food[i].type===0){
			dist = this.location.dist(food[i].location);
			if(dist<smallB&& dist<this.DNA[2]){
				smallB = dist;
				nearestFoodB = i;
			}
		}
		}
		if(nearestFoodB>-1){
			this.seek(food[nearestFoodB].location,0);
		}
		if(nearestFoodG>-1){
			this.seek(food[nearestFoodG].location,1);
		}
	}



	applyAcceleration(acc) {
    this.acceleration.add(acc);
   }

   update() {
   	this.score++;
    this.health -= 0.5;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  hasEatenFood(food){
  	for(let j=0;j<food.length;j++){
  		if(p5.Vector.dist(this.location, food[j].location)<5){
  			food[j].isEaten = true;
  			if(food[j].type===1){
  				this.health += 20;
  				if(this.health>100){
  						this.health = 100;
  				}
  				
  			}
  			else if(food[j].type===0){
  				this.health -=20;
  				// if(this.DNA[0]<this.DNA[1])
  				// 	console.log("no");
  			}
  	}
  	}
  }

  isDead(){
  		return this.health<=0;
  }

   display() {
   	let green = map(this.health,0,this.maxHealth,0,255);
    var theta = this.velocity.heading() + PI / 2;
    fill(255-green,green,0);
   	noStroke();
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    if(debug) {
    noFill();
    stroke(0,255,0);
    strokeWeight(0.5);
    line(0,0,0,-this.DNA[1]*20);
    ellipse(0,0,this.DNA[3]*2);
    stroke(255,0,0);
    strokeWeight(0.5);
    line(0,0,0,this.DNA[0]*20);
    ellipse(0,0,this.DNA[2]*2);
	}
    pop();
  }

  boundary(){
  	let targetVel;
  	if((width-this.location.x)<boundThickness){
  		targetVel = createVector(-this.maxspeed, this.velocity.y);
  	}
  	
  	else if((this.location.x)<boundThickness){
  		targetVel = createVector(this.maxspeed, this.velocity.y);
  	}

	if((height-this.location.y)<boundThickness){
  		targetVel = createVector(this.velocity.x, -this.maxspeed);
	}

	if((this.location.y)<boundThickness){
  		targetVel = createVector(this.velocity.x, this.maxspeed);
	  	
	}

	if(targetVel != null){
		let steer = p5.Vector.sub(targetVel, this.velocity);
		steer.limit(this.maxacc);
		this.applyAcceleration(steer);
	  
	}
	}



}


class Vehicle {

	constructor(x,y,vx,vy){
		this.acceleration = createVector(0,0);
		this.velocity = createVector(vx,vy);
		this.location = createVector(x,y);
		this.r = 5;
		this.maxspeed = 3;
		this.maxacc = 0.05;
		
	}

	seek(target){

		

		let desired = p5.Vector.sub(target, this.location);

		

		if(desired.x===0 && desired.y === 0) return; 

		desired.setMag(this.maxspeed);

		

		let steer = p5.Vector.sub(desired, this.velocity);

		steer.limit(this.maxacc);
		//steer.mult(2);
		this.applyAcceleration(steer);
	}

	align(vehicles){
		let desired = createVector(0,0);
		let neighs = 25;
		let dist =0.0;
		let count=0;
		for (let v of vehicles){
			dist = p5.Vector.dist(v.location, this.location)
			if(dist>0 && dist<neighs)
			{
				desired.add(v.velocity);
				count++;
			}
		}
		if(count>0)
		desired.div(count);
		desired.limit(this.maxspeed);
		let steer = p5.Vector.sub(desired, this.velocity);

		steer.limit(this.maxacc);
		this.applyAcceleration(steer);
	}

	applyAcceleration(acc) {
    this.acceleration.add(acc);
   }


   seperate(vehicles){
   		let desired = createVector(0,0);
		let desiredSeperation = this.r*2;
		let dist =0.0;
		let count=0;
		let dir = createVector(0,0);
		for (let v of vehicles){
			dist = p5.Vector.dist(v.location, this.location)
			if(dist>0 && dist<desiredSeperation)
			{	dir = p5.Vector.sub(this.location, v.location);
				desired.add(((p5.Vector).div(dir,dist)));
				count++;
			}
		}
		if(count>0)
		desired.div(count);
		desired.limit(this.maxspeed);
		let steer = p5.Vector.sub(desired, this.velocity);

		steer.limit(this.maxacc);
		steer.mult(0.5);
		this.applyAcceleration(steer);
   }

   cohesion(vehicles){
   		//let desired = createVector(0,0);
   		let desiredLoc = createVector(0,0);
		let neighs = 25;
		let dist =0.0;
		let count=0;
		for (let v of vehicles){
			dist = p5.Vector.dist(v.location, this.location)
			if(dist>0 && dist<neighs)
			{
				desiredLoc.add(v.location);
				count++;
			}
		}
		if(count>0)
		{desiredLoc.div(count);
		// desiredLoc.limit(this.maxspeed);
		// let steer = p5.Vector.sub(desiredLoc, this.velocity);

		// steer.limit(this.maxacc);
		// this.applyAcceleration(steer);

		this.seek(desiredLoc);}
   }


   update() {
       
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

   display() {
    
    ellipse(this.location.x, this.location.y,this.r*2,this.r*2);


  }

   borders() {
    if (this.location.x < -this.r) this.location.x = width + this.r;
    if (this.location.y < -this.r) this.location.y = height + this.r;
    if (this.location.x > width + this.r) this.location.x = -this.r;
    if (this.location.y > height + this.r) this.location.y = -this.r;
  }

}
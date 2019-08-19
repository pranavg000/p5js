class Vehicle {

	constructor(x,y){
		this.acceleration = createVector(0,0);
		this.velocity = createVector(0,0);
		this.location = createVector(x,y);
		console.log(x,y);
		this.r = 3;
		this.maxspeed = 3;
		this.maxacc = 0.5;

	}

	seek(){

		let T = 0 ;

		// T = p5.Vector.sub(target, this.location).mag();
		// T/=3;
		
		let desired = field.followField(this.location.x, this.location.y);

		// let desired = p5.Vector.sub(p5.Vector.add(target, (p5.Vector.mult(targetVel,T))), this.location);
		//let desired = p5.Vector.sub(target, this.location);
		//let d = desired.mag();
		//console.log(desired.x, desired.y);
		let m = this.maxspeed;
		// let m;
		// if(d<50){
		// 	m = map(d,0,50,0,this.maxspeed);
		// }
		// else m = this.maxspeed;

		//if(d>maxspeed)
		desired.setMag(m);

		

		let steer = p5.Vector.sub(desired, this.velocity);

		steer.limit(this.maxacc);
		//console.log(steer);
		this.applyAcceleration(steer);
	}

	applyAcceleration(acc) {
    this.acceleration.add(acc);
   }

   update() {
       
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

   display() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;
    fill(127);
    //stroke(200);
    strokeWeight(1);
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }

}
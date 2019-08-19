class Particle{
	constructor(x,y,vy,lifespan){
		this.location = createVector(x,y);
		this.velocity = createVector(0,vy);
		// this.lifespan = lifespan;
		this.acceleration = createVector(0,0);
		this.color = createVector(Math.floor(random(0,255)),Math.floor(random(0,255)),Math.floor(random(0,255)));
    // console.log(this.color);

		this.radius = 2;
	}

	applyAcceleration(acc) {
    this.acceleration.add(acc);
   }

   update() {
    // this.lifespan--;
    this.velocity.add(this.acceleration);
    //this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);

  }

  display(){
  	fill(this.color.x,this.color.y,this.color.z);
  	noStroke();
  	ellipse(this.location.x,this.location.y,this.radius*2);
  }


}
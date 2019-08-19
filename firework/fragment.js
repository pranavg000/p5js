class Fragment{
	constructor(x,y,color){
		this.location = createVector(x,y);
		this.velocity = p5.Vector.random2D().setMag(random(0,3));
		this.lifespan = 50;
    // console.log(color);
		this.acceleration = createVector(0,0);
		this.color = color;
		this.radius = 1;
    this.prev = this.location;
	}

	applyAcceleration(acc) {
    this.acceleration.add(acc);
   }

   update() {
    this.lifespan--;
    this.prev = this.location;
    this.velocity.add(this.acceleration);
    //this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    //console.log(this.lifespan);
  }

  display(){

    let alpha = map(this.lifespan,0,25,0,255);
  	fill(this.color.x,this.color.y,this.color.z,alpha  );
    // console.log(this.color.x,this.color.y,this.color.z,this.location.x,this.location.y);
    
  	ellipse(this.location.x,this.location.y,this.radius*2);
   // line(this.prev.x,this.prev.y,this.location.x,this.location.y);
    
  }


}
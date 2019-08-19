class Vehicle {

	constructor(genes){
		this.acceleration = createVector(0,0);
		this.location = createVector(width/2,height);
		this.r = 3;
		this.maxspeed = 4;
		this.velocity = createVector(0,0);
		//this.velocity = p5.Vector.random2D().setMag(this.maxspeed);
		this.maxacc = maxA;
		this.lifespan = 200;
		this.score = 0.0;
		this.fitness = 0.0;
		if(genes){
		this.dna = new DNA(genes);
		}
		else{
		this.dna = new DNA();
		}

	}

	seek(target, targetVel){

		let desired = p5.Vector.sub(target, this.location);		
		desired.limit(this.maxspeed);

		let steer = p5.Vector.sub(desired, this.velocity);

		steer.limit(this.maxacc);
		this.applyAcceleration(steer);
	}

	applyAcceleration(acc) {
    this.acceleration.add(acc);
   }

   applyGenes(){

   	this.applyAcceleration(this.dna.genes[counter]);

   }

   update() {
       
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

   isDead(obstacles){
   	let ob = this.hitObstacle(obstacles)
   	if(this.location.x<0 || this.location.x>width || this.location.y<0 || this.location.y>height || counter> frames){
   		this.calcScore(0,ob[1]);
   		return true;
   	}
   	else if (ob[0]){
   			this.calcScore(-1, ob[1]);
   			

   			return true;
   		
   		
   	}
   	else if (this.targetHit()){
   		this.calcScore(1,ob[1]);
   		console.log('HIT')
   		return true;
   	}
   	else {
   		
   		return false;
   	}
   }


   hitObstacle(obstacles){
   	let f = 0;
   	let noo = 0;
   	for(let obstacle of obstacles){
   		if(this.location.y<obstacle.start.y){
   			noo++;
   		}
   		if(this.location.x<obstacle.end.x && this.location.x>obstacle.start.x 
   			&& this.location.y<obstacle.end.y && this.location.y>obstacle.start.y){
   			//console.log('Hit');
   			f=1;

   		}
   		
   	}
   	if(f===1){
   		return [true, noo];
   		}
   		else return [false, noo];
   }

   targetHit(){
   	let dist = p5.Vector.dist(this.location, target);
   	// if((this.location.x < (target.x+targetSize/2)) && (this.location.x > (target.x-targetSize/2)) &&
   	//  (this.location.y < (target.y+targetSize/2)) && (this.location.y > (target.y-targetSize/2)))
   	if(dist < (targetSize/2))
   		return true;
   	else {
   		return false;
   	}
   }

   calcScore(ret, noo){
   	let dist = p5.Vector.dist(this.location, target);
   		this.score = (100/dist);
   		
   	if (ret === 1) this.score *= 100;
    if (ret != 1) {this.score /= 10; }
    if (this.location.y >= height) this.score /= 2;
    if (this.location.y < 0) this.score /= 2;
    
   	//this.score += ((oby/width)*40);
   	if(noo===2)
   	console.log(Math.pow(3,noo));
    this.score *= Math.pow(3,noo);
   }

   display() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI / 2;
    fill(127,100);
    stroke(200);
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
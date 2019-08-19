class Vehicle {

	constructor(x,y,paths){
		this.acceleration = createVector(0,0);
		this.velocity = createVector(0,1);
		this.location = createVector(x,y);
		this.r = 5;
		this.maxspeed = 4;
		this.maxacc = 0.3;
		this.paths = paths;
	}

	seek(target){

		// let T = 0 ;

		// T = p5.Vector.sub(target, this.location).mag();
		// T/=3;
		

		let desired = p5.Vector.sub(target, this.location);

		// let d = desired.mag();
		// let m;
		// if(d<50){
		// 	m = map(d,0,50,0,this.maxspeed);
		// }
		// else m = this.maxspeed;

		if(desired.x===0 && desired.y === 0) return; 

		//if(d>maxspeed)
		desired.setMag(this.maxspeed);

		desired.limit(this.maxspeed);

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
    fill(180);
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

  findnpv(pt){
  	let small = 2000.0;
  	let fsmall = 2000.0;
  	let snp = createVector(0,0);
  	let fsnp = createVector(0,0);
  	let si = -1;
  	let fsi = -1;
  	for (let [i,path] of paths.entries()){
  		let v = (p5.Vector).sub(pt, path.start);
	  	let dot = p5.Vector.dot(v,path.dir);

	  	let dirVec = path.dir.copy();
	  	dirVec.setMag(dot);
	  	let np = p5.Vector.add(path.start, dirVec);

	  	if(np.x>path.finish.x || np.x<path.start.x || np.y>path.finish.y || np.y<path.start.y) 
	  		{	np = path.finish.copy();
	  			let fake = p5.Vector.dist(np, pt);
	  			if(fake> p5.Vector.dist(path.start.copy(), pt))
	  				fake = path.start.copy();
	  			if(fake< fsmall)
		  	{
		  		fsmall = fake;
		  		fsnp = np.copy();
		  		fsi = i;
		  	}
	  			continue;
	  		}

	  	let dist = p5.Vector.dist(np, pt);
	  	if(dist< small)
	  	{
	  		small = dist;
	  		snp = np.copy();
	  		si = i;
	  	}



  	}
  	if(si!=-1)

  	return [snp,si];

  	else {


  	return [fsnp,fsi];
  	}

  }




  followPath(){

  	let futureVel = this.velocity.copy();
  	futureVel.setMag(50);
  	let futurePt = (p5.Vector).add(this.location,futureVel);

  	let np = this.findnpv(futurePt); 
  	let npv = np[0];
  	let npi = np[1];
  	
  	let targetVel = this.paths[npi].dir.copy();
  	targetVel.setMag(10);

  	let target = p5.Vector.add(npv,targetVel);

  	let dist = p5.Vector.dist(target, futurePt);

  	if(dist>=this.paths[npi].r)
  		{//console.log(dist, this.path.r);
  	


  	this.seek(target);}

  	 if (debug) {
      fill(200);
      stroke(200);
      line(this.location.x, this.location.y, futurePt.x, futurePt.y);
      ellipse(futurePt.x, futurePt.y, 4, 4);

      // Draw normal location
      fill(200);
      stroke(200);
      line(futurePt.x, futurePt.y, npv.x, npv.y);
      ellipse(npv.x, npv.y, 4, 4);
      stroke(200);
      if (dist>=this.paths[npi].r) fill(255, 0, 0);
      noStroke();
      ellipse(target.x + targetVel.x, target.y + targetVel.y, 8, 8);
    }

  }

   borders(p) {
    if (this.location.x > p.finish.x + this.r) {
      this.location.x = p.start.x - this.r;
      this.location.y = p.start.y + (this.location.y - p.finish.y);
    }
  }

}
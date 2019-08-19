class Particle {

	constructor(){
		this.location = createVector(random(0,width),random(0,height));
		this.type = this.pickOne(2,1);
		this.isEaten = false;
	}


	display(){
		noStroke();
		if(this.type === 1){
				fill(0,255,0);
				ellipse(this.location.x,this.location.y,4,4);
			}
		else if(this.type === 0){
				fill(255,0,0);
				ellipse(this.location.x,this.location.y,4,4);
		}
	}

	pickOne(x,y){
		let pool = [];
		for(let i=0;i<x;i++){
			pool.push(1);
		}
		for(let i=0;i<y;i++){
			pool.push(0);
		}
	let size = x+y;

	let r = Math.floor(random(size));
	return pool[r];
	}




}
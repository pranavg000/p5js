class Box {

	constructor(x,y,r, fixed){

		this.bodyOptions = {
			friction : 0.002,
			restitution: 0.6,
			isStatic: fixed,
		}
		this.body = Bodies.circle(x,y,r, this.bodyOptions);
		// this.w = w;
		// this.h = h;
		this.r = r;
		World.add(world, this.body);
	}

	isOffScreen(){
		let pos = this.body.position;
		return (pos.y - 100>height)
	}

	removeFromWorld(){
		World.remove(world, this.body);


	}

	show(){
		let pos = this.body.position;
		let angle = this.body.angle;


		push();
		//rectMode(CENTER);
		fill(50);
		translate(pos.x, pos.y);
		rotate(angle);

		ellipse(0,0,this.r*2);
		line(0,0,0,-1*this.r);
		pop();

	}

}
class Boundary {

	constructor(x,y,w,h,a){

		this.bodyOptions = {
			friction : 0.05,
			restitution: 0.6,
			isStatic: true,
			angle : a,
		}
		this.body = Bodies.rectangle(x,y,w,h, this.bodyOptions);
		this.w = w;
		this.h = h;
		World.add(world, this.body);
	}

	show(){
		let pos = this.body.position;
		let angle = this.body.angle;


		push();
		rectMode(CENTER);
		fill(50);
		translate(pos.x, pos.y);
		rotate(angle);
		rect(0,0,this.w, this.h);

		pop();

	}

}
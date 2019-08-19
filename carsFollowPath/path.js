class Path{

	constructor(ix,iy,fx,fy){
		this.start = createVector(ix,iy);
		this.finish = createVector(fx,fy);
		this.dir = p5.Vector.sub(this.finish,this.start).normalize();
		this.r = 20;
	}

	display(){

		strokeWeight(this.r	 * 2);
    	stroke(100);
    	line(this.start.x, this.start.y, this.finish.x, this.finish.y);

    	strokeWeight(1);
    	stroke(0);
		line(this.start.x, this.start.y, this.finish.x, this.finish.y);

	}


}
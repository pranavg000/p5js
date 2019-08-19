class Obstacle{
	constructor(startx,starty,endx,endy){
		this.start = createVector(startx,starty);
		this.end = createVector(endx,endy);
	}

	display(){

		fill(153);
		beginShape();
		vertex(this.start.x, this.start.y);
		vertex(this.end.x, this.start.y);
		vertex(this.end.x, this.end.y);
		vertex(this.start.x, this.end.y);
		endShape(CLOSE);
	}
}
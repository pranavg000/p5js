class FlowField{

	constructor(r){
		
		this.resolution = r;
		this.cols = width/this.resolution;
		this.rows = height/this.resolution;
		this.field = this.make2DArray(this.rows);
	}

	make2DArray(rows){
		let array = [];
		for(let i=0;i<rows;i++){
			array[i] = [];
		}

		return array;
	}

	fieldInit(){
		noiseSeed(Math.floor(random(10000)));
		let yoff = 0.0;

		for(let i=0;i<this.rows;i++){
			let xoff = 0.0;
			for(let j=0;j<this.cols;j++){

				let theta = map(noise(xoff,yoff), 0, 1, 0, PI);

				let v = createVector(cos(theta),sin(theta));

				this.field[i][j] = v;

				xoff+=0.1;

		}
		yoff+=0.1;
		}

	}


	followField(x,y){

		let columns = Math.floor(constrain(x/this.resolution,0 , this.cols-1)); 
		let rows = Math.floor(constrain(y/this.resolution,0 , this.rows-1)); 
		console.log(y, x, this.field[rows][columns]);
		return this.field[rows][columns].copy();

	}

	display(){
		for(let i=0;i<this.rows;i++){
		
			for(let j=0;j<this.cols;j++){
				this.drawVector(this.field[i][j],i,j);
			}
			}
	}

	drawVector(v, x, y){

		let len = 9;

		push();
		let posx = (x+0.25)*this.resolution;
		let posy = (y+0.25)*this.resolution;
		translate(posx, posy);
		rotate(v.heading());
		line(0,0,len,0);
		

		pop();
	}

}
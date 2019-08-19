class DNA {
	constructor(genes){
		if(genes){
			this.genes = genes;
		}
		else {
			this.genes = [];

			for(let i=0;i<frames;i++){
				this.genes.push(p5.Vector.random2D().setMag(maxA));
			}
		}
	}
}
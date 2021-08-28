

function newGeneration(){
	// let big = -1;
	// for(let i=0;i<Tpop;i++){
	// 	big = Math.max(big, savedRockets[i].score);
	// }
	// console.log(big);

	calcFitness();
	let childGene;
	for(let i=0;i<Tpop;i++){
		childGene = makeGene();
		rockets.push(new Vehicle(childGene));
	}
	console.log("NG");
	savedRockets = [];

}

function makeGene(){
	let parent1Gene = pickOne();
	let parent2Gene = pickOne();

	let childGene = crossover(parent1Gene, parent2Gene);

	mutate(childGene,0.001);
	//console.log(childGene[0]+randomGaussian(0,0.005));
	return childGene;

}

function mutate(cg,per){
	let r,p;
	
	for(let i=0;i<cg.length;i++){
		r = Math.random();
	if(r < per){
		cg[i] = p5.Vector.random2D();
		cg[i].setMag(maxA);
		
	}
	}
	
}


function crossover(p1,p2){

	let mid = Math.floor(Math.random()*(p1.length));
	let childGene = [];
	for(let i=0;i<p1.length;i++){
		if(i<=mid){
			childGene[i] = p1[i];
		}
		else {
			childGene[i] = p2[i];
		}
	}

	return childGene;
}


function pickOne(){

	let index = 0;
	let r = random(1);

	while(r > 0){
		r= r - savedRockets[index].fitness;
		index++;
	}
	index--;
	return savedRockets[index].dna.genes;

}

function calcFitness(){
    let sum=0;
	for(let i=0;i<Tpop;i++){
		sum+=savedRockets[i].score;
	}

	// console.log(sum);

	for(let i=0;i<Tpop;i++){
		savedRockets[i].fitness = savedRockets[i].score/sum;
	}

}
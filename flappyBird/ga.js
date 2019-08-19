

function nextGen(){

	calcFitness();

	for(let i=0;i<TPop;i++){
		birds[i] = pickOne();
	}

	console.log('Nex Gen');
	backupBirds = [];
	

}

function pickOne(){

	let index = 0;
	let r = random(1);

	while(r > 0){
		r= r - backupBirds[index].fitness;
		index++;
	}
	index--;


	let bird = backupBirds[index];
	let child = new Bird(bird.brain);
	child.mutate(0.1);
	return child;

}

function calcFitness(){
		let sum=0;

		for( let bird of backupBirds){
			bird.score *= bird.score;
		}


		for( let bird of backupBirds){
			sum = sum + bird.score;
		}

		for( let bird of backupBirds){
			bird.fitness = bird.score / sum;
		}


	}
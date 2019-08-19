var fitness = [];


function newGen(){

	console.log("new Generation");

	food = [];
	for(let i=0;i<Tfood;i++){
	food.push(new Particle());

	}

	calcFitness();

	for(let i=0;i<Tvehicles;i++){
	childDNA = pickOne();
	//mutate(childDNA, 0.001);
	vehicles.push(new Vehicle(childDNA));
}
}


function mutate(cd,per){
	let r,p;
	
	for(let i=0;i<cd.length;i++){
		r = Math.random();
	if(r < per){
		if(i<2){
		cd[i] = random(-maxAttraction,maxAttraction);
		}
		else{
		cd[i] = random(0,maxRadius);
		}
		
	}
	}
	
}

function calcFitness() {
	
	for(let i=0;i<Tvehicles;i++){
		savedVehicles[i].score *= savedVehicles[i].score;
	}


	 let sum=0;
	for(let i=0;i<Tvehicles;i++){
		sum+=savedVehicles[i].score;
	}

	// console.log(sum);

	for(let i=0;i<Tvehicles;i++){
		fitness[i] = savedVehicles[i].score/sum;
	}
}

function pickOne(){

	let index = 0;
	let r = random(1);

	while(r > 0){
		r= r - fitness[index];
		index++;
	}
	index--;
	return savedVehicles[index].DNA;

}
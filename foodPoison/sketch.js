var food = [];
var Tfood = 200;
var vehicles = [];
var savedVehicles = [];
var Tvehicles = 20;
var boundThickness = 20;
var maxRadius = 100;
var maxAttraction = 2;
var debug = false;
var slider;


function setup() {
  createCanvas(400,400);
  for(let i=0; i<Tfood;i++){
  	food.push(new Particle());
  }

  for(let i=0; i<Tvehicles;i++){
  	vehicles.push(new Vehicle());
  }

  slider = createSlider(1,100,1);
}

function draw() {

  for(let n=0;n<slider.value();n++){

  for(let i=vehicles.length-1;i>=0;i--){
  	if(vehicles[i].isDead()){
  		savedVehicles.push(vehicles.splice(i,1)[0]);
  	}
  }


  for(let vehicle of vehicles){
  	vehicle.eat(food);
  	vehicle.hasEatenFood(food);
  	vehicle.update();
  	vehicle.boundary();
  }

  if(frameCount%100===0){
  	for(let i=0;i<vehicles.length;i++)
  	food.push(new Particle());
  }


  for(let i=food.length-1;i>=0;i--){
  	if(food[i].isEaten){
  		food.splice(i,1);
  	}
  	
  }



  if(vehicles.length===0){
  	newGen();
  }
}

  background(240);
  for(let vehicle of vehicles){
  	vehicle.display();  	
}

	for(let i=food.length-1;i>=0;i--) {
  		food[i].display();
  	}



}

function keyPressed(){
	if(keyCode === ENTER){
		debug = !debug;
	}
}
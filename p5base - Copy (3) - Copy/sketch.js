var vehicles = [];
var mouse;
var debug;

function setup() {
  createCanvas(400,400);
  mouse = createVector(0,0);
  debug = false
  for (let i=0;i<50;i++){
  	vehicles.push(new Vehicle(random(0,width),random(0,height), random(-1,1),random(-1,1)));

  }
}

function draw() {
  background(127);
  mouse.x = mouseX;
  	mouse.y = mouseY;
  for (let v of vehicles){
  	
  	

  	v.seperate(vehicles);
  	// v.seek(mouse);
  	v.align(vehicles);
  	
  	v.cohesion(vehicles);
  	v.update();
  	v.display();
    v.borders()
  }
}

function mouseDragged(){
	vehicles.push(new Vehicle(mouseX,mouseY, random(-3,3),random(-3,3)));
}

function keyPressed(){
	if(key==' ')
		{debug = !debug;
			console.log('hell');}
}
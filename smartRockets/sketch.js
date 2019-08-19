var rockets = [];
var savedRockets = [];
var counter = 0;
var Tpop = 200;
var target;
var targetSize = 40;
var endX, endY, startX, startY, dragX, dragY;
var obstacles = [];
var slider;
var maxA = 0.5;
var frames = 250;
var debug = false;

function setup() {
  createCanvas(400,400);

  slider = createSlider(1,100,1);

  for(let i=0;i<Tpop;i++){
  	rockets.push(new Vehicle());
  }

  target = createVector(width/2, 50);
  obstacles.push(new Obstacle(100,190,300,210));
}

function draw() {
  

  for(let n =0 ;n<slider.value();n++){
  

  for(let i=rockets.length-1;i>=0;i--){
  	if(rockets[i].isDead(obstacles))
  		savedRockets.push(rockets.splice(i,1)[0]);
  }

  for(let rocket of rockets){
  	rocket.applyGenes();
  	rocket.update();
  	rocket.display();
  }


  if(rockets.length===0){
  	newGeneration();
  	counter = 0;
  }

  counter++;
  
  }
  fill(153);
		beginShape();
		vertex(startX, startY);
		vertex(dragX, startY);
		vertex(dragX, dragY);
		vertex(startX, dragY);
		endShape(CLOSE);


  


background(245);


for(let obstacle of obstacles){
  	obstacle.display();
  }

  for(let rocket of rockets){
  	
  	rocket.display();
  }
  fill(127,50);
  ellipse(target.x, target.y, targetSize,targetSize);
  
}


function touchStarted(){
  	startX = mouseX;
    startY = mouseY;
}
function touchEnded() { 
	if(debug){
		 endX = mouseX;
  endY = mouseY;
  obstacles.push(new Obstacle(startX, startY, endX, endY));
	}
 
  }

function mouseDragged(){
	dragX = mouseX;
  	dragY = mouseY;
}


function keyPressed(){
	if(keyCode === ENTER){
		debug = !debug;
	}
}
























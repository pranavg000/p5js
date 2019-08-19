var paths = [];
var vehicles = [];
var border;
var debug;

function setup() {
  createCanvas(600,600);
  paths.push(new Path(0,100,width/4,150));
  paths.push(new Path(width/4,150,width/2,300));
  paths.push(new Path(width/2,300,width,450));
  border = {start : createVector(0,100), finish : createVector(width,450)}
  //v = new Vehicle(20,20,path);

}

function draw() {
  background(245);


  for (let path of paths){
  	path.display();
  }
  
  //path2.display();

  for(let v of vehicles){
  	v.followPath();
  v.update();
  v.display();
  v.borders(border)
  }
  

}

function mouseClicked(){
	vehicles.push(new Vehicle(mouseX,mouseY,paths));
}


function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}
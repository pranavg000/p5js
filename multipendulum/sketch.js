
var Engine = Matter.Engine,
    //Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,	
    Mouse = Matter.Mouse,	
    MouseConstraint = Matter.MouseConstraint,	
    Constraint = Matter.Constraint;	

var engine;
var boxes = [];
var boundaries = [];
var world;
var ground;
var mConstraint;

function setup() {
  var canvas = createCanvas(400,400);
  engine = Engine.create();
  world = engine.world;
  
  boundaries.push(new Boundary(200,height-30,width,60, 0));
  boxes.push(new Box(200,20,7,true));
  var prev = 0;
  for (let i=220;i<400;i+=20){


  p = new Box(i,20,7, false);
  //p2 = new Box(200,200,10);
  
  boxes.push(p);
  
  let options = {
  	bodyA : p.body,
  	bodyB : boxes[prev].body,
  	length: 20,
  	stiffness: 0.5,
  }
  let constraint = Constraint.create(options);
  World.add(world, constraint);
  prev++;
}

  var canvasMouse = Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity();

  let options = {
  	mouse: canvasMouse,
  }
  mConstraint = MouseConstraint.create(engine, options);


  World.add(world, mConstraint);
  Engine.run(engine);
  


}

function draw() {
  background(127);
  for (let i=0;i<boxes.length;i++){
  	boxes[i].show();
  	if(boxes[i].isOffScreen()){
  		boxes[i].removeFromWorld();
  		boxes.splice(i,1);
  		i--;
  	}
  }

  for (let i=0;i<boundaries.length;i++){
  	boundaries[i].show();
  }


  //line(boxes[0].body.position.x, boxes[0].body.position.y, boxes[1].body.position.x, boxes[1].body.position.y);	
  //console.log(boxes.length, world.bodies.length)
  	

  	if(mConstraint.body){
  		let pos = mConstraint.body.position;
  		let offsetPos = mConstraint.constraint.pointB;

  		var m = mConstraint.mouse.position;

  		//stroke(0,255,0);
  		line(pos.x+offsetPos.x, pos.y+offsetPos.y, m.x, m.y);
  	}
  
}

// function mouseDragged(){
// 	boxes.push(new Box(mouseX,mouseY,random(5,10)));

// }
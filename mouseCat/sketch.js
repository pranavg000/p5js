var v;
var mouse;
var mouseVel;


function setup() {
  createCanvas(400,400);
  v = new Vehicle(30,370);
  mouse = createVector(30, 30);
  mouseVel = createVector(2, 0);
}

function draw() {
  background(127);
  mouseVel.x = random(-1,3);
  mouse.add(mouseVel);
  //tmouseVel = p5.Vector.mult(mouseVel,T)
  //tmouse = p5.Vector.add(mouse, tmouseVel);
  v.seek(mouse, mouseVel);
  v.update();
  v.display();
  //ellipse(mouse.x,mouse.y,)
  ellipse(mouse.x, mouse.y, 10);
}

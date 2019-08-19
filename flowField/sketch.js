var field;
var vehicles = [];

function setup() {
  createCanvas(700,700);

  field = new FlowField(20);
  field.fieldInit();

  

}

function draw() {
  background(240);
  field.display();

for (let vehicle of vehicles)
  {vehicle.seek();
  vehicle.update();

  vehicle.display();}
}

function mouseDragged(){
	vehicles.push(new Vehicle(mouseX,mouseY));
}
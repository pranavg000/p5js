var gravity;
var rockets = [];
var fragments = [];


function setup() {
  createCanvas(600,600);
  rockets.push(new Particle(width/2, 350, -5,100));
  gravity = createVector(0,0.05);
 
}

function draw() {
	
	 background(0);

	for(let j=rockets.length-1;j>=0;j--){
		rockets[j].applyAcceleration(gravity);

		rockets[j].update();
		rockets[j].display();
	}

	if(frameCount%10 === 0){
		rockets.push(new Particle(random(30,width-30), random(height-30,height/2), random(-4.5,-6)));
	}
	// console.log(rockets[0].velocity.y);
	for(let j=rockets.length-1;j>=0;j--){
		if(rockets[j].velocity.y >= 0){

		for(let i=0;i<150;i++)
		{fragments.push(new Fragment(rockets[j].location.x,rockets[j].location.y,rockets[j].color));
			// console.log(rockets[j].location.x,rockets[j].location.y,rockets[j].color);
		}
	rockets.splice(j,1);
	}
		
	}
	
	for(let fragment of fragments){
		fragment.applyAcceleration(gravity);
		fragment.display();

		fragment.update();
	}

	for(let i=fragments.length-1; i>=0;i-- ){
		if(fragments[i].lifespan === 0){
			fragments.splice(i,1);
		}
	}
 
}

function mouseDragged(){
	rockets.push(new Particle(mouseX, mouseY, random(-4.5,-6)));
}
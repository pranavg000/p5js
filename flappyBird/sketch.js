// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&


var birds = [];
var backupBirds = [];
var pipes = [];
var TPop = 250;
var counter = 0;
var slider;



function setup() {
  createCanvas(640, 480);
  //bird = new Bird();
  //pipes.push(new Pipe());
  slider = createSlider(1,100,1);
  for (let i=0;i<TPop;i++){
    birds.push(new Bird());
  }
}

function draw() {
  



  for(let n = 0; n<slider.value();n++){
  if (counter % 50 == 0) {
    pipes.push(new Pipe());
  }

  counter++;


  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].update();


    for (let j = birds.length-1;j>=0;j--){
       if (pipes[i].hits(birds[j])) {
         backupBirds.push(birds.splice(j,1)[0]);
    }

    }

   

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }


  for (let i = birds.length-1;i>=0;i--){
       if (birds[i].offScreen()) {
         backupBirds.push(birds.splice(i,1)[0]);
    }
    }
 

  for (let bird of birds){
    bird.think(pipes);
    bird.update();
  }

   if(birds.length === 0){
    counter = 0;
    nextGen();
    pipes = [];
  }
  
}

background(0);

  for (let bird of birds)  bird.show();

  for (var i = pipes.length-1; i >= 0; i--) pipes[i].show();



}


function keyPressed(){
  if(key === 'S'){
    let bird = birds[0];
    //let json = bird.brain.serialize();
    saveJSON(bird.brain, 'bird.json');
    console.log('json');
  }
}
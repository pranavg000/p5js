// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/cXgA1d_E-jY&

class Bird {

 constructor(brain){
    this.y = height/2;
  this.x = 64;

  this.gravity = 0.7;
  this.lift = -12;
  this.velocity = 0;
  this.score = 0;
  this.fitness = 0.0;
  //this.k = (4*Math.log(3)/(7.5*7.5));
  if(brain){
    this.brain = brain.copy();
  }
  else {
    this.brain = new NeuralNetwork(5,4,2);
  }
 }


 // incScore(pipe){
 //   let middle = (height - this.bottom + this.top)/20;

 //   this.score += (3*Math.exp((-1)*this.k*(middle*middle)));
 //   console.log(score);
 // }

  offScreen(){
    if(this.y<0 || this.y>height)
       return true;
     else {
       return false;
     }
  }
 
  think(pipes){

    let closest = null;
    let closestD = Infinity;
    let d;
    for (let pipe of pipes){
      d = pipe.x - this.x + pipe.w;
      //console.log(d);
      if(d<closestD && d>0){
        closestD = d;
        closest = pipe;
      }
    }



  let inputs = [];
  inputs[0] = this.y / height;    
  inputs[4] = this.velocity / 4;    
  inputs[1] = closest.x / width;    
  inputs[2] = closest.top / height;    
  inputs[3] = closest.bottom / height;    


    //let inputs = [this.y,pipes[0].x,pipes[0].top,pipes[0].bottom];
    let output = this.brain.predict(inputs);
    if(output[0]>0.5){
      this.up();
    }
  }

  mutate(per){
    this.brain.mutate(per);
  }

  show() {
    fill(255,100);
    ellipse(this.x, this.y, 32, 32);
  }

  up() {
    this.velocity += this.lift;
  }

  update() {
    this.score++;
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    // if (this.y > height) {
    //   this.y = height;
    //   this.velocity = 0;
    // }

    // if (this.y < 0) {
    //   this.y = 0;
    //   this.velocity = 0;
    // }

  }

}

function setup() {
  //frameRate(1);
  createCanvas(400, 200, WEBGL);
  colorMode(HSB,360);
  strokeWeight(0.5);
  background(0);
  loadParticles();
}

let noiseVal = 0.05;

//in pixels
let particleSpacing = 2.5;

let particles = [];

function keyPressed() {
  if(key == 'n') {
    noiseVal -= 0.001;
  }
  print("Noise: " + noiseVal);
}

function draw() {
  for(let particle of particles) {
    particle.move();
    particle.display();
  }
  
}

class Particle{
  
  constructor(x, y) {
    this.pos = createVector(x, y);
  }
  
  move(){
    this.n = noise(this.pos.x * noiseVal, this.pos.y * noiseVal, millis()/1000 * noiseVal);
    
    let noi = map(this.n,0,1,-360,360);
    
    let v = createVector(sin(radians(noi)), cos(radians(noi)));
    
    if(noi < 0) {
      this.pos.sub(v);
    } else {
      this.pos.add(v);
    }
  }  
  
  display(){
    let d = this.pos.dist(createVector(width/2, height/2));
    let h = map(this.n,0,1,-100,600);
    
    stroke((d/0.5+h)%360,360,360);
    point(this.pos);
  }
}

function loadParticles(){
  for(let i = 0; i < width; i+=particleSpacing){
    //add new particle to the array
    particles.push(new Particle(-(width/2)+i,cos(radians(i/5))*10));
  }
  

}
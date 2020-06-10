let debug = false;

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(random(-0.2, 0.2), random(-0.2, 0.2))
    this.acel = createVector(0, 0)
    this.diam = random(10, 30)
    this.colour = random(0, 200)
    if (debug) {
      print("Creating new Particle:", this);
    }
  }

  apply(force) {
    this.acel.add(force)
  }

  update() {
    // move ourselves
    this.pos.add(this.vel)
    let rad = this.diam / 2

    this.vel.add(this.acel);
    this.pos.add(this.vel);

    if (this.pos.x <= rad || this.pos.x >= width - rad || this.inShape()) {
      this.vel.x = -this.vel.x
    }
    if (this.pos.y <= rad || this.pos.y >= height - rad || this.inShape()) {
      this.vel.y *= -1

    }
    
    //reset acceleration
    this.acel.set(0, 0);
  }

  spawn(particles) {
    let rad = this.diam / 2;
    if (!this.overlaps(particles) && this.pos.y >= rad && this.pos.y <= height - rad) {
      particles.push(this)
    }
  }

  bounce(particles) {
    for (const [key, otherParticle] of Object.entries(particles)) {
      if (otherParticle != this && otherParticle != undefined) {
        let d = this.pos.dist(otherParticle.pos)
        if (d < (this.diam + otherParticle.diam) / 2) {

          let tempV = otherParticle.vel.copy()
          let tempC = otherParticle.colour
          otherParticle.colour = this.colour
          otherParticle.vel = this.vel
          //particles[key];
          //particles.splice(key, key);
          //delete particles[key];

          if (particles.length < 400 && this.diam > 10) {
            for (let i = 0; i < this.diam; i += 0.5) {
              let particle = new Particle(random(0, width), random(0, height))
              particle.diam = this.diam ;
              particle.spawn(particles)
            }
          }
          this.colour = tempC
          this.vel = tempV
        }
      }
    }
  }

  inShape() {
    //top
    if (this.pos.x >= 50 && this.pos.x <= width - 50 && this.pos.y <= 80 && this.pos.y >= 50) {
      return true;
    }

    //middle
    if (this.pos.x >= (width / 2) - 25 && this.pos.x <= (width / 2) + 25 && this.pos.y >= 80 && this.pos.y <= height - 50) {
      return true;
    }

    //bottom
    if (this.pos.x >= 50 && this.pos.x <= (width / 2) + 25 && this.pos.y >= height - 80 && this.pos.y <= height - 50) {
      return true;
    }
  }

  overlaps(particles) {
    for (let otherParticle of particles) {
      if (otherParticle != this && otherParticle !== undefined) {
        let d = this.pos.dist(otherParticle.pos)
        if (d < (this.diam + otherParticle.diam) / 2) {
          return true;
        }
      }
    }
  }

  draw() {
    noStroke()
    if (this.inShape()) {
      fill(this.colour, this.colour - 130, 0)
    } else {
      fill(0, 0, this.colour)
    }
    ellipse(this.pos.x, this.pos.y, this.diam, this.diam)
  }
}

let particles = []

function setup() {
  createCanvas(400, 400)
  while (particles.length < 200) {
    let particle = new Particle(random(0, width), random(0, height))
    particle.spawn(particles);
  }
}

function draw() {
  background(255)
  if(millis() / 5000 > 1) {
    print("Particles array length:", particles.length);
  }
    /*for (let i = 0; i < 50; i++) {
      let particle = new Particle(random(0, width), random(0, height))
      particle.spawn(particles);
    }*/
  
  for (let particle of particles) {
    if (particle !== undefined) {
      particle.apply(createVector(0, 0.001))
      particle.bounce(particles)
      particle.update()
      particle.draw()
    } else {
      continue
    }
  }
}
class Particle {
    constructor(position) {
      this.position = position.copy();
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      this.acceleration = createVector(0, 0.05);
      this.lifespan = 255;
      this.r = random(2, 6);
    }
  
    run() {
      this.update();
      this.display();
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 3;
    }
  
    display() {
      noStroke();
      fill(255, this.lifespan);
      ellipse(this.position.x, this.position.y, this.r);
    }
  
    isDead() {
      return this.lifespan <= 0;
    }
  }
  
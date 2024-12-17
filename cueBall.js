class CueBall {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.r = 20;
    this.velocity = createVector(0, 0);
    this.trail = []; 
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.mult(0.98);

    if (this.position.x - this.r < 50 || this.position.x + this.r > width - 50) {
      this.velocity.x *= -1;
      this.emitParticles();
    }
    if (this.position.y - this.r < 50 || this.position.y + this.r > height - 50) {
      this.velocity.y *= -1;
      this.emitParticles();
    }

    this.updateTrail();
  }

  updateTrail() {
    this.trail.push(this.position.copy());
    if (this.trail.length > 50) this.trail.shift();
  }

  display() {
   
    noFill();
    stroke(255, 100);
    strokeWeight(2);
    for (let pos of this.trail) {
      ellipse(pos.x, pos.y, this.r);
    }

  
    fill(255);
    noStroke();
    ellipse(this.position.x, this.position.y, this.r * 2);
  }

  shoot(force) {
    this.velocity.add(force);
  }

  emitParticles() {
    particleSystems.push(new ParticleSystem(this.position));
  }
}





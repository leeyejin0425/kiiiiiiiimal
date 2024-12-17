class CueBall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.speed = createVector(0, 0);
  }

  display() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.r * 2);
  }

  update() {
    this.x += this.speed.x;
    this.y += this.speed.y;

    this.speed.mult(0.98);

    if (this.x - this.r < 50 || this.x + this.r > width - 50) {
      this.speed.x *= -1;
      this.emitParticles();
    }
    if (this.y - this.r < 50 || this.y + this.r > height - 50) {
      this.speed.y *= -1;
      this.emitParticles();
    }

    this.x = constrain(this.x, 50 + this.r, width - 50 - this.r);
    this.y = constrain(this.y, 50 + this.r, height - 50 - this.r);
  }

  emitParticles() {
    let ps = new ParticleSystem(createVector(this.x, this.y));
    for (let i = 0; i < 20; i++) {
      ps.addParticle();
    }
    particleSystems.push(ps);
  }

  shoot(direction, force) {
    this.speed = p5.Vector.mult(direction, force);
  }
}


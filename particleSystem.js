class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
    for (let i = 0; i < 5; i++) {
      this.particles.push(new Particle(this.origin));
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.display();
      if (p.isStar) this.particles.splice(i, 1);
    }
  }
}





  
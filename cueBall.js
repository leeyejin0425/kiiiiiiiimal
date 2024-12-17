class CueBall {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.r = 20;
    this.velocity = createVector(0, 0);
    this.trail = [];
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.mult(0.98); // 감속

    // 경계 충돌 시 파티클 방출
    if (this.position.x - this.r < 50 || this.position.x + this.r > width - 50) {
      this.velocity.x *= -1;
      this.emitParticles();
    }
    if (this.position.y - this.r < 50 || this.position.y + this.r > height - 50) {
      this.velocity.y *= -1;
      this.emitParticles();
    }

    // 잔상 업데이트
    this.trail.push(this.position.copy());
    if (this.trail.length > 50) {
      this.trail.shift();
    }
  }

  display() {
    // 잔상 그리기
    noFill();
    stroke(255, 100, 100, 100);
    strokeWeight(2);
    for (let i = 0; i < this.trail.length; i++) {
      let pos = this.trail[i];
      let alpha = map(i, 0, this.trail.length, 0, 255);
      stroke(255, alpha);
      ellipse(pos.x, pos.y, this.r * 1.5 - i * 0.05);
    }

    // 큐볼 그리기
    fill(255);
    noStroke();
    ellipse(this.position.x, this.position.y, this.r * 2);
  }

  shoot(force) {
    this.velocity.add(force);
  }

  emitParticles() {
    let ps = new ParticleSystem(this.position);
    particleSystems.push(ps);
  }
}





class Particle {
  constructor(position) {
    this.position = position.copy();
    this.velocity = p5.Vector.random2D().mult(random(2, 4));
    this.acceleration = createVector(0, 0.1); // 중력 효과
    this.lifespan = 255; // 파티클 생명
    this.r = random(2, 4);
    this.isStatic = false; // 파티클이 멈췄는지 여부
  }

  applyGravity() {
    if (!this.isStatic) {
      this.velocity.add(this.acceleration);
    }
  }

  update() {
    if (!this.isStatic) {
      this.position.add(this.velocity);
      // 프레임 밖으로 나간 파티클 제거
      if (this.position.x < 50 || this.position.x > width - 50 || this.position.y > height - 50) {
        this.lifespan = 0;
      }
      // 파티클이 바닥에 닿으면 멈춤
      if (this.position.y >= height - 50) {
        this.position.y = height - 50;
        this.velocity.mult(0);
        this.isStatic = true; // 바닥에 고정
      }
    }
  }

  display() {
    noStroke();
    fill(255, 200, 0, this.lifespan);
    ellipse(this.position.x, this.position.y, this.r * 2);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}


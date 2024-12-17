class Particle {
  constructor(position) {
    this.position = position.copy();
    this.velocity = createVector(random(-3, 3), random(3, 6));
    this.acceleration = createVector(0, 0.2); // 중력
    this.r = random(4, 8);
    this.bounceCount = 0; // 바닥 튕김 횟수
    this.isStar = false; // 별 변형 여부
  }

  update() {
    if (!this.isStar) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);

      // 바닥에 닿으면 튕기기
      if (this.position.y >= height - 50) {
        this.position.y = height - 50;
        this.velocity.y *= -0.5; // 튕김 효과
        this.velocity.x *= 0.7; // 마찰 효과
        this.bounceCount++;

        // 두 번 튕기면 별로 변환
        if (this.bounceCount > 1) {
          this.isStar = true;
          staticStars.push(this);
        }
      }
    }
  }

  display() {
    if (this.isStar) {
      fill(255, 215, 0);
      stroke(255);
      this.drawStar(this.position.x, this.position.y, 8, 12, 5);
    } else {
      noStroke();
      fill(255, 100, 100, 150);
      ellipse(this.position.x, this.position.y, this.r * 2);
    }
  }

  drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}







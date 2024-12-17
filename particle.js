class Particle {
  constructor(position) {
    this.position = position.copy();
    this.velocity = createVector(random(-3, 3), random(3, 6));
    this.acceleration = createVector(0, 0.1);
    this.r = random(4, 8);
    this.bounceCount = 0;
    this.isStar = false;
  }

  update() {
    if (!this.isStar) {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);

      if (this.position.y >= height - 50) {
        this.velocity.y *= -0.6;
        this.velocity.x *= 0.7;
        this.bounceCount++;
        if (this.bounceCount > 1) {
          this.becomeStar();
        }
      }
    }
  }

  becomeStar() {
    this.isStar = true;
    staticStars.push(new Star(this.position));
  }

  display() {
    fill(255, 100, 200, 200);
    noStroke();
    ellipse(this.position.x, this.position.y, this.r * 2);
  }
}









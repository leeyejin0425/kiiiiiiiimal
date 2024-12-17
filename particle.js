class Particle {
  constructor(position) {
    this.position = position.copy();
    this.velocity = p5.Vector.random2D().mult(random(3, 6));
    this.acceleration = createVector(0, 0.2);
    this.lifespan = 255;
    this.r = random(4, 8);
    this.isStar = false; 
    this.bounceCount = 0; 
  }

  applyGravity() {
    this.velocity.add(this.acceleration);
  }

  update() {
    this.position.add(this.velocity);

    
    if (this.position.y >= height - 50) {
      this.position.y = height - 50;
      this.velocity.y *= -0.5;
      this.velocity.x *= 0.7; 
      this.bounceCount++;

      if (this.bounceCount > 1) { 
        this.isStar = true;
        this.velocity.mult(0); 
      }
    }


    if (this.position.x < 50 || this.position.x > width - 50) {
      this.lifespan = 0;
    }
  }

  display() {
    if (this.isStar) {
      fill(255, 215, 0, 200); 
      stroke(255, 200);
      strokeWeight(1);
      this.drawStar(this.position.x, this.position.y, 8, 15, 5);
    } else {
      noStroke();
      fill(random(200, 255), random(100, 255), random(100, 200), this.lifespan);
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

  isDead() {
    return this.lifespan <= 0;
  }
}


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
        this.position.y = height - 50;
        this.velocity.y *= -0.6; 
        this.velocity.x *= 0.7;
        this.bounceCount++;

       
        if (this.bounceCount > 1) {
          this.isStar = true;
          staticStars.push(this);
        }
      }
    } else {
    
      this.velocity.y += 0.1;
      this.position.add(this.velocity);

      if (this.position.y >= height - 50) {
        this.position.y = height - 50;
        this.velocity.y *= -0.3; 
        this.velocity.x *= 0.5;
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
      fill(random(200, 255), random(100, 255), random(100, 200), 200);
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








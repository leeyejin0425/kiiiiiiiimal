class Star {
    constructor(position) {
      this.position = position.copy();
      this.velocity = createVector(random(-1, 1), -random(1, 3));
    }
  
    update() {
      this.velocity.y += 0.1; 
      this.position.add(this.velocity);
  
      if (this.position.y >= height - 50) {
        this.position.y = height - 50;
        this.velocity.y *= -0.3; 
        this.velocity.x *= 0.5; 
      }
    }
  
    display() {
      fill(255, 215, 0);
      stroke(255);
      this.drawStar(8, 12, 5);
    }
  
    drawStar(radius1, radius2, npoints) {
      let angle = TWO_PI / npoints;
      let halfAngle = angle / 2.0;
      beginShape();
      for (let a = 0; a < TWO_PI; a += angle) {
        let sx = this.position.x + cos(a) * radius2;
        let sy = this.position.y + sin(a) * radius2;
        vertex(sx, sy);
        sx = this.position.x + cos(a + halfAngle) * radius1;
        sy = this.position.y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
      }
      endShape(CLOSE);
    }
  }
  
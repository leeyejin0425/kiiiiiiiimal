class CueBall {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.r = 20;
      this.speed = createVector(0, 0);
      this.trail = [];
    }
  
    display() {
    
      noFill();
      strokeWeight(2);
      for (let i = 0; i < this.trail.length; i++) {
        let alpha = map(i, 0, this.trail.length, 0, 255);
        stroke(255, 255, 100, alpha);
        ellipse(this.trail[i].x, this.trail[i].y, this.r * 2 - i * 0.4);
      }
  

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
        this.x = constrain(this.x, 50 + this.r, width - 50 - this.r);
      }
      if (this.y - this.r < 50 || this.y + this.r > height - 50) {
        this.speed.y *= -1;
        this.y = constrain(this.y, 50 + this.r, height - 50 - this.r);
      }
  
    
      this.trail.push({ x: this.x, y: this.y });
      if (this.trail.length > 50) this.trail.shift();
    }
  
    shoot(direction, force) {
      this.speed = p5.Vector.mult(direction, force);
    }
  }
  
let cue;
let power = 0;

function setup() {
  createCanvas(600, 400);
  cue = new CueBall(width / 2, height - 80); 
}

function draw() {
  background(0, 150, 0);


  noFill();
  stroke(255);
  rect(50, 50, width - 100, height - 100);


  cue.update();
  cue.display();


  fill(255, 0, 0);
  rect(width - 50, height - power - 20, 20, power);

  textSize(16);
  fill(255);
  textAlign(RIGHT, CENTER);
  text("Power", width - 60, height - 40);
}

function mousePressed() {
  power = 0;
}

function mouseDragged() {
  power = constrain(power + 2, 0, 100);
}

function mouseReleased() {
  cue.shoot(power / 10);
  power = 0;
}

class CueBall {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 20;
    this.xSpeed = 0;
    this.ySpeed = 0;
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
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.xSpeed *= 0.98;
    this.ySpeed *= 0.98;

    if (this.x - this.r < 50 || this.x + this.r > width - 50) {
      this.xSpeed *= -1;
      this.x = constrain(this.x, 50 + this.r, width - 50 - this.r);
    }
    if (this.y - this.r < 50 || this.y + this.r > height - 50) {
      this.ySpeed *= -1;
      this.y = constrain(this.y, 50 + this.r, height - 50 - this.r);
    }

    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 50) this.trail.shift();
  }

  shoot(force) {
    this.xSpeed = random(-force, force);
    this.ySpeed = -force;
  }
}

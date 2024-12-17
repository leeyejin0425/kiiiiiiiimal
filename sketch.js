let cueBall;
let particleSystems = [];
let staticStars = []; 
let power = 0;
let direction;

function setup() {
  createCanvas(600, 400);
  cueBall = new CueBall(width / 2, height - 80);
}

function draw() {
  background(0, 150, 0);


  drawBoundary();

  if (mouseIsPressed) {
    stroke(255, 0, 0);
    line(cueBall.position.x, cueBall.position.y, mouseX, mouseY);
  }


  cueBall.update();
  cueBall.display();

  for (let ps of particleSystems) {
    ps.run();
  }


  for (let star of staticStars) {
    star.update();
    star.display();
  }


  drawPowerGauge();
}

function mousePressed() {
  power = 0;
}

function mouseDragged() {
  power = constrain(power + 2, 0, 100);
}

function mouseReleased() {
  let start = createVector(cueBall.position.x, cueBall.position.y);
  let end = createVector(mouseX, mouseY);
  direction = p5.Vector.sub(start, end).normalize();

  cueBall.shoot(direction.mult(power * 0.2));
  power = 0;
}

function drawBoundary() {
  noFill();
  stroke(255);
  rect(50, 50, width - 100, height - 100);
}

function drawPowerGauge() {
  fill(255, 0, 0);
  rect(20, height - power - 60, 20, power);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Power", 30, height - 40);
}






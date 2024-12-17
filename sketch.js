let cue;
let power = 0;
let direction;

let particleSystems = [];

function setup() {
  createCanvas(600, 400);
  cue = new CueBall(width / 2, height - 80);
  direction = createVector(0, 0);
}

function draw() {
  background(0, 150, 0);


  noFill();
  stroke(255);
  rect(50, 50, width - 100, height - 100);


  if (mouseIsPressed) {
    stroke(255, 0, 0);
    line(cue.x, cue.y, mouseX, mouseY);
  }


  cue.update();
  cue.display();


  for (let ps of particleSystems) {
    ps.run();
  }

 
  fill(255, 0, 0);
  rect(20, height - power - 20, 20, power);

  textSize(16);
  fill(255);
  textAlign(CENTER, CENTER);
  text("Power", 30, height - 40);
}

function mousePressed() {
  power = 0;
}

function mouseDragged() {
  power = constrain(power + 2, 0, 100);
}

function mouseReleased() {
  let startPos = createVector(cue.x, cue.y);
  let endPos = createVector(mouseX, mouseY);
  direction = p5.Vector.sub(startPos, endPos).normalize();


  cue.shoot(direction, power / 5);
  power = 0;


  let ps = new ParticleSystem(createVector(cue.x, cue.y));
  particleSystems.push(ps);
}

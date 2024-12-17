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

  // 테두리 그리기
  noFill();
  stroke(255);
  rect(50, 50, width - 100, height - 100);

  // 큐볼 방향 표시선
  if (mouseIsPressed) {
    stroke(255, 0, 0);
    line(cueBall.position.x, cueBall.position.y, mouseX, mouseY);
  }

  // 큐볼 업데이트
  cueBall.update();
  cueBall.display();

  // 파티클 시스템 실행
  for (let ps of particleSystems) {
    ps.run();
  }

  // 바닥에 남은 별 표시
  for (let star of staticStars) {
    star.display();
  }

  // 파워 게이지 표시
  fill(255, 0, 0);
  rect(20, height - power - 20, 20, power);
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
  let start = createVector(cueBall.position.x, cueBall.position.y);
  let end = createVector(mouseX, mouseY);
  direction = p5.Vector.sub(start, end).normalize();

  cueBall.shoot(direction.mult(power * 0.2));
  power = 0;
}





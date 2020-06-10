let current = {
  angle: 5,
  offset: 300,
  scalar: 1,
  speed: 5
}

let allowedPoints = 40;

let debug = false;

let count = 0;

var points = [];

var col = {
  r: 255,
  g: 0,
  b: 0
};

function setup() {
  createCanvas(600, 600);
  noStroke();
  background(0);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  let offset = current.offset;
  let angle = current.angle;
  let scalar = current.scalar;

  if (debug) {
    print("offset", offset, "angle", angle, "scalar", scalar);
  }
  background(0);

  col.r = random(0, 200);
  col.g = random(0, 250);
  col.b = random(100, 250);
  var x = offset + cos(angle) * scalar;
  var y = offset + sin(angle) * scalar;


  current.angle += current.speed;
  current.scalar += current.speed;
  count++;
  points.push({
    x: x,
    y: y
  });

  if (points.length > allowedPoints) {
    points.shift();
  }
  if (count == allowedPoints) {
    current = {
      angle: round(random(1, 5) * 5),
      offset: 300,
      scalar: round(random(1, 5) * 5),
      speed: round(random(1, 5) * 5)
    };
    count = 0;
  }



  for (let j = 0; j < 5; j++) {
    //beginShape();
    for (let i = j; i < points.length; i += 5) {
      let x = points[i].x;
      let y = points[i].y;
      if (debug) {
        fill("red");
        stroke("red");
        if (i >= 5) {
          if (dist(points[i - 5].x, points[i - 5].y, x, y) < 50) {
            line(points[i - 5].x, points[i - 5].y, x, y);
          }
        }
      }
      push();
      noStroke();
      fill(col.r, col.g, col.b, 50);
      rect(x, y, 10 * (i / 10), 10 * (i / 10));
      pop();
    }
    //endShape(LINE);
  }
}

function getIndex(x, y) {
  return (y * width + x) * 4;
}

function keyPressed() {
  print(key);
  if (key == "1") {
    current.angle++;
  }
  if (key == "2") {
    current.offset++;
  }
  if (key == "3") {
    current.scalar++;
  }
  if (key == "4") {
    current.speed++;
  }

  if (key == "8") {
    allowedPoints--;
  }
  if (key == "9") {
    allowedPoints++;
  }

  //  print(current);
  if (key == 'D') {
    debug = !debug;
    print("debug", debug);
  }
}
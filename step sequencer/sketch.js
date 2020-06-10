//TODO:
//issue - speaker max frequency limit reaches when multiple oscilators are active in the same row: fixed

let sequenceLength;
let colNum;
let buttons = [];
let slider;
let buttonOffset;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  

  colNum = (height - 40) / 40;
  sequenceLength = ((width - 40) / 40);

  //calculate button positioning
  buttonOffset = {
    x: 40 + round((40 / sequenceLength), 1),
    y: 40 + round((40 / colNum), 1)
  }

  slider = new Slider(buttonOffset.x, 0);

  //populate buttons array
  for (let j = 1; j <= colNum - 1; j++) {
    for (let i = 1; i <= sequenceLength - 1; i++) {
      let x = i * buttonOffset.x;
      let y = j * buttonOffset.y;
      let frequency = (j > sequenceLength / 2 ? 40 + j : 80 - j);
      print("adding button");
      buttons.push(new button(x, y, frequency));
    }
  }
}

function draw() {
  background(255);

  //move slider
  slider.move();

  //display buttons using array
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].draw();

    //check if slider is over button and play correct sound freqency
    if (slider.pos.x == buttons[i].pos.x) {
      if (buttons[i].pressed) {
        buttons[i].play();
      }
    }
  }

  //display slider
  slider.draw();
}

//handle mouse press
function mousePressed() {

  //check each button position
  for (let i = 0; i < buttons.length; i++) {
    if (mouseX < buttons[i].pos.x + 40 && mouseX > buttons[i].pos.x) {
      if (mouseY < buttons[i].pos.y + 40 && mouseY > buttons[i].pos.y) {
        buttons[i].togglePressed();
      }
    }
  }
}
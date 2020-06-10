class Button {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  draw() {
    let t;

    push();
    textSize(18);
    stroke('black');
    strokeWeight(2);
    rect(this.x - 2.5, this.y + 4, 25, 20, 2);
    switch (this.type) {
      case 'open':
        t = '\uf07c';
        break;

        //toggle convolution
      case 'toggle':
        t = '\uf044';
        break;
      case 'kernel':
        t = '\uf165';
        break;
    }
    strokeWeight(0.2);
    text(t, this.x, this.y + 20);
    pop();
  }

  setTool(t) {
    this.tool = t;
  }

  checkClick() {
    if (mouseX >= this.x - 2.5 && mouseX <= this.x + 25) {
      if (mouseY >= this.y + 4 && mouseY <= this.y + 20) {
        if (this.tool != undefined) {
          this.tool.call();
        } else {
          if (debug) {
            print(this.type, 'has an undefined tool');
          }
        }
      }
    }
  }
}
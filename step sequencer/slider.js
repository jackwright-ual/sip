class Slider {
  constructor(x, y, offset) {
    this.pos = createVector(x, y);
    this.offset = x;
  }

  draw() {
    push();
    fill(255, 100, 0, 80);
    rect(this.pos.x, this.pos.y + 41, 40, height - 60);
    pop();
  }

  move() {
    if (frameCount % 30 == 0) {
      if (this.pos.x >= width - 80) {
        this.pos.x = 0;
      }

      this.pos.x += this.offset;
    }
  }

}
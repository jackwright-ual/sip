class Toolbar {
  constructor() {
  }
  
  draw() {
    push();
    noStroke();
    if(debug) {
      fill('red');
    }
    rect(0, 0, 30, height);
    for(let i = 0; i < buttons.length; i++) {
      buttons[i].draw();
    }
    textSize(20);
    //var folder_open = '\uf07c';
    //text(folder_open, 5, 30);
    pop();
  }
}
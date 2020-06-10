class button {
  /*
   * x: the x position
   * y: the y position
   * frequency: the frequency of the note which is played
   */
  constructor(x, y, frequency) {
    this.pos = createVector(x, y);
    this.pressed = false;
    this.frequency = frequency;
    this.osc = new p5.SinOsc();
    
    this.envelope = new p5.Envelope();
    this.envelope.setADSR(0.001, 0.5, 0.1, 0.5);
    this.envelope.setRange(10, 0);
    
    this.osc.start();
    this.osc.amp(0);
  }
  
  /*
   * toggle state of button
   */
  togglePressed() {
    this.pressed = !this.pressed;
  }
  
  /*
   * Display the button
   */
  draw() {
    push();
    
    //change fill colour based on state
    fill(this.pressed ? color(255, 0, 0) : color(0, 0, 0));
    
    //x, y, width, height, detailX, detailY (rounding)
    rect(this.pos.x, this.pos.y, 40, 40, 5, 5);
    pop();
  }
  
  /*
   * play sound of button
   */
  play() {
    this.osc.freq(midiToFreq(this.frequency));
    this.osc.amp(0.01, 0.1);
    this.envelope.play(this.osc, 0, 0.1);
  }
}
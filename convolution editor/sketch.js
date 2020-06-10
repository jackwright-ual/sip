let input;
let img;
let fa;
let buttons;

let debug = false;

let inputs = [];
let imgOrig = null;
let kernel = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0]
];

let options = {
  convolute: false,
  showChangeKernel: false

}

function preload() {
  
  pixelDensity(1);
  fa = loadFont('fa.otf');
  input = createFileInput(handleFile);
  input.hide();

  //define buttons
  buttons = [
    new Button(5, 10, 'open'),
    new Button(5, 35, 'toggle'),
    new Button(5, 60, 'kernel'),
  ];

  buttons[0].setTool(function() {
    if (debug) {
      print(input);
    }
    input.elt.click()
  });

  buttons[1].setTool(function() {
    if (img) {
      options.convolute = !options.convolute;
    } else {
      print('image is not loaded');
    }
  });

  buttons[2].setTool(function() {
    if (!options.showChangeKernel) {
      inputs = [];
    }
    options.showChangeKernel = !options.showChangeKernel;
  });

  toolbar = new Toolbar();
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  textFont(fa);
}

function draw() {
  background(220);

  toolbar.draw();
  if (img) {
    input.hide();
    //createCanvas(img.width, img.height);

    scale(0.8);
    if(options.convolute) {
      //img = imgOrig;
      convolute(img, imgOrig, kernel);
    }
    
    image(img, 37, 0);

    changeKernel();
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = loadImage(file.data);
    imgOrig = loadImage(file.data);
  }
}

function changeKernel() {
  for (input of inputs) {
    if (options.showChangeKernel) {
      input.show();
    } else {
      input.hide();
    }
  }
  if (options.showChangeKernel) {
    for (let i = 0; i < kernel.length; i++) {
      let x = 35 + (30 * i);
      for (let j = 0; j < kernel[i].length; j++) {
        let y = 70 + (25 * j);
        if (inputs.length < kernel.length * kernel[i].length) {
          let input = createInput('');
          input.position(x, y);
          
          //on input change
          input.input(function() {
            kernel[i][j] = this.value();
          });
          
          input.size(15);
          input.value(kernel[i][j]);
          inputs.push(input);
          if (debug) {
            print('adding new input for kernel edit');
          }
        }
      }
    }
  }
}

function convolute(img, imgOrig, kernel) {
  imgOrig.loadPixels();
  img.loadPixels();
  for (let y = 1; y < img.height - 1; y++) {
    for (let x = 1; x < img.width - 1; x++) {
      let index = (x + y * img.width) * 4
      let result = 0


      for (let i = kernel.length - 1; i >= 0; i--) {
        for (let j = kernel[i].length - 1; j >= 0; j--) {

          let px = x + i;
          let py = y + j;

          //new index
          let ind = (px + py * img.width) * 4;

          //colours
          let r = imgOrig.pixels[ind];
          let g = imgOrig.pixels[ind + 1];
          let b = imgOrig.pixels[ind + 2];

          //average of colours
          let avg = (r + g + b) / 3;

          //convolution value
          let val = avg * kernel[i][j];

          result += val;
        }
      }

      img.pixels[index] = result
      img.pixels[index + 1] = result
      img.pixels[index + 2] = result
      img.pixels[index + 3] = 255

    }
  }
  img.updatePixels();
}

function mousePressed() {
  for (let button of buttons) {
    button.checkClick();
  }
}

function keyPressed() {
  print(key);
  if(key == '+') {
    let tempArr = [];
    
    for(let i = 0; i < kernel[0].length; i++) {
      tempArr.push(0);
    }
    
    kernel.push(tempArr);
    for(let i = 0; i < kernel.length; i++) {
      kernel[i].push(0);
    }
  }
  
  if(key == '_') {     
    for(let i = 0; i < kernel.length; i++) {
      kernel[i].pop(kernel.length-1);
    }    
    kernel.pop(kernel.length-1);
  }
  if (key == 'd') {
    debug = !debug;
    print('Toggled debug:', debug);
  }
}
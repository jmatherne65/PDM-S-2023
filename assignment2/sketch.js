function setup() {
  createCanvas(1200, 600);
   background(240);
}

function draw() {
  push();
  noStroke();
  fill("red");
  square(0,0,30);
  fill("orange");
  square(0,32,30);
  fill("yellow");
  square(0,64,30);
  fill("rgb(131,233,58)");
  square(0,96,30);
  fill("cyan");
  square(0,128,30);
  fill("blue");
  square(0,160,30);
  fill("magenta");
  square(0,192,30);
  fill("brown");
  square(0,224,30);
  fill("white")
  square(0,256, 30);
  fill("black");
  square(0,288,30);
  pop();
  if(mouseIsPressed === true && mouseX <= 30){
    if(mouseY <= 30){
      stroke("red");
    }
    if(mouseY <= 64 && mouseY >= 32){
      stroke("orange");
    }
    if(mouseY <= 96 && mouseY >= 66){
      stroke("yellow");
    }
    if(mouseY <= 128 && mouseY >= 98){
      stroke("rgb(131,233,58)");
    }
    if(mouseY <= 160 && mouseY >= 130){
      stroke("cyan");
    }
    if(mouseY <= 192 && mouseY >= 162){
      stroke("blue");
    }
    if(mouseY <= 224 && mouseY >= 196){
      stroke("magenta");
    }
    if(mouseY <= 256 && mouseY >= 226){
      stroke("brown");
    }
    if(mouseY <= 288 && mouseY >= 258){
      stroke("white");
    }
    if(mouseY <= 318 && mouseY >= 290){
      stroke("black");
    }
  }
   else if(mouseIsPressed === true){
    strokeWeight(15);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
}
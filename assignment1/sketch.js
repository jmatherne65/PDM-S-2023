function setup() {
  createCanvas(200, 600);
}

function draw() {
  angleMode(DEGREES);
  background('white');
  
  //Begin Drawing 1
  noStroke();
  fill("lime");
  rect(0, 0, 200, 100);
  fill('white')
  strokeWeight(1);
  stroke(51);
  square(110, 10, 80);
  circle(50, 50, 80);
  
  //Begin Drawing 2
  noStroke();
  fill('rgba(255,170,170,0.8)')
  circle(75, 150, 80);
  fill('rgba(170,255,170,0.8)');
  circle(100, 200, 80);
  fill('rgba(170,170,255,0.8)');
  circle(50, 200, 80);
  
  //Begin Drawing 3
  fill(0);
  rect(0, 250, 200, 100);
  fill("yellow");
  arc(50, 300, 50, 50, 225, 135);
  fill("red");
  rect(110, 300, 50, 25);
  circle(135, 300, 50);
  fill("white");
  circle(125, 295, 15);
  circle(145, 295, 15);
  fill("blue");
  circle(125, 295, 10);
  circle(145, 295, 10);
  
  //Begin Drawing 4
  fill(0,0,127,255);
  square(0, 375, 200);
  strokeWeight(3);
  stroke("white");
  fill("#279327");
  circle(100, 475, 100);
  //Make Star
  fill("red");
  beginShape();
    vertex(100, 425);
    vertex(110, 465);
    vertex(150, 465);
    vertex(120, 485);
    vertex(130, 520);
    vertex(100, 495);
    vertex(80, 525);
    vertex(80, 485);
    vertex(48, 465);
    vertex(90, 465);
    vertex(100, 425);
  endShape(); 
}

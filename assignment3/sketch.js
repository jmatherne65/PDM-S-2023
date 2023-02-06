//Declare Sprite Sheets
let spriteSheet;
let spriteSheet2;
//Declare waking animation variables
let walkingAnimation;
let walkingAnimation2;
let walkingAnimation3;
let walkingAnimation4;
let walkingAnimation5;
let ralseiWalking;
let ralseiWalking2;
let ralseiWalking3;
let ralseiWalking4;
//Preload both Sprite Sheets.
function preload() {
  spriteSheet = loadImage("SpelunkyGuySprites.png");
  spriteSheet2 = loadImage("DeltaruneGuySprites.png");
}
//Create the canvas, make the modifiable point of the images the center, and call the function WalkingAnimation on each animation. 
function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  walkingAnimation = new WalkingAnimation(spriteSheet,80,80,200,200,9);
  walkingAnimation2 = new WalkingAnimation(spriteSheet,80,80,200,120,9);
  walkingAnimation3 = new WalkingAnimation(spriteSheet,80,80,200,280,9);
  walkingAnimation4 = new WalkingAnimation(spriteSheet,80,80,280,200,9);
  walkingAnimation5 = new WalkingAnimation(spriteSheet,80,80,120,200,9);
  ralseiWalking = new WalkingAnimation(spriteSheet2,30,60,120,120,4);
  ralseiWalking2 = new WalkingAnimation(spriteSheet2,30,60,120,280,4);
  ralseiWalking3 = new WalkingAnimation(spriteSheet2,30,60,280,280,4);
  ralseiWalking4 = new WalkingAnimation(spriteSheet2,30,60,280,120,4);
}
//Draw the background, animations, and handle the keys pressed and released for movement.
function draw() {
  background(220);
  
  walkingAnimation.draw();
  walkingAnimation2.draw();
  walkingAnimation3.draw();
  walkingAnimation4.draw();
  walkingAnimation5.draw();
  ralseiWalking.draw();
  ralseiWalking2.draw();
  ralseiWalking3.draw();
  ralseiWalking4.draw();
}

function keyPressed() {
  walkingAnimation.keyPressed(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation2.keyPressed(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation3.keyPressed(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation4.keyPressed(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation5.keyPressed(RIGHT_ARROW,LEFT_ARROW);
  ralseiWalking.keyPressed(LEFT_ARROW,RIGHT_ARROW);
  ralseiWalking2.keyPressed(LEFT_ARROW,RIGHT_ARROW);
  ralseiWalking3.keyPressed(LEFT_ARROW,RIGHT_ARROW);
  ralseiWalking4.keyPressed(LEFT_ARROW,RIGHT_ARROW);
}

function keyReleased() {
  walkingAnimation.keyReleased(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation2.keyReleased(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation3.keyReleased(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation4.keyReleased(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation5.keyReleased(RIGHT_ARROW,LEFT_ARROW);
  ralseiWalking.keyReleased(LEFT_ARROW,RIGHT_ARROW);
  ralseiWalking2.keyReleased(LEFT_ARROW,RIGHT_ARROW);
  ralseiWalking3.keyReleased(LEFT_ARROW,RIGHT_ARROW);
  ralseiWalking4.keyReleased(LEFT_ARROW,RIGHT_ARROW);
}
//The class, WalkingAnimation, that contains a constructor with the parameters for the inputted spritesheet, width, height, x, y, length of animation and offsets in both x and y.
class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength, offsetX = 0, offsetY = 0) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }

  draw() {

    this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : 0; //If the sprite is not moving u = the modulus of the current frame and the animation length.
   //This will scale the image for properly being able to move across the frame
    push();
    translate(this.dx,this.dy);
    scale(this.xDirection,1);
  
    image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw+this.offsetX,this.v*this.sh+this.offsetY,this.sw,this.sh);
    pop();
    //the current frame used in calculations increases here every multiple of 6 frames.
    if (frameCount % 6 == 0) {
      this.currentFrame++;
    }
  
    this.dx += this.moving;
  }
//The keypressed and keyreleased functions tell the sprite what direction to move and what frame to start on, as well as what frame to stop on when the key is released.
  keyPressed(right, left) {
    if (keyCode === right) {
      this.moving = 1;
      this.xDirection = 1;
      this.currentFrame = 1;
    } else if (keyCode === left) {
      this.moving = -1;
      this.xDirection = -1;
      this.currentFrame = 1;
    }
  }

  keyReleased(right,left) {
    if (keyCode === right || keyCode === left) {
      this.moving = 0;
    }
  }
}
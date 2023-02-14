//Declare variables to allow the loading in of the spritesheets and the actual animation
let spriteSheet;
let spriteSheetFilenames = ["BugWalk (1).png", "BugWalk (Red) (1).png", "BugWalk (Blue) (1).png"];
let spriteSheets = [];
let animations = [];

//Set up the constants for the gamestate
const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

/*Declare a variable for game that has the parameters of a player score, maximum score, total elapsed time, 
the total sprites on screen and what game state to begin in.*/
let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 15, state: GameState.Start};

//Preload all spritesheets
function preload() {
  for(let i=0; i < spriteSheetFilenames.length; i++) {
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }
}

//Set up the canvas, change the angles to degrees, and the image moving to be centered. Finally, call the reset function for when the game resets. 
function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);

  reset();
}

/*Set all counting variables (Time, Score) to 0, declare a number of total sprites between 10 and 30, and 
initialize the bug's walking animation with its respective parameters.*/
function reset() {
  game.elapsedTime = 0;
  game.score = 0;
  game.totalSprites = random(10,30);
  animations = [];
  for(let i=0; i < game.totalSprites; i++) {
    animations[i] = new WalkingAnimation(random(spriteSheets),30,30,random(100,300),random(100,300),9,random(0.5,1),6,random([0,1]));
  }
}

/*Creates the game start and end screens, gameplay and hud including score, timer, and bugs.*/
function draw() {
  switch(game.state) {
    case GameState.Playing:
      background(220);
  
      for(let i=0; i < animations.length; i++) {
        animations[i].draw();
      }
      fill(0);
      textSize(40);
      text(game.score,20,40);
      let currentTime = game.maxTime - game.elapsedTime;
      text(ceil(currentTime), 300,40);
      game.elapsedTime += deltaTime / 1000;

      if (currentTime < 0)
        game.state = GameState.GameOver;
      break;
    case GameState.GameOver:
      game.maxScore = max(game.score,game.maxScore);

      background(0);
      fill(255);
      textSize(40);
      textAlign(CENTER);
      text("Game Over!",200,200);
      textSize(35);
      text("Score: " + game.score,200,270);
      text("Max Score: " + game.maxScore,200,320);
      break;
    case GameState.Start:
      background(0);
      fill(255);
      textSize(50);
      textAlign(CENTER);
      text("Bug Squasher",200,200);
      textSize(30);
      text("Press Any Key to Start",200,300);
      break;
  }
  
}

//This function is the handler for starting the game or restarting the game by pressing a key
function keyPressed() {
  switch(game.state) {
    case GameState.Start:
      game.state = GameState.Playing;
      break;
    case GameState.GameOver:
      reset();
      game.state = GameState.Playing;
      break;
  }
}

/*This function is the handler for pressing the mouse, which can be used to kill bugs. When a bug is 
killed the score increases and the speed of all other bugs increase. Otherwise, the bugs continue moving as normal.*/
function mousePressed() {
  switch(game.state) {
    case GameState.Playing:
      for (let i=0; i < animations.length; i++) {
        let contains = animations[i].contains(mouseX,mouseY);
        if (contains) {
          if (animations[i].moving != 0) {
            animations[i].stop();
              game.score += 1;
              for(let i=0; i < game.totalSprites; i++) {
              animations[i].speedIncrease();
              }
          }
          else {
            if (animations[i].xDirection === 1)
                animations[i].moveRight();
            else
              animations[i].moveLeft();
          }
        }
      }
      break;
  }
  
}

/*Initializes the class WalkingAnimation with parameters that define the spritesheet used, 
width, height, length of animation, speed of animation, framerate used, verticality, and x and y offsets.*/
class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength, speed, framerate, vertical = false, offsetX = 0, offsetY = 0) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.speed = speed;
    this.framerate = framerate*speed;
    this.vertical = vertical;
  }

  /*This draw function contains the u and v placement of the sprites to loop through the first 9 in the spritesheet, the proper method to handle bugs moving vertically,
  proper scaling of the bug sprites, and the math to handle the currentFrame iteration.*/
  draw() {
  
    this.u = (this.moving != 0) ? this.currentFrame % (this.animationLength / 3) : this.u;
    this.v = (this.moving != 0) ? floor((this.currentFrame % this.animationLength)/3) : this.v;
    push();
    translate(this.dx,this.dy);
    if (this.vertical)
    scale(this.xDirection,1);
    
    scale(4);
    image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw+this.offsetX,this.v*this.sh+this.offsetY,this.sw,this.sh);
    pop();
    let proportionalFramerate = round(frameRate() / this.framerate);
    if (frameCount % proportionalFramerate == 0) {
      this.currentFrame++;
    }
  
    if (this.vertical) {
      this.dy += this.moving*this.speed;
      this.move(this.dy,this.sw / 4,height - this.sw / 4);
    }
    else {
      this.dx += this.moving*this.speed;
      this.move(this.dx,this.sw / 4,width - this.sw / 4);
    }

    
  }

  //This move function detects if a bug will hit the bounds of the canvas and then redirects it in the opposite direction.
  move(position,lowerBounds,upperBounds) {
    if (position > upperBounds) {
      this.moveLeft();
    } else if (position < lowerBounds) {
      this.moveRight();
    }
  }

  //This function allows the sprites to move in the positive x direction.
  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
  }

  //This function allows the sprites to move in the negative x direction.
  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
  }

  //This function detects if the mouse is within the bug sprite to click and kill the bug
  contains(x,y) {
    let insideX = x >= this.dx - 26 && x <= this.dx + 25;
    let insideY = y >= this.dy - 35 && y <= this.dy + 35;
    return insideX && insideY;
  }

  //This function is for increasing the bug speed for alive bugs after one is killed.
  speedIncrease()
  {
    this.speed += 0.25;
  }

  //This function stops the movement of a dead bug and sets the sprite for the dead bug to be the dead sprite.
  stop() {
    this.moving = 0;
    this.u = 0;
    this.v = 3;
  }
}
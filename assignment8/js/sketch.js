const bgMusic = new Tone.Player("sounds/bassline.mp3").toDestination();

const synth = new Tone.AMSynth().toDestination();
let clearMelody = ["C6", "E6", "G6"];
let clearSequence = new Tone.Sequence((time, note) => {
  synth.triggerAttackRelease(note, 0.5);
  console.log(note);
}, clearMelody, '8n');

const synth2 = new Tone.Synth({
  "oscillator": {
      "type": "sine"
  },
  "envelope": {
      "attack": 0.001,
      "decay": 0.1,
      "sustain": 0.1,
      "release": 1.2
  }
}).toDestination();
let drawMelody = ["C6", "E6", "G6"];
let drawSequence = new Tone.Sequence((time, note) => {
  synth2.triggerAttackRelease(note, 0.5);
  console.log(note);
}, drawMelody, '8n');

var colorSynth = new Tone.Synth({
    "oscillator": {
        "type": "sine"
    },
    "envelope": {
        "attack": 0.001,
        "decay": 0.1,
        "sustain": 0.1,
        "release": 1.2
    }
});

colorSynth.toDestination();


function setup() {
  createCanvas(1200, 600);
  background(240);
  bgMusic.volume = 0.3;
  bgMusic.loop = true;
  console.log('Tone started');
}

function mousePressed() {
  clearPage();
}

function keyPressed() {
  if (keyCode === 32) {
    Tone.start();
    console.log('Tone started');
    playSound();
  }
}

function playSound() {
  bgMusic.start();
}

function mouseReleased() {
  Tone.Transport.stop('+4n');
}

function clearPage() {
  if (mouseY <= 350 && mouseY >= 320 && mouseX <= 30) {
    noStroke();
    background(240);

    clearSequence.start();
    Tone.Transport.start();
    console.log('transport started');
  }
}

function draw() {
  push();
  noStroke();
  fill("red");
  square(0, 0, 30);
  fill("orange");
  square(0, 32, 30);
  fill("yellow");
  square(0, 64, 30);
  fill("rgb(131,233,58)");
  square(0, 96, 30);
  fill("cyan");
  square(0, 128, 30);
  fill("blue");
  square(0, 160, 30);
  fill("magenta");
  square(0, 192, 30);
  fill("brown");
  square(0, 224, 30);
  fill("white");
  square(0, 256, 30);
  fill("black");
  square(0, 288, 30);
  strokeWeight(2);
  stroke(12);
  fill(240);
  square(0, 320, 30);
  pop();
  if (mouseIsPressed === true && mouseX <= 30) {
    if (mouseY <= 30) {
      stroke("red");
      colorSynth.triggerAttackRelease('C4', "8n");
    }
    if (mouseY <= 64 && mouseY >= 32) {
      stroke("orange");
      colorSynth.triggerAttackRelease('D4', "8n");
    }
    if (mouseY <= 96 && mouseY >= 66) {
      stroke("yellow");
      colorSynth.triggerAttackRelease('E4', "8n");
    }
    if (mouseY <= 128 && mouseY >= 98) {
      stroke("rgb(131,233,58)");
      colorSynth.triggerAttackRelease('F4', "8n");
    }
    if (mouseY <= 160 && mouseY >= 130) {
      stroke("cyan");
      colorSynth.triggerAttackRelease('G4', "8n");
    }
    if (mouseY <= 192 && mouseY >= 162) {
      stroke("blue");
      colorSynth.triggerAttackRelease('A5', "8n");
    }
    if (mouseY <= 224 && mouseY >= 196) {
      stroke("magenta");
      colorSynth.triggerAttackRelease('B5', "8n");
    }
    if (mouseY <= 256 && mouseY >= 226) {
      stroke("brown");
      colorSynth.triggerAttackRelease('C5', "8n");
    }
    if (mouseY <= 288 && mouseY >= 258) {
      stroke("white");
      colorSynth.triggerAttackRelease('D5', "8n");
    }
    if (mouseY <= 318 && mouseY >= 290) {
      stroke("black");
      colorSynth.triggerAttackRelease('E5', "8n");
    }
  }
  else if (mouseIsPressed === true) {
    strokeWeight(15);
    line(mouseX, mouseY, pmouseX, pmouseY);
    drawSequence.start();
    Tone.Transport.start();
    mouseReleased();
  }
  
}

//Set variable name for the image to display with the sound
let coinart;

//Preload in the image to be displayed.
function preload() {
  coinart = loadImage("coinart.png");
}

//Generate a square Monosynth with specific envelope values.
const synth = new Tone.MonoSynth({
	oscillator: {
		type: "square"
	},
	envelope: {
    attack: 0.1,
    decay: 0.6,
    sustain: 0,
    release: 0.2
	}
}).toDestination();

//Generate the canvas and center the imagemode.
function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
}

//Draw background and if the mouse is pressed, display the image. 
function draw() {
  background("#8FFB96");
  if(mouseIsPressed === true)
    image(coinart, 200, 200, 200, 200);
}

//To generate the coin collection sound, start tone, and then play E5 upon mouse pressed for 8n, switching to a B5 0.2 seconds in.
function mousePressed() {
  Tone.start();
  synth.triggerAttack("E5", "8n");
  synth.setNote("B5", "+0.2");
}
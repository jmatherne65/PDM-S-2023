//Declare Synth and Distortion effect
const synth = new Tone.MembraneSynth();
const distort = new Tone.Distortion(0);
synth.connect(distort);

//Declare notes and associated keys to press for them
let notes = {

  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'

}

//Create Canvas, Slider, allow slider to change distortion level and output sound
function setup() {
  createCanvas(400, 400);
  slider = new Nexus.Slider("#slider");

  slider.on('change', (v) =>  {
    distort.distortion = v;
  }); 

  distort.toDestination();
}

//Draw background
function draw() {
  background("#8FFB96");
}

//When a key is pressed the synth plays an 8n of the associated note
function keyPressed() {
  let whatNote = notes[key];
  synth.triggerAttackRelease(whatNote, "8n");
}
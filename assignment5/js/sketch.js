//Create players for all four sounds
let sounds = new Tone.Players({
  "OMG": "sounds/omg.mp3",
  "whoaKenny": "sounds/whoakenny.mp3",
  "prodTag": "sounds/prodtag.mp3",
  "airHorn": "sounds/airhorn.mp3"
})

//Declare reverb for slider, slider, buttons array, and sound name array.
const reverb = new Tone.Reverb(0.5);
let soundNames = ["OMG", "whoaKenny", "prodTag", "airHorn"];
let buttons = [];
let slider;

//Create canvas, connect sounds and reverb to play, create and label buttons, create and position slider and allow it to modify reverb, position buttons.
function setup() {
  createCanvas(600, 600);
  sounds.connect(reverb);
  reverb.toDestination();
  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].mousePressed( () => buttonSound(word));
  })

  slider = createSlider(0., 50., 0., 10.);
  slider.position(80, 550);
  slider.style('width', '400px');
  slider.mouseReleased( () => {
    reverb.decay = slider.value();
  })

  buttons[0].position(100, 150);
  buttons[1].position(300, 150);
  buttons[2].position(100, 300);
  buttons[3].position(300, 300);

}

//Add instruction text and background color.
function draw() {
  background("#87CEEB");
  text('Press each button for sound, and move the slider at the bottom to increase or decrease length of reverb applied.', 0, 10)
}

//Plays the proper sound when the button is pressed.
function buttonSound(whichSound) {
  sounds.player(whichSound).start();
}
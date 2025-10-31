let scrollManager;
let cassette;

let initialised = false;

let pagePadding = 15;
let canvasHeight = 300;

let canvasElement;

let handwritingFont = "Caveat-VariableFont_wght";
let boldFont = "BowlbyOneSC-Regular";

function preload() {
  loadFont("cassette/fonts/" + boldFont + ".ttf");
  loadFont("cassette/fonts/" + handwritingFont + ".ttf");
}

function setup() {
  canvasElement = document.getElementById("cassette")

  createCanvas(window.innerWidth - (2 * pagePadding), canvasHeight, "P2D", canvasElement);

  scrollManager = new JrScrollManager();
  cassette = new Cassette(width / 2, height / 2);

  initialised = true;
}

function windowResized() {
  resizeCanvas(window.innerWidth - (2 * pagePadding), canvasHeight);
  cassette.setCassettePosition(width / 2, height / 2);
}

let test;

function draw() {
  if (!initialised) return;

  background(76, 159, 231);

  scrollManager.tick();

  cassette.draw(scrollManager.a);
}

const cassette_sketch = function(p) {
  let scrollManager;
  let cassette;

  let initialised = false;

  let pagePadding = 15;
  let canvasHeight = 300;

  let canvasElement;

  let handwritingFont = "Caveat-VariableFont_wght";
  let boldFont = "BowlbyOneSC-Regular";

  let bg = { r: 76, g: 159, b: 231 };

  p.preload = function() {
    p.loadFont("cassette/fonts/" + boldFont + ".ttf");
    p.loadFont("cassette/fonts/" + handwritingFont + ".ttf");
  }

  p.setup = function() {
    canvasElement = document.getElementById("cassette")

    p.createCanvas(window.innerWidth - (2 * pagePadding), canvasHeight, "P2D", canvasElement);

    scrollManager = new JrScrollManager(p);
    cassette = new Cassette(p, bg);

    initialised = true;
  }

  p.windowResized = function() {
    p.resizeCanvas(window.innerWidth - (2 * pagePadding), canvasHeight);
    cassette.setCassettePosition(p.width / 2, p.height / 2);

    p.clear();
  }

  p.draw = function() {
    if (!initialised) return;

    scrollManager.tick();

    p.fill(bg.r, bg.g, bg.b);
    cassette.draw(scrollManager.a);
  }
}

const jr_sketch_1 = new p5(cassette_sketch);
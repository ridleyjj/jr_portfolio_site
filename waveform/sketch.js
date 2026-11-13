var refresh_rate = 0;
var counter = 0;
var buffer = []
var readIndex = 0;
var lineWidth = 5;
var maxLineHeight = 0;
var canvasHeightWaveform = 250;
var scrollManagerWave;
var negative = false;

function setup() {
  canvasElement = document.getElementById("waveform")

  createCanvas(window.innerWidth , canvasHeightWaveform, "P2D", canvasElement);

  scrollManagerWave = new JrScrollManager();
  scrollManagerWave.dragDelay = 0;
  scrollManagerWave.dragDampening = 0.9;

  var bufferSize = width / lineWidth;
  maxLineHeight = (height / 2) - 40;
  for (var i = 0; i < bufferSize; i++) {
    buffer.push(random(maxLineHeight));
  }

  draw_audio_wave()
}

function map_a_to_refresh_rate(value, minRate, maxRate) {
  // starts 0-1
  var range = maxRate = minRate;
  value *= range;
  value = Math.round(value);  // now 0 - 5
  value = maxRate - value; // now 8 - 3
  if (value == maxRate)
    value = 0;

  return value;
}

function draw() {
  if (!scrollManagerWave) {
    // print("not init!")
    return;
  }
  scrollManagerWave.tick();

  negative = scrollManagerWave.a < 0;
  var a = map_a_to_refresh_rate ( Math.abs(scrollManagerWave.a), 8, 9 );

  refresh_rate = a;

  if (!should_update())
    return;

  // blue: 76, 158, 231

  background(255, 255, 255);

  draw_waveform();
}

function draw_audio_wave() {
  background(255, 255, 255);

  draw_waveform();
}

function should_update() {
  if (refresh_rate == 0) {
    counter = 0;
    return false;
  }

  counter++;
  if (counter >= refresh_rate) {
    counter = 0;
    return true;
  }

  return false;
}

function draw_waveform() {
  stroke(76, 158, 231);
  strokeWeight(lineWidth);
  for (var i = 0; i < buffer.length; i++) {
    
      // var amplitude = random(maxLineHeight);
    var index = (readIndex + i) % buffer.length;
    var amplitude = buffer[index];
    draw_sample(amplitude, i * lineWidth, height / 2);
  }
  buffer[readIndex] = random(maxLineHeight);
  if (negative)
    readIndex--;
  else
    readIndex++;
  if (readIndex >= buffer.length)
    readIndex = 0;
  else if (readIndex < 0)
    readIndex = buffer.length - 1;
}

function draw_sample(amplitude, x, y) {
  line(x, y, x, y + amplitude);
  line(x, y, x, y - amplitude);
}

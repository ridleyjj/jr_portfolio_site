const waveform_sketch = function(p) {
  var refresh_rate = 0;
  var counter = 0;
  var buffer = []
  var readIndex = 0;
  var lineWidth = 5;
  var maxLineHeight = 0;
  var canvasHeightWaveform = 250;
  var scrollManagerWave;
  var negative = false;
  var canvasElementWave;

  p.setup = function() {
    canvasElementWave = document.getElementById("waveform")

    p.createCanvas(window.innerWidth , canvasHeightWaveform, "P2D", canvasElementWave);

    scrollManagerWave = new JrScrollManager();
    scrollManagerWave.dragDelay = 0;
    scrollManagerWave.dragDampening = 0.9;

    var bufferSize = p.width / lineWidth;
    maxLineHeight = (p.height / 2) - 40;
    for (var i = 0; i < bufferSize; i++) {
      buffer.push(p.random(maxLineHeight));
    }

    draw_audio_wave()
  }

  function map_a_to_refresh_rate(value, minRate, maxRate) {
    // starts 0-1
    var range = maxRate - minRate;
    value *= range;
    value = Math.round(value);  // now 0 - 5
    value = maxRate - value; // now 8 - 3
    if (value == maxRate)
      value = 0;

    return value;
  }

  p.draw = function() {
    if (!scrollManagerWave) {
      // print("not init!")
      return;
    }
    scrollManagerWave.tick();

    negative = scrollManagerWave.a < 0;
    var a = map_a_to_refresh_rate ( Math.abs(scrollManagerWave.a), 2, 6 );

    refresh_rate = a;

    if (!should_update())
      return;

    // blue: 76, 158, 231

    p.background(255, 255, 255);

    draw_waveform();
  }

  function draw_audio_wave() {
    p.background(255, 255, 255);

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
    p.stroke(76, 158, 231);
    p.strokeWeight(lineWidth);
    for (var i = 0; i < buffer.length; i++) {
      
        // var amplitude = random(maxLineHeight);
      var index = (readIndex + i) % buffer.length;
      var amplitude = buffer[index];
      draw_sample(amplitude, i * lineWidth, p.height / 2);
    }
    buffer[readIndex] = p.random(maxLineHeight);
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
    p.line(x, y, x, y + amplitude);
    p.line(x, y, x, y - amplitude);
  }
}

const jr_sketch_2 = new p5(waveform_sketch)
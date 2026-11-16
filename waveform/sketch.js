const waveform_sketch = function(p) {
  var buffer = []
  var lineWidth = 3;
  var canvasHeightWaveform = 250;
  var scrollManagerWave;
  var canvasElementWave;
  var prevWidth;
  var paddingWaveform = 15;

  p.setup = function() {
    canvasElementWave = document.getElementById("waveform")

    p.createCanvas(window.innerWidth - paddingWaveform, canvasHeightWaveform, "P2D", canvasElementWave);

    scrollManagerWave = new JrScrollManager(p);
    scrollManagerWave.dragDelay = 0;
    scrollManagerWave.dragDampening = 0.97;

    buffer = [];
    fill_buffer(true);

    prevWidth = p.width;
  }

  fill_buffer = function(isWider) {
    var bufferSize = Math.round(p.width / lineWidth);
    if (isWider) {
      i = buffer.length;
      while (buffer.length < bufferSize) {
        buffer.push(new SampleLine(p, i * lineWidth, lineWidth));
        i++;
      }
    } else {
      while (buffer.length > bufferSize) {
        buffer.pop();
      }
    }
  }

  p.draw = function() {
    if (!scrollManagerWave) {
      // print("not init!")
      return;
    }
    scrollManagerWave.tick();

    // // blue: 76, 158, 231

    p.background(255, 255, 255);

    let a = Math.min(8, Math.abs(scrollManagerWave.a) * 30);

    buffer.forEach((sample) => {
      sample.update(a);
      sample.draw();
    });
  }

  p.windowResized = () => {
    let isWider = window.innerWidth >= prevWidth;

    p.resizeCanvas(window.innerWidth - paddingWaveform, canvasHeightWaveform);
    fill_buffer(isWider);
    prevWidth = p.width;
  }
}

const jr_sketch_2 = new p5(waveform_sketch);
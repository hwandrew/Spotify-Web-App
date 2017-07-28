// establish all variables that the analyzer will use
var audio, canvas, ctx, source, context, analyzer, fbcArray,
  bars, barX, barWidth, barHeight;

// initialize analyzer data
function initAnalyzer() {
  // obtain the current instance of the audio object
  audio = document.getElementById("audioPlayer");
  audio.crossOrigin = "anonymous";
  context = new AudioContext(); // AudioContext object instance
  analyzer = context.createAnalyser();
  canvas = document.getElementById('visualizer');
  ctx = canvas.getContext('2d');
  // re-route audio playback into processing graph of the audioContext
  source = context.createMediaElementSource(audio);
  source.connect(analyzer);
  analyzer.connect(context.destination);
  updateFrame();
}

function updateFrame() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.requestAnimationFrame(updateFrame);
  fbcArray = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(fbcArray); // length of 1024
  // console.log(fbcArray[1000]);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00CCFF';
  bars = 200;
  for (var i = 0; i < bars; i++) {
    barX = i * 2;
    barWidth = 1;
    barHeight = -(fbcArray[i] / 2);
    ctx.fillRect(barX, canvas.height, barWidth, barHeight);
  }
}

$(function() {
  initAnalyzer();
});

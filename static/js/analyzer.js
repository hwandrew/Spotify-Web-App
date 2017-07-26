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
  window.requestAnimationFrame(updateFrame);
  fbcArray = new Uint8Array(analyzer.frequencyBinCount);
  analyzer.getByteFrequencyData(fbcArray);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00CCFF';
  bars = 100;
  for (var i = 0; i < bars; i++) {
    barX = i * 3;
    barWidth = 2;
    barHeight = -(fbcArray[i] / 2);
    ctx.fillRect(barX, canvas.height, barWidth, barHeight);
  }
}

$(function() {
  initAnalyzer();
});

function getCanvas() {
  return document.getElementById('mainCanvas');
}

function clear(canvas) {
  let context = canvas.getContext('2d');
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function initCanvasSize() {
  let canvas = getCanvas();
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  clear(canvas);
}


var game = new Game(16, 32, [3, 1, 1, 2]);

function onkeypress(e) {
  if (e.key == ' ') {
    game.press();
  }
}

function run(i) {
  let canvas = getCanvas();
  clear(canvas);
  if (i % 2 == 0) {
    game.end_test();
    game.start_next_test();
    game.draw_center(canvas);
  } else {
    game.draw_current_test(canvas);
  }
  setTimeout(() => run(i + 1), 400);
}

run(0);


window.onresize = initCanvasSize;
document.onkeypress = onkeypress;

initCanvasSize();
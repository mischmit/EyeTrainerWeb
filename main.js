let time_delta = 700;

function clear(canvas)
{
    let context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function initCanvasSize(canvas)
{
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    clear(canvas);
}

var game = new Game(16, 32, [ 3, 1, 1, 2 ]);

function onkeypress(e)
{
    if (e.key == ' ')
    {
        game.press();
    }
}

let cycle_times = [ 2, 1, 2, 1 ];
let cycle = [
    (game, canvas) => {
        clear(canvas);
        game.draw_center(canvas);
    },
    (game, canvas) => { clear(canvas); },
    (game, canvas) => {
        clear(canvas);
        game.start_next_test();
        game.draw_current_test(canvas);
    },
    (game, canvas) => {
        clear(canvas);
        game.end_test();
    }
];

function run(canvas, i)
{
    cycle[i](game, canvas);
    let next_i = (i + 1) % cycle.length;
    setTimeout(() => run(canvas, next_i), cycle_times[i] * time_delta);
}

document.onkeypress = onkeypress;

Vue.component('GameCanvas', {
    template : `
    <div>
      <canvas ref="canvas"/>
    </div>`,
    mounted() {
        window.onresize = () => initCanvasSize(this.$refs.canvas);
        initCanvasSize(this.$refs.canvas);
        this.start_game();
    },
    methods: {
        start_game()
        {
            run(this.$refs.canvas, 0);
        }
    }
});

var app = new Vue({
    el : '#app',
    data : {
        gameRunning : false
    },
    methods:{
        runGame() {
            this.gameRunning = true;
        }
    }
});
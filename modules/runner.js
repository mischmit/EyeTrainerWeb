import {Game} from './game.js'

let time_delta = 700;

function clear(canvas)
{
    let context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
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

class Runner
{
    constructor(game, canvas)
    {
        this.game = game;
        this.canvas = canvas;
        document.onkeypress = (e) => this.onkeypress(e);
        this.run(0);
    }

    onkeypress(e)
    {
        if (e.key == ' ')
        {
            this.game.press();
        }
    }

    run(i)
    {
        cycle[i](this.game, this.canvas);
        let next_i = (i + 1) % cycle.length;
        setTimeout(() => this.run(this.canvas, next_i), cycle_times[i] * time_delta);
    }
}

export {Runner};
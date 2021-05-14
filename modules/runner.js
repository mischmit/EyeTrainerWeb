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
    constructor()
    {
        this.game = new Game(16, 32, [ 3, 1, 1, 2 ]);
        document.onkeypress = (e) => this.onkeypress(e);
    }
    
    onkeypress(e)
    {
        if (e.key == ' ')
        {
            this.game.press();
        }
    }

    run(canvas, i)
    {
        cycle[i](this.game, canvas);
        let next_i = (i + 1) % cycle.length;
        setTimeout(() => this.run(canvas, next_i), cycle_times[i] * time_delta);
    }

    start(canvas)
    {
        this.run(canvas, 0);
    }
}

export {Runner};
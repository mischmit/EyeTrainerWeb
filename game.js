var ALL_QUADRANTS = [ [ -1, 1 ], [ 1, 1 ], [ 1, -1 ], [ -1, -1 ] ];

function shuffle(a)
{
    for (let i = a.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [ a[j], a[i] ];
    }
    return a;
}

class Cell
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.ref_count = 0;
        this.count_hit = 0;
        this.count_missed = 0;
    }

    hit()
    {
        this.count_hit++;
    }

    missed()
    {
        this.count_missed++;
    }

    is_quadrant(quadrant)
    {
        this.x * quadrant[0] > 0 && this.y * quadrant[1] > 1;
    }
}

class Test
{
    constructor(cell)
    {
        this.cell = cell;
        this.pressed = undefined;
        this.ref_count += 1;
    }

    press()
    {
        this.pressed = true;
    }

    done()
    {
        if (this.pressed === undefined)
        {
            this.pressed = false;
        }
        if (this.pressed)
        {
            this.cell.hit();
        }
        else
        {
            this.cell.missed();
        }
    }
}

class Game
{
    constructor(rows, cols, quadrant_frequency)
    {
        this.rows = rows;
        this.cols = cols;
        this.tests = [];
        this.cells = [];

        for (let i = 0; i < 4; i++)
        {
            let quadrant = ALL_QUADRANTS[i];
            let frequency = quadrant_frequency[i];
            for (let x = 1; x <= cols; x++)
            {
                for (let y = 1; y <= rows; y++)
                {
                    let cell = new Cell(x * quadrant[0], y * quadrant[1]);
                    this.cells.push(cell);
                    for (let j = 0; j < frequency; j++)
                    {
                        this.tests.push(new Test(cell));
                    }
                }
            }
        }
        shuffle(this.tests);
        this.current_test_index = 0;
    }

    current_test()
    {
        return this.tests[this.current_test_index];
    }

    cell_to_pixel(x, y, size)
    {
        let i = x + this.cols;
        let j = y + this.rows + 1;
        let [w, h] = size;
        return [ i / (this.cols * 2 + 1) * w, j / (this.rows * 2 + 1) * h ];
    }

    draw_cell(cell, canvas)
    {
        this.draw_square(cell.x, cell.y, canvas);
    }

    draw_center(canvas)
    {
        this.draw_square(0, 0, canvas);
    }

    draw_square(x, y, canvas)
    {
        let size = [ canvas.width, canvas.height ];
        let [left, top] = this.cell_to_pixel(x, y, size);
        let [right, bottom] = this.cell_to_pixel(x + 1, y - 1, size);

        let context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(left, top, right - left, bottom - top);
    }

    press()
    {
        this.current_test().press();
    }

    start_next_test()
    {
        if (!this.is_done())
        {
            this.current_test_index++;
        }
    }

    on_press()
    {
        this.current_test().press();
    }

    draw_current_test(canvas)
    {
        this.draw_cell(this.current_test().cell, canvas);
    }

    end_test()
    {
        this.current_test().done();
    }

    is_done()
    {
        return this.current_test_index >= this.tests.length - 1;
    }
}
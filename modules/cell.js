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
        return this.x * quadrant[0] > 0 && this.y * quadrant[1] > 1;
    }
}

export {Cell};
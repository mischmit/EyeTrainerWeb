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

export {Test};
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'
import { Runner } from './modules/runner.js'
import { Game } from './modules/game.js'

function initCanvasSize(canvas)
{
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}

Vue.component('GameCanvas', {
    template : `
    <div>
      <canvas ref="canvas"/>
    </div>`,
    mounted() {
        window.onresize = () => initCanvasSize(this.$refs.canvas);
        initCanvasSize(this.$refs.canvas);
        this.start_runner();
    },
    props : [ "game" ],
    methods : {
        start_runner() {
            this.runner = new Runner(this.game, this.$refs.canvas);
        }
    }
});

var app = new Vue({
    el : '#app',
    data : {gameRunning : false, game : null},
    methods : {
        runGame() {
            this.game = new Game(16, 32, [ 3, 1, 1, 2 ]);
            this.gameRunning = true;
        }
    }
});
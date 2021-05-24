import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

import { Game } from './modules/game.js'
import {Runner} from './modules/runner.js'

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
        this.runner = new Runner(this.game, this.runner_settings, this.$refs.canvas);
    },
    props : [ "game", "runner_settings" ]
});

var app = new Vue({
    el : '#app',
    data : {state : 'intro', game : null, runner_settings : {time_delta : 700}},
    methods : {
        runGame() {
            this.game = new Game(16, 32, [ 3, 1, 1, 2 ]);
            this.state = 'game';
        },
        openSettings() {
            this.state = 'settings';
        },
        openMenu() {
            this.state = 'intro'
        }
    }
});
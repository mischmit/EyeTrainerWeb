import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'
import {Runner} from './modules/runner.js'

function initCanvasSize(canvas)
{
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
}

let theRunner = new Runner();

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
    methods : {
        start_runner() {
            theRunner.start(this.$refs.canvas);
        }
    }
});

var app = new Vue({
    el : '#app',
    data : {gameRunning : false},
    methods : {
        runGame() {
            this.gameRunning = true;
        }
    }
});
/**
 * loop.js
 *
 * The main game loop.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 4 Dec 2014
 */
import renderer from "./renderer";
import stage from "./stage";

const actions = [];

let running = false;

window.requestAnimFrame = (() =>
    window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            (callback => window.setTimeout(callback, 1000 / 60))
)();

(function loop() {
    if (running) {
        actions.forEach(action => action());
        renderer.render(stage);
    }
    window.requestAnimFrame(loop);
})();

export default {
    init() {
        renderer.render(stage);
    },
    add(...newActions) {
        newActions.forEach(newAction => actions.push(newAction));
    },
    start() {
        running = true;
    },
    stop() {
        running = false;
    },
    isRunning() {
        return running;
    }
};

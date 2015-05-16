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

let actions = [],
    running = false;

(function loop() {
    if (running) {
        actions.forEach(action => action());
        renderer.render(stage);
    }
    window.requestAnimationFrame(loop);
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
    }
};

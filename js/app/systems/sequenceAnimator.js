/**
 * sequenceAnimator.js
 *
 * A system that animates entities that have the withSequenceAnimation component by executing a sequence of steps,
 * where each step sets a frame on the entity's sprite texture and lasts a specific time interval.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 16/12/14
 */
define(function (require) {
    "use strict";

    let world = require("../game/world"),
        timer = require("../util/timer"),
        rex;

    function animation(wsa, tex) {
        let t = timer(),
            step = 0;

        wsa.running = true;
        tex.image = wsa.sequences[wsa.currentSequence][step].frame;
        return function () {
            if (t.duration() < wsa.sequences[wsa.currentSequence][step].interval) {
                return;
            }
            step++;
            if (step === wsa.sequences[wsa.currentSequence].length) {
                step = 0;
                wsa.running = false;
                return;
            }
            tex.image = wsa.sequences[wsa.currentSequence][step].frame;
            t.reset();
        };
    }

    function condition(wsa) {
        return wsa.running;
    }

    rex = require("../util/registerAndExecute")(animation, condition, "withSequenceAnimation", "textured");

    return function () {
        world.forEachEntityWithComponents("withSequenceAnimation", "textured")(rex);
    };
});

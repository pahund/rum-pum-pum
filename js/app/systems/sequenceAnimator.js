/**
 * sequenceAnimator.js
 *
 * A system that animates entities that have the withSequenceAnimation component by executing a sequence of steps,
 * where each step sets a frame on the entity's sprite texture and lasts a specific time interval.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16/12/14
 */
define(function (require) {
    "use strict";

    var world = require("app/game/world"),
        timer = require("app/util/timer"),
        rex;

    function animation(wsa, tex) {
        var t = timer(),
            step = 0;

        wsa.running = true;
        tex.image = wsa.sequence[step].frame;
        return function () {
            if (t.duration() < wsa.sequence[step].interval) {
                return;
            }
            step++;
            if (step === wsa.sequence.length) {
                step = 0;
                wsa.running = false;
                return;
            }
            tex.image = wsa.sequence[step].frame;
            t.reset();
        };
    }

    function condition(wsa) {
        return wsa.running;
    }

    rex = require("app/util/registerAndExecute")(animation, condition, "withSequenceAnimation", "textured");

    return function () {
        world.forEachEntityWithComponents("withSequenceAnimation", "textured")(rex);
    };
});
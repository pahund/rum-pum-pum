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
        getTimestamp = require("app/util/getTimestamp"),
        rex;

    function animation(wsa) {
        var timestamp = getTimestamp(),
            step = 0;

        wsa.running = true;
        wsa.currentFrame = wsa.sequence[step].frame;
        return function () {
            if (getTimestamp() < timestamp + wsa.sequence[step].interval) {
                return;
            }
            step++;
            if (step === wsa.sequence.length) {
                wsa.running = false;
                return;
            }
            wsa.currentFrame = wsa.sequence[step].frame;
            timestamp = getTimestamp();
        };
    }

    function condition(wsa) {
        return wsa.running;
    }

    rex = require("app/util/registerAndExecute")(animation, condition, "withSequenceAnimation");

    return function () {
        world.forEachEntityWithComponents("withSequenceAnimation")(rex);
    };
});
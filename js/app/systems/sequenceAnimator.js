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

    function animation(wsa, tex) {
        var timestamp = getTimestamp();

        wsa.running = true;
        tex.image = wsa.sequence[wsa.currentFrame].frame;
        return function () {
            if (getTimestamp() < timestamp + wsa.sequence[wsa.currentFrame].interval) {
                return;
            }
            wsa.currentFrame++;
            if (wsa.currentFrame === wsa.sequence.length) {
                wsa.currentFrame = 0;
                wsa.running = false;
                return;
            }
            tex.image = wsa.sequence[wsa.currentFrame].frame;
            timestamp = getTimestamp();
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
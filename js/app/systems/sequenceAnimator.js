/**
 * sequenceAnimator.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16/12/14
 */
define(function (require) {
    "use strict";

    var world = require("app/game/world"),
        getTimestamp = require("app/util/getTimestamp"),
        withSequenceAnimation = require("app/components/withSequenceAnimation"),
        rex;

    function animation(entityId, wsa) {
        var timestamp = getTimestamp(),
            step = 0;
        world.setComponent(entityId, withSequenceAnimation({
            currentFrame: wsa.sequence[step].frame,
            sequence: wsa.sequence,
            running: true
        }));
        return function () {
            if (getTimestamp() < timestamp + wsa.sequence[step].interval) {
                return;
            }
            step++;
            if (step === wsa.sequence.length) {
                world.setComponent(entityId, withSequenceAnimation({
                    currentFrame: wsa.currentFrame,
                    sequence: wsa.sequence,
                    running: false
                }));
                return;
            }
            world.setComponent(entityId, withSequenceAnimation({
                currentFrame: wsa.sequence[step].frame,
                sequence: wsa.sequence,
                running: true
            }));
            timestamp = getTimestamp();
        };
    }

    function condition(entityId, wsa) {
        return wsa.running;
    }

    rex = require("app/util/registerAndExecute")(animation, condition, "withSequenceAnimation");

    return function () {
        world.forEachEntityWithComponents("withSequenceAnimation")(rex);
    };
});
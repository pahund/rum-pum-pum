/**
 * frameAnimator.js
 *
 * A system that animates entities that have the animated and textured component by cycling through the frames of their
 * textures in regular intervals.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 14/12/14
 */
define(function (require) {
    "use strict";

    var world = require("app/game/world"),
        animated = require("app/components/animated"),
        getTimestamp = require("app/util/getTimestamp"),
        rex;

    function animation(entityId, animatedc) {
        var timestamp = getTimestamp(),
            currentFrame = animatedc.currentFrame;
        return function () {
            if (getTimestamp() > timestamp + animatedc.interval) {
                currentFrame++;
                if (currentFrame >= animatedc.numberOfFrames) {
                    currentFrame = 0;
                }
                world.setComponent(entityId, animated({
                    numberOfFrames: animatedc.numberOfFrames,
                    currentFrame: currentFrame,
                    interval: animatedc.interval
                }));
                timestamp = getTimestamp();
            }
        };
    }

    rex = require("app/util/registerAndExecute")(animation, "animated");

    return function () {
        world.forEachEntityWithComponents("animated")(rex);
    };
});

/**
 * frameAnimator.js
 *
 * Animates entities that have the animated and textured component by cycling through the frames of their textures
 * in regular intervals.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 14/12/14
 */
define(function (require) {
    "use strict";

    var world = require("app/game/world"),
        animated = require("app/components/animated"),
        getTimestamp = require("app/util/getTimestamp"),
        animations = {};

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

    return function () {
        world.forEachEntityWithComponents("animated")(function (id, comp) {
            var a = animations[id];
            if (a === undefined) {
                a = animation(id, comp.animated);
                animations[id] = a;
            }
            a();
        });
    };
});

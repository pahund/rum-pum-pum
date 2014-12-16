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

    var $ = require("jquery"),
        world = require("app/game/world"),
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
        $.each(world.getEntitiesByComponents("animated"), function () {
            var a = animations[this.id];
            if (a === undefined) {
                a = animation(this.id, this.components.animated);
                animations[this.id] = a;
            }
            a();
        });
    };
});

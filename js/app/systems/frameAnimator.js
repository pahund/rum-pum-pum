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
        getTimestamp = require("app/util/getTimestamp"),
        rex;

    function animation(animatedc) {
        var timestamp = getTimestamp();
        return function () {
            if (getTimestamp() > timestamp + animatedc.interval) {
                animatedc.currentFrame++;
                if (animatedc.currentFrame >= animatedc.numberOfFrames) {
                    animatedc.currentFrame = 0;
                }
                timestamp = getTimestamp();
            }
        };
    }

    rex = require("app/util/registerAndExecute")(animation, "animated");

    return function () {
        world.forEachEntityWithComponents("animated")(rex);
    };
});

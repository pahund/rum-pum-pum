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

    function animation(animatedc, texturedc) {
        var timestamp = getTimestamp();
        return function () {
            if (getTimestamp() > timestamp + animatedc.interval) {
                animatedc.currentFrame++;
                if (animatedc.currentFrame === animatedc.frames.length) {
                    animatedc.currentFrame = 0;
                }
                texturedc.image = animatedc.frames[animatedc.currentFrame];
                timestamp = getTimestamp();
            }
        };
    }

    rex = require("app/util/registerAndExecute")(animation, "animated", "textured");

    return function () {
        world.forEachEntityWithComponents("animated", "textured")(rex);
    };
});

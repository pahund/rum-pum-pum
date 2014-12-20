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
        timer = require("app/util/timer"),
        rex;

    function animation(animatedc, texturedc) {
        var t = timer(),
            step = 0;
        texturedc.image = animatedc.frames[step];
        return function () {
            if (t.duration() > animatedc.interval) {
                step++;
                if (step === animatedc.frames.length) {
                    step = 0;
                }
                texturedc.image = animatedc.frames[step];
                t.reset();
            }
        };
    }

    rex = require("app/util/registerAndExecute")(animation, "animated", "textured");

    return function () {
        world.forEachEntityWithComponents("animated", "textured")(rex);
    };
});

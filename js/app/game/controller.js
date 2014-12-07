/**
 * controller.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 05/12/14
 */
define(function (require) {
    "use strict";

    var bird = require("app/game/bird"),
        bear = require("app/game/bear"),
        loop = require("app/game/loop"),
        drums;

    return {
        set: {
            drums: function (newDrums) {
                drums = newDrums;
            }
        },
        run: function () {
            bird.init();
            loop.add("bird.fly", bird.fly);

            bear.init();
            bear.set.bird(bird),
            bear.set.sound(drums.kick);
            loop.add("bear.kick", bear.kick);
        }
    };
});
/**
 * soundPlayer.js
 *
 * A system that plays sounds for entities with the playing component.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 16/12/14
 */
define(function (require) {
    "use strict";

    var world = require("../game/world"),
        player = require("../audio/player");

    return function () {
        world.forEachEntityWithComponents("playing")(function (id, components) {
            var pc = components.playing;
            if (!pc.triggered) {
                return;
            }
            player.play(pc.sound);
            pc.triggered = false;
        });
    };
});

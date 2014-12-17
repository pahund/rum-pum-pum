/**
 * soundPlayer.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16/12/14
 */
define(function (require) {
    "use strict";

    var world = require("app/game/world"),
        playing = require("app/components/playing"),
        player = require("app/audio/player");

    return function () {
        world.forEachEntityWithComponents("playing")(function (id, comp) {
            var pc = comp.playing;
            if (!pc.triggered) {
                return;
            }
            player.play(pc.sound);
            world.setComponent(id, playing({
                sound: pc.sound
            }));
        });
    };
});
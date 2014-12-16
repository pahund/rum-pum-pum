/**
 * soundPlayer.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery"),
        world = require("app/game/world"),
        playing = require("app/components/playing"),
        player = require("app/audio/player");

    return function () {
        $.each(world.getEntitiesByComponent("playing"), function () {
            var pc = this.components.playing;
            if (!pc.triggered) {
                return;
            }
            player.play(pc.sound);
            world.setComponent(this.id, playing({
                sound: pc.sound
            }));
        });
    };
});
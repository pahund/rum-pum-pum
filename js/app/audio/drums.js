/**
 * drums.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 04/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery"),
        player = require("app/audio/player"),
        kick;

    function playFactory(name) {
        return function () {
            player.play(name);
        };
    }

    kick = playFactory("kick");

    return {
        get: {
            player: function () {
                return player;
            }
        },
        init: function () {
            $(".drum").each(function () {
                var $button = $(this),
                    name = $button.data("name"),
                    file = "sounds/" + name + ".ogg";
                player.load(name, file);
                $button.on("click", playFactory(name));
            });
        },

        kick: kick
    };
});
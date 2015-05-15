/**
 * drums.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 04/12/14
 */
define(function (require) {
    "use strict";

    let $ = require("jquery"),
        player = require("./player"),
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
                let $button = $(this),
                    name = $button.data("name"),
                    file = "sounds/" + name + ".ogg";
                player.load(name, file);
                $button.on("mousedown", playFactory(name));
            });
        },

        kick: kick
    };
});

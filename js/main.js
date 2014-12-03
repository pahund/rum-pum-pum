/**
 * main.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 22/10/14
 */

"use strict";

/* global require */
require.config({
    baseUrl: "js/lib",
    paths: {
        app: "../app"
    }
});

require([
    "jquery",
    "app/player",
    "app/Context"
], function ($, player) {

    function playFactory(name) {
        return function () {
            console.log("[PH_LOG] name: ", name); // PH_TODO: REMOVE
            player.play(name);
        };
    }

    $(".drum").each(function () {
        var $button = $(this),
            name = $button.data("name"),
            file = "sounds/" + name + ".ogg";
        player.load(name, file);
        $button.on("click", playFactory(name));
    });
});



/**
 * stage.js
 *
 * Initialization logic for the Pixi stage. Creates and returns the stage as a singleton.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 04/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery"),
        PIXI = require("pixi.dev"),
        grid = require("app/game/grid"),
        config = require("app/config"),
        stage = new PIXI.Stage(0xFFFFFF, true);

    function interact(data) {
        var column = grid.get.column(data.global.x);
        if (config.debug) {
            $("#monitor").html("col: " + column);
        }
    }

    stage.mousedown = interact;
    stage.touchstart = interact;

    return stage;
});
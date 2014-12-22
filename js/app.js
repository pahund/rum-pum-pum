/**
 * app.js
 *
 * Starting point of the application, does all the initialization and starts the game loop.
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

define(function (require) {

    var $ = require("jquery"),
        config = require("app/config"),
        drums = require("app/audio/drums"),
        PIXI = require("pixi.dev"),
        renderer = require("app/game/renderer"),
        loop = require("app/game/loop"),
        world = require("app/game/world"),
        gridCalculator = require("app/util/gridCalculator"),
        spriteManager = require("app/systems/spriteManager"),
        bear = require("app/entities/bear"),
        bird = require("app/entities/bird"),
        loader = new PIXI.AssetLoader(["images/sprites.json"]);

    $("body").append(renderer.view);

    // use callback
    loader.onComplete = function () {

        var grid = gridCalculator({
            rows: 8,
            columns: 1,
            top: 10,
            left: 10,
            width: 80,
            height: 90
        });
        grid.set.columns(16);

        world.addEntity("bird1", bird());
        for (var i = 1; i <= 16; i ++) {
            world.addEntity("bear" + i, bear(grid.get.x(i)));
        }

        spriteManager.init(world);

        loop.add(
            require("app/systems/frameAnimator"),
            require("app/systems/mover"),
            require("app/systems/proximityDetector"),
            require("app/systems/sequenceAnimator"),
            require("app/systems/soundPlayer"),
            spriteManager.update
        );
    };

    // begin loading
    loader.load();
    drums.init();

    if (config.debug) {
        $("#monitor").html("debug active").show();
    }

});



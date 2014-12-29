/**
 * app.js
 *
 * Starting point of the application, does all the initialization and starts the game loop.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
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
        monkey = require("app/entities/monkey"),
        loader = new PIXI.AssetLoader(["images/sprites.json"]);

    $("body").append(renderer.view);

    // use callback
    loader.onComplete = function () {

        var grid = gridCalculator({
            rows: 8,
            columns: 17,
            height: 95
        });

        world.addEntity("bird", bird({
            x: grid.get.x(1),
            y: grid.get.y(1),
            minX: grid.get.x(1),
            maxX: grid.get.x(17)
        }));
        $.each([5, 13, 15, 16], function (i, x) {
            world.addEntity("monkey" + i, monkey({
                x: grid.get.x(x),
                y: grid.get.y(7)
            }));
        });
        $.each([1, 4, 11], function (i, x) {
            world.addEntity("bear" + i, bear({
                x: grid.get.x(x),
                y: grid.get.y(8)
            }));
        });

        spriteManager.init(world);

        loop.add(
            require("app/systems/frameAnimator"),
            require("app/systems/mover"),
            require("app/systems/proximityDetector"),
            require("app/systems/sequenceAnimator"),
            require("app/systems/soundPlayer"),
            spriteManager.update
        );

        function start() {
            $("#play").html("Stop").one("click", stop);
            loop.start();
        }

        function stop() {
            $("#play").html("Start").one("click", start);
            loop.stop();
        }
        $("#play").one("click", start);

    };

    // begin loading
    loader.load();
    drums.init();

    if (config.debug) {
        $("#monitor").html("debug active").show();
    }

});



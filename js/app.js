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
        player = require("app/audio/player"),
        PIXI = require("pixi.dev"),
        renderer = require("app/game/renderer"),
        stage = require("app/game/stage"),
        grid = require("app/game/grid"),
        loop = require("app/game/loop"),
        world = require("app/game/world"),
        background = require("app/game/background"),
        spriteManager = require("app/systems/spriteManager"),
        bear = require("app/entities/bear"),
        bird = require("app/entities/bird"),
        monkey = require("app/entities/monkey"),
        kangaroo = require("app/entities/kangaroo"),
        loader = new PIXI.AssetLoader(["images/sprites.json"]);

    function start() {
        $("#play").html("Stop").one("click", stop);
        loop.start();
    }

    function stop() {
        $("#play").html("Start").one("click", start);
        loop.stop();
    }

    $("body").append(renderer.view);

    // use callback
    loader.onComplete = function () {

        stage.addChild(background);

        world.addEntity("bird", bird({
            x: grid.get.x(1, 0.5),
            y: grid.get.y(1, 0.5),
            minX: grid.get.x(1, 0.5),
            maxX: grid.get.x(17, 0.5)
        }));
        $.each([3, 7, 11, 15], function (i, col) {
            world.addEntity("kangaroo" + i, kangaroo({
                x: grid.get.x(col, 0.5),
                y: grid.get.y(2, 1)
            }));
            grid.toggle(2, col);
        });
        $.each([13], function (i, col) {
            world.addEntity("baby-kangaroo" + i, kangaroo({
                variant: 1,
                x: grid.get.x(col, 0.5),
                y: grid.get.y(2, 1)
            }));
            grid.toggle(2, col);
        });
        $.each([5, 13, 15, 16], function (i, col) {
            world.addEntity("monkey" + i, monkey({
                x: grid.get.x(col, 0.5),
                y: grid.get.y(3, 1)
            }));
            grid.toggle(3, col);
        });
        $.each([1, 4, 11], function (i, col) {
            world.addEntity("bear" + i, bear({
                x: grid.get.x(col, 0.5),
                y: grid.get.y(4, 1)
            }));
            grid.toggle(4, col);
        });

        spriteManager.init(world);
        loop.init();

        loop.add(
            require("app/systems/frameAnimator"),
            require("app/systems/mover"),
            require("app/systems/proximityDetector"),
            require("app/systems/sequenceAnimator"),
            require("app/systems/soundPlayer"),
            spriteManager.update
        );

        $("#play").one("click", start);
    };

    // begin loading
    loader.load();
    player.load(config.sounds);

    if (config.debug) {
        $("#monitor").html("debug active").show();
    }
});



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
        loop = require("app/game/loop"),
        world = require("app/game/world"),
        gridCalculator = require("app/util/gridCalculator"),
        spriteManager = require("app/systems/spriteManager"),
        bear = require("app/entities/bear"),
        bird = require("app/entities/bird"),
        monkey = require("app/entities/monkey"),
        kangaroo = require("app/entities/kangaroo"),
        loader = new PIXI.AssetLoader(["images/sprites.json"]);

    $("body").append(renderer.view);

    // use callback
    loader.onComplete = function () {

        var graphics = new PIXI.Graphics(),
            grid,
            row,
            col,
            x,
            y,
            w,
            h;

        grid = gridCalculator({
            rows: 4,
            columns: 17
        });

        for (row = 1; row <= 4; row++) {
            for (col = 1; col <= 16; col++) {
                w = Math.round(grid.get.w());
                h = Math.round(grid.get.h());
                x = Math.round(grid.get.x(col) - w / 2);
                y = Math.round(grid.get.y(row) - h / 2);
                x += 10;
                y += 10;
                w -= 20;
                h -= 20;

                graphics.beginFill(0xEEEEEE).drawRoundedRect(x, y, w, h, 15).endFill();
            }
        }
        stage.addChild(graphics);

        world.addEntity("bird", bird({
            x: grid.get.x(1),
            y: grid.get.y(1),
            minX: grid.get.x(1),
            maxX: grid.get.x(17)
        }));
        $.each([3, 7, 11, 15], function (i, x) {
            world.addEntity("kangaroo" + i, kangaroo({
                x: grid.get.x(x),
                y: grid.get.y(2)
            }));
        });
        $.each([13], function (i, x) {
            world.addEntity("baby-kangaroo" + i, kangaroo({
                variant: 1,
                x: grid.get.x(x),
                y: grid.get.y(2)
            }));
        });
        $.each([5, 13, 15, 16], function (i, x) {
            world.addEntity("monkey" + i, monkey({
                x: grid.get.x(x),
                y: grid.get.y(3)
            }));
        });
        $.each([1, 4, 11], function (i, x) {
            world.addEntity("bear" + i, bear({
                x: grid.get.x(x),
                y: grid.get.y(4)
            }));
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
    player.load([
        {
            id: "kick",
            path: "sounds/kick.ogg"
        },
        {
            id: "snare",
            path: "sounds/snare.ogg"
        },
        {
            id: "cuica-hi",
            path: "sounds/cuica-hi01.ogg"
        },
        {
            id: "cuica-lo",
            path: "sounds/cuica-lo01.ogg"
        }
    ]);

    if (config.debug) {
        $("#monitor").html("debug active").show();
    }

});



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
        drums = require("app/audio/drums"),
        PIXI = require("pixi.dev"),
        renderer = require("app/game/renderer"),
        loop = require("app/game/loop"),
        assets = [
            "images/flapping-bird.png",
            "images/kick-bear.png"
        ],
        world = require("app/game/world"),
        spriteManager = require("app/systems/spriteManager"),
        loader = new PIXI.AssetLoader(assets);

    $("body").append(renderer.view);

    // use callback
    loader.onComplete = function () {

        world.addEntity("bird1", require("app/entities/bird"));
        world.addEntity("bear1", require("app/entities/bear"));

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
});



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
        world = require("app/game/world"),
        spriteManager = require("app/systems/spriteManager"),
        bear = require("app/entities/bear"),
        bird = require("app/entities/bird"),
        loader = new PIXI.AssetLoader(["images/sprites.json"]);

    $("body").append(renderer.view);

    // use callback
    loader.onComplete = function () {

        world.addEntity("bird1", bird());
        world.addEntity("bear1", bear(100));
        world.addEntity("bear2", bear(400));
        world.addEntity("bear3", bear(700));
        world.addEntity("bear4", bear(1000));

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



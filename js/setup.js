/**
 * setup.js
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

    var drums = require("app/audio/drums"),
        PIXI = require("pixi.dev"),
        renderer = require("app/game/renderer"),
        controller = require("app/game/controller"),
        assets = [
            "images/flapping-bird.png",
            "images/kick-bear.png"
        ],
        loader;

    $("body").append(renderer.view);

    controller.set.drums(drums);

    loader = new PIXI.AssetLoader(assets);

    // use callback
    loader.onComplete = controller.run;

    //begin load
    loader.load();

    drums.init();

});



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
        assets = [
            "images/flapping-bird.png"
        ],
        loader;

    function onAssetsLoaded() {

        var bird = require("app/game/bird");

        bird.init();
    }

    loader = new PIXI.AssetLoader(assets);

    // use callback
    loader.onComplete = onAssetsLoaded;

    //begin load
    loader.load();

    drums.init();

});



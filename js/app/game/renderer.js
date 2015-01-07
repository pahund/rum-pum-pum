/**
 * renderer.js
 *
 * Initialization logic for the Pixi renderer. Creates and returns the renderer as a singleton.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 04/12/14
 */
define(function (require) {
    "use strict";

    var PIXI = require("app/util/pixi.dev.patched"),
        dimensions = require("app/game/dimensions"),
        renderer = PIXI.autoDetectRenderer(dimensions.viewport.w, dimensions.viewport.h);

    return renderer;
});
/**
 * renderer.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 04/12/14
 */
define(function (require) {
    "use strict";

    var PIXI = require("pixi.dev"),
        dimensions = require("app/game/dimensions"),
        renderer = PIXI.autoDetectRenderer(dimensions.viewport.w, dimensions.viewport.h);

    return renderer;
});
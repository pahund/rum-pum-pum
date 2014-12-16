/**
 * stage.js
 *
 * Initialization logic for the Pixi stage. Creates and returns the stage as a singleton.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 04/12/14
 */
define(function (require) {
    "use strict";

    var PIXI = require("pixi.dev"),
        stage = new PIXI.Stage(0xFFFFFF);

    return stage;
});
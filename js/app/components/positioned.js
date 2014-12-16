/**
 * positioned.js
 *
 * A component for entities that are positioned on the stage.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 11/12/14
 */
define(function (require) {
    "use strict";

    var id = "positioned",
        PIXI = require("pixi.dev");

    return function (input) {
        return {
            id: id,
            coordinates: input.coordinates === undefined ? new PIXI.Point(0, 0) : input.coordinates,
            scale: input.scale === undefined ? new PIXI.Point(1, 1) : input.scale
        };
    };
});
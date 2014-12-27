/**
 * positioned.js
 *
 * A component for entities that are positioned on the stage.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 11/12/14
 */
define(function (require) {
    "use strict";

    var PIXI = require("pixi.dev");

    return require("app/components/componentFactory")("positioned", [
        {
            name: "coordinates",
            fallback: new PIXI.Point(0, 0)
        },
        {
            name: "scale",
            fallback: new PIXI.Point(1, 1)
        }
    ]);
});
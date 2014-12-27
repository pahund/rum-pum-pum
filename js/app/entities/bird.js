/**
 * bird.js
 *
 * Blueprint for a flapping bird entity.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 15/12/14
 */
define(function (require) {
    "use strict";

    var PIXI = require("pixi.dev"),
        dimensions = require("app/game/dimensions"),
        textured = require("app/components/textured"),
        positioned = require("app/components/positioned"),
        moving = require("app/components/moving"),
        animated = require("app/components/animated"),
        proximityTrigger = require("app/components/proximityTrigger"),
        width = 395,
        height = 419,
        scale = 0.2;

    return function () {
        return [
            textured({
                image: "bird_wings-up.png"
            }),
            positioned({
                coordinates: new PIXI.Point(width * scale * -1, height * scale),
                scale: new PIXI.Point(scale, scale)
            }),
            moving({
                deltaX: 15,
                minX: 0,
                maxX: dimensions.viewport.w + width,
                interval: 5
            }),
            animated({
                frames: [
                    "bird_wings-up.png",
                    "bird_wings-middle.png",
                    "bird_wings-down.png"
                ],
                interval: 100
            }),
            proximityTrigger({
                horizontal: true
            })
        ];
    };
});
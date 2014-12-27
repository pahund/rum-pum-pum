/**
 * bird.js
 *
 * Blueprint for a flapping bird entity.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
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
        width = 79,
        height = 84,
        scale = 1;

    return function (input) {
        if (input === undefined) {
            input = {};
        }
        return [
            textured({
                image: "bird_wings-up.png"
            }),
            positioned({
                coordinates: new PIXI.Point(
                    input.x === undefined ? 0 : input.x,
                    input.y === undefined ? height * scale : input.y),
                scale: new PIXI.Point(scale, scale)
            }),
            moving({
                deltaX: 15,
                minX: input.minX === undefined ? 0 : input.minX,
                maxX: input.maxX === undefined ? dimensions.viewport.w + width : input.maxX,
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
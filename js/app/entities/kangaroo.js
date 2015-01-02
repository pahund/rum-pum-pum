/**
 * kangaroo.js
 *
 * Blueprint for barking kangaroo (low cuica).
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 03/01/15
 */
define(function (require) {
    "use strict";

    var PIXI = require("pixi.dev"),
        dimensions = require("app/game/dimensions"),
        textured = require("app/components/textured"),
        positioned = require("app/components/positioned"),
        proximityListener = require("app/components/proximityListener"),
        withSequenceAnimation = require("app/components/withSequenceAnimation"),
        playing = require("app/components/playing"),
        scale = 1;

    return function (input) {
        var sounds = [
            "cuica-lo01",
            "cuica-hi01"
        ];
        if (input === undefined) {
            input = {
                variant: 0
            };
        }
        if (input.variant === undefined) {
            input.variant = 0;
        }
        return [
            textured({
                image: "kangaroo_down.png"
            }),
            positioned({
                coordinates: new PIXI.Point(
                    input.x === undefined ? dimensions.viewport.w / 2 : input.x,
                    input.y === undefined ? dimensions.viewport.h / 2 : input.y),
                scale: new PIXI.Point(scale, scale)
            }),
            proximityListener({
                action: function (trigger, listener) {
                    listener.components.withSequenceAnimation.running = true;
                    listener.components.withSequenceAnimation.currentSequence =
                            input.variant;
                    listener.components.playing.triggered = true;
                }
            }),
            withSequenceAnimation({
                sequences: [
                    [
                        {
                            frame: "kangaroo_bark.png",
                            interval: 150
                        },
                        {
                            frame: "kangaroo_down.png",
                            interval: 0
                        }
                    ],
                    [
                        {
                            frame: "kangaroo_jump.png",
                            interval: 150
                        },
                        {
                            frame: "kangaroo_down.png",
                            interval: 0
                        }
                    ]
                ]
            }),
            playing({
                sound: sounds[input.variant]
            })
        ];
    };
});

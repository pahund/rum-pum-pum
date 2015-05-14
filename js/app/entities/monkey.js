/**
 * monkey.js
 *
 * Blueprint for a drumming monkey entity (snare drum).
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 27/12/14
 */
define(function (require) {
    "use strict";

    var PIXI = require("pixi"),
        dimensions = require("../game/dimensions"),
        textured = require("../components/textured"),
        positioned = require("../components/positioned"),
        proximityListener = require("../components/proximityListener"),
        withSequenceAnimation = require("../components/withSequenceAnimation"),
        playing = require("../components/playing"),
        scale = 1;

    return function (input) {
        if (input === undefined) {
            input = {};
        }
        return [
            textured({
                image: "monkey_sticks-up.png"
            }),
            positioned({
                coordinates: new PIXI.Point(
                    input.x === undefined ? dimensions.viewport.w / 2 : input.x,
                    input.y === undefined ? dimensions.viewport.h / 2 : input.y),
                scale: new PIXI.Point(scale, scale),
                anchor: new PIXI.Point(0.5, 1)
            }),
            proximityListener({
                action: function (trigger, listener) {
                    listener.components.withSequenceAnimation.running = true;
                    listener.components.withSequenceAnimation.currentSequence =
                            listener.components.withSequenceAnimation.currentSequence === 0 ? 1 : 0;
                    listener.components.playing.triggered = true;
                }
            }),
            withSequenceAnimation({
                sequences: [
                    [
                        {
                            frame: "monkey_left-down.png",
                            interval: 150
                        },
                        {
                            frame: "monkey_sticks-up.png",
                            interval: 0
                        }
                    ],
                    [
                        {
                            frame: "monkey_right-down.png",
                            interval: 150
                        },
                        {
                            frame: "monkey_sticks-up.png",
                            interval: 0
                        }
                    ]
                ]
            }),
            playing({
                sound: "snare"
            })
        ];
    };
});

/**
 * bear.js
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
        proximityListener = require("app/components/proximityListener"),
        withSequenceAnimation = require("app/components/withSequenceAnimation"),
        playing = require("app/components/playing"),
        width = 551,
        height = 760,
        scale = 0.2,
        blueprint;

    blueprint = [
        textured({
            image: "images/kick-bear.png",
            frame: new PIXI.Rectangle(0, 0, width, height),
            startFrame: 1
        }),
        positioned({
            coordinates: new PIXI.Point(dimensions.viewport.w / 2, dimensions.viewport.h - (height * scale)),
            scale: new PIXI.Point(scale, scale)
        }),
        proximityListener({
            action: function (trigger, listener) {
                var wsa = listener.components.withSequenceAnimation,
                    p = listener.components.playing;
                listener.components.withSequenceAnimation = withSequenceAnimation({
                    currentFrame: wsa.currentFrame,
                    sequence: wsa.sequence,
                    running: true
                });
                listener.components.playing = playing({
                    sound: p.sound,
                    triggered: true
                });
            }
        }),
        withSequenceAnimation({
            currentFrame: 1,
            sequence: [
                {
                    frame: 0,
                    interval: 150
                },
                {
                    frame: 1,
                    interval: 0
                }
            ]
        }),
        playing({
            sound: "kick"
        })
    ];

    return function (input) {
        if (input === undefined) {
            input = {};
        }
        if (typeof input === "number") {
            input = {
                x: input
            };
        }
        return [
            textured({
                image: "bear_beater-up.png"
            }),
            positioned({
                coordinates: new PIXI.Point(
                        input.x === undefined ? dimensions.viewport.w / 2 : input.x,
                        dimensions.viewport.h - (height * scale)),
                scale: new PIXI.Point(scale, scale)
            }),
            proximityListener({
                action: function (trigger, listener) {
                    listener.components.withSequenceAnimation.running = true;
                    listener.components.playing.triggered = true;
                }
            }),
            withSequenceAnimation({
                sequence: [
                    {
                        frame: "bear_beater-down.png",
                        interval: 150
                    },
                    {
                        frame: "bear_beater-up.png",
                        interval: 0
                    }
                ]
            }),
            playing({
                sound: "kick"
            })
        ];
    };
});

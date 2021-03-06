/**
 * monkey.js
 *
 * Blueprint for a drumming monkey entity (snare drum).
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 27 Dec 2014
 */
import PIXI from "pixi";
import dimensions from "../game/dimensions";
import textured from "../components/textured";
import positioned from "../components/positioned";
import proximityListener from "../components/proximityListener";
import withSequenceAnimation from "../components/withSequenceAnimation";
import playing from "../components/playing";

let scale = 1;

function monkey(input = {}) {
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
            action(trigger, listener) {
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
}

export default monkey;

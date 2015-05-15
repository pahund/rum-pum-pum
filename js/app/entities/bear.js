/**
 * bear.js
 *
 * Blueprint for a drumming bear entity (bass drum).
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 15/12/14
 */
import PIXI from "pixi";
import dimensions from "../game/dimensions";
import textured from "../components/textured";
import positioned from "../components/positioned";
import proximityListener from "../components/proximityListener";
import withSequenceAnimation from "../components/withSequenceAnimation";
import playing from "../components/playing";

let scale = 1;

function bear(input = {}) {
    return [
        textured({
            image: "bear_beater-up.png"
        }),
        positioned({
            coordinates: new PIXI.Point(
                    input.x === undefined ? dimensions.viewport.w / 2 : input.x,
                    input.y === undefined ? dimensions.viewport.h / 2 : input.y),
            scale: new PIXI.Point(scale, scale),
            anchor: new PIXI.Point(0.5, 1)
        }),
        proximityListener({
            action: (trigger, listener) => {
                listener.components.withSequenceAnimation.running = true;
                listener.components.playing.triggered = true;
            }
        }),
        withSequenceAnimation({
            sequences: [
                [
                    {
                        frame: "bear_beater-down.png",
                        interval: 150
                    },
                    {
                        frame: "bear_beater-up.png",
                        interval: 0
                    }
                ]
            ]
        }),
        playing({
            sound: "kick"
        })
    ];
}

export default bear;

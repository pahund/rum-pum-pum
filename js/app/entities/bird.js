/**
 * bird.js
 *
 * Blueprint for a flapping bird entity.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 15 Dec 2014
 */
import PIXI from "pixi";
import dimensions from "../game/dimensions";
import textured from "../components/textured";
import positioned from "../components/positioned";
import moving from "../components/moving";
import animated from "../components/animated";
import proximityTrigger from "../components/proximityTrigger";

const width = 79,
    height = 84;

let scale = 1;

function bird(input = {}) {
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
}

export default bird;

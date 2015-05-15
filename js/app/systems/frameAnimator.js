/**
 * frameAnimator.js
 *
 * A system that animates entities that have the animated and textured component by cycling through the frames of their
 * textures in regular intervals.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 14/12/14
 */
import world from "../game/world";
import timer from "../util/timer";
import registerAndExecute from "../util/registerAndExecute";

function animation(animatedc, texturedc) {
    let t = timer(),
        step = 0;
    texturedc.image = animatedc.frames[step];
    return () => {
        if (t.duration() <= animatedc.interval) {
            return;
        }
        step++;
        if (step === animatedc.frames.length) {
            step = 0;
        }
        texturedc.image = animatedc.frames[step];
        t.reset();
    };
}

const rex = registerAndExecute(animation, "animated", "textured");

export default () => {
    world.forEachEntityWithComponents("animated", "textured")(rex);
};

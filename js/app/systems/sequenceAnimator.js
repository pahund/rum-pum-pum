/**
 * sequenceAnimator.js
 *
 * A system that animates entities that have the withSequenceAnimation component by executing a sequence of steps,
 * where each step sets a frame on the entity's sprite texture and lasts a specific time interval.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 16 Dec 2014
 */
import world from "../game/world";
import timer from "../util/timer";
import registerAndExecute from "../util/registerAndExecute";

function animation(wsa, tex) {
    let t = timer(),
        step = 0;

    wsa.running = true;
    tex.image = wsa.sequences[wsa.currentSequence][step].frame;
    return () => {
        if (t.duration() < wsa.sequences[wsa.currentSequence][step].interval) {
            return;
        }
        step++;
        if (step === wsa.sequences[wsa.currentSequence].length) {
            step = 0;
            wsa.running = false;
            return;
        }
        tex.image = wsa.sequences[wsa.currentSequence][step].frame;
        t.reset();
    };
}

function condition(wsa) {
    return wsa.running;
}

const rex = registerAndExecute(animation, condition, "withSequenceAnimation", "textured");

export default () => world.forEachEntityWithComponents("withSequenceAnimation", "textured")(rex);

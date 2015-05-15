/**
 * mover.js
 *
 * A system that modifies the coordinates of entities that have the positioned and moving components in regular
 * intervals.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 14/12/14
 */
import world from "../game/world";
import getTimestamp from "../util/getTimestamp";
import registerAndExecute from "../util/registerAndExecute";

function calc(current, delta, min, max) {
    let val = current + delta;
    if (min === undefined || max === undefined) {
        return val;
    }
    if (val <= min) {
        val = max;
    } else if (val >= max) {
        val = min;
    }
    return val;
}

function motion(movingc, positionedc) {
    let timestamp = getTimestamp();
    return () => {
        if (getTimestamp() <= timestamp + movingc.interval) {
            return;
        }
        positionedc.coordinates.x = calc(positionedc.coordinates.x, movingc.deltaX, movingc.minX, movingc.maxX);
        positionedc.coordinates.y = calc(positionedc.coordinates.y, movingc.deltaY, movingc.minY, movingc.maxY);
        timestamp = getTimestamp();
    };
}

const rex = registerAndExecute(motion, "moving", "positioned");

export default () => world.forEachEntityWithComponents("moving", "positioned")(rex);

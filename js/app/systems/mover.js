/**
 * mover.js
 *
 * A system that modifies the coordinates of entities that have the positioned and moving components in regular
 * intervals.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 14/12/14
 */
define(function (require) {
    "use strict";

    console.log("[PH_LOG] instantiating mover"); // PH_TODO: REMOVE
    var world = require("../game/world"),
        getTimestamp = require("../util/getTimestamp"),
        rex;

    function calc(current, delta, min, max) {
        var val = current + delta;
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
        var timestamp = getTimestamp();
        return function () {
            if (getTimestamp() > timestamp + movingc.interval) {
                positionedc.coordinates.x = calc(positionedc.coordinates.x, movingc.deltaX, movingc.minX, movingc.maxX);
                positionedc.coordinates.y = calc(positionedc.coordinates.y, movingc.deltaY, movingc.minY, movingc.maxY);
                timestamp = getTimestamp();
            }
        };
    }

    rex = require("../util/registerAndExecute")(motion, "moving", "positioned");

    return function () {
        world.forEachEntityWithComponents("moving", "positioned")(rex);
    };
});

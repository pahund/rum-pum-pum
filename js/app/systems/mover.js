/**
 * mover.js
 *
 * A system that modifies the coordinates of entities that have the positioned and moving components in regular
 * intervals.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 14/12/14
 */
define(function (require) {
    "use strict";

    var PIXI = require("pixi.dev"),
        world = require("app/game/world"),
        positioned = require("app/components/positioned"),
        getTimestamp = require("app/util/getTimestamp"),
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

    function motion(entityId, movingc, positionedc) {
        var timestamp = getTimestamp(),
            x = positionedc.coordinates.x,
            y = positionedc.coordinates.y;
        return function () {
            if (getTimestamp() > timestamp + movingc.interval) {
                x = calc(x, movingc.deltaX, movingc.minX, movingc.maxX);
                y = calc(y, movingc.deltaY, movingc.minY, movingc.maxY);
                world.setComponent(entityId, positioned({
                    coordinates: new PIXI.Point(x, y)
                }));
                timestamp = getTimestamp();
            }
        };
    }

    rex = require("app/util/registerAndExecute")(motion, "moving", "positioned");

    return function () {
        world.forEachEntityWithComponents("moving", "positioned")(rex);
    };
});
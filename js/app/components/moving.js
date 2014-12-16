/**
 * moving.js
 *
 * A component for an entity that is moving.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 14/12/14
 */
define(function () {
    "use strict";

    return function (input) {
        return {
            id: "moving",
            deltaX: input.deltaX === undefined ? 0 : input.deltaX,
            deltaY: input.deltaY === undefined ? 0 : input.deltaY,
            minX: input.minX, // may be undefined
            maxX: input.maxX, // may be undefined
            minY: input.minY, // may be undefined
            maxY: input.maxY, // may be undefined
            interval: input.interval === undefined ? 0 : input.interval
        };
    };
});
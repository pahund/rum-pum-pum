/**
 * moving.js
 *
 * A component for an entity that is moving.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 14/12/14
 */
define(function (require) {
    "use strict";

    return require("app/components/componentFactory")("moving", [
        {
            name: "deltaX",
            fallback: 0
        },
        {
            name: "deltaY",
            fallback: 0
        },
        {
            name: "minX"
            // no fallback, may be undefined
        },
        {
            name: "maxX"
            // no fallback, may be undefined
        },
        {
            name: "minY"
            // no fallback, may be undefined
        },
        {
            name: "maxY"
            // no fallback, may be undefined
        },
        {
            name: "interval",
            fallback: 0
        }
    ]);
});
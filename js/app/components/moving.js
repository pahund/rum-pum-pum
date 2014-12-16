/**
 * moving.js
 *
 * A component for an entity that is moving.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
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
        },
        {
            name: "maxX"
        },
        {
            name: "minY"
        },
        {
            name: "maxY"
        },
        {
            name: "interval",
            fallback: 0
        }
    ]);
});
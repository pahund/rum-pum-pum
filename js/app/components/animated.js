/**
 * animated.js
 *
 * A component for an entity that is animated, i.e. its texture is cycled at a regular interval.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 14/12/14
 */
define(function (require) {
    "use strict";

    return require("./componentFactory")("animated", [
        {
            name: "frames",
            mandatory: true
        },
        {
            name: "interval",
            fallback: 0
        }
    ]);
});

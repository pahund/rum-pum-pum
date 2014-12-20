/**
 * animated.js
 *
 * A component for an entity that is animated, i.e. its texture is cycled at a regular interval.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 14/12/14
 */
define(function (require) {
    "use strict";

    return require("app/components/componentFactory")("animated", [
        {
            name: "frames",
            mandatory: true
        },
        {
            name: "currentFrame",
            fallback: 0
        },
        {
            name: "interval",
            fallback: 0
        }
    ]);
});
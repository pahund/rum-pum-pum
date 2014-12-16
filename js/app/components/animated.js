/**
 * animated.js
 *
 * A component for an entity that is animated, i.e. the frames in its texture are cycled at a regular interval.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 14/12/14
 */
define(function (require) {
    "use strict";

    return require("app/components/componentFactory")("animated", [
        {
            name: "numberOfFrames",
            fallback: 1
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
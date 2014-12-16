/**
 * animated.js
 *
 * A component for an entity that is animated, i.e. the frames in its texture are cycled at a regular interval.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 14/12/14
 */
define(function () {
    "use strict";

    var id = "animated";

    return function (input) {
        return {
            id: id,
            numberOfFrames: input.numberOfFrames === undefined ? 1 : input.numberOfFrames,
            currentFrame: input.currentFrame === undefined ? 0 : input.currentFrame,
            interval: input.interval === undefined ? 0 : input.interval
        };
    };
});
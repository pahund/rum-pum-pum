/**
 * withSequenceAnimation.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16/12/14
 */
define(function () {
    "use strict";

    return function (input) {
        return {
            id: "withSequenceAnimation",
            sequence: input.sequence === undefined ? [] : input.sequence,
            currentFrame: input.currentFrame === undefined ? 0 : input.currentFrame,
            running: input.running === undefined ? false : input.running
        };
    };
});
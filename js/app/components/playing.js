/**
 * playing.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16/12/14
 */
define(function () {
    "use strict";

    return function (input) {
        if (input.sound === undefined) {
            throw "Error: attempted to create playing component without mandatory setting sound";
        }
        return {
            id: "playing",
            sound: input.sound,
            triggered: input.triggered === undefined ? false : input.triggered
        };
    };
});
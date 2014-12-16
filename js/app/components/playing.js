/**
 * playing.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16/12/14
 */
define(function (require) {
    "use strict";

    var id = "playing",
        validateComponent = require("app/util/validateComponent");

    return function (input) {

        validateComponent(id, input, "sound");

        return {
            id: id,
            sound: input.sound,
            triggered: input.triggered === undefined ? false : input.triggered
        };
    };
});
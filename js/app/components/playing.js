/**
 * playing.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16/12/14
 */
define(function (require) {
    "use strict";

    return require("app/components/componentFactory")("playing", [
        {
            name: "sound",
            mandatory: true
        },
        {
            name: "triggered",
            fallback: false
        }
    ]);
});
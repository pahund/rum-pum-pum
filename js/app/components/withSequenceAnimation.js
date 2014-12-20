/**
 * withSequenceAnimation.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16/12/14
 */
define(function (require) {
    "use strict";

    return require("app/components/componentFactory")("withSequenceAnimation", [
        {
            name: "sequence",
            mandatory: true
        },
        {
            name: "running",
            fallback: false
        }
    ]);
});
/**
 * proximityListener.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 15/12/14
 */
define(function (require) {
    "use strict";

    return require("app/components/componentFactory")("proximityListener", [
        {
            name: "action",
            fallback: function () {}
        }
    ]);
});
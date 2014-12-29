/**
 * proximityTrigger.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 15/12/14
 */
define(function (require) {
    "use strict";

    return require("app/components/componentFactory")("proximityTrigger", [
        {
            name: "vertical",
            fallback: false
        },
        {
            name: "horizontal",
            fallback: false
        },
        {
            name: "threshold",
            fallback: 100
        }
    ]);
});
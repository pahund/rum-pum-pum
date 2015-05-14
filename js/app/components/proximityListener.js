/**
 * proximityListener.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 15/12/14
 */
define(function (require) {
    "use strict";

    return require("./componentFactory")("proximityListener", [
        {
            name: "action",
            fallback: function () {}
        }
    ]);
});

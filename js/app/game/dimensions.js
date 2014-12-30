/**
 * dimensions.js
 *
 * Data object for various dimensions used for calculating sizes and positions.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 04/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery");

    return {
        viewport: {
            w: $(window).width(),
            h: $(window).height()
        }
    };
});
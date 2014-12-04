/**
 * dimensions.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
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
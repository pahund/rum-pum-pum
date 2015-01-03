/**
 * config.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 21/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery");

    return {
        debug: $("#config").data("debug") || false,
        rows: 4,
        columns: 17
    };
});
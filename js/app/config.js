/**
 * config.js
 *
 * Main configuration options.
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
        columns: 17,
        sounds: [
            {
                id: "kick",
                path: "sounds/kick.ogg"
            },
            {
                id: "snare",
                path: "sounds/snare.ogg"
            },
            {
                id: "cuica-hi",
                path: "sounds/cuica-hi01.ogg"
            },
            {
                id: "cuica-lo",
                path: "sounds/cuica-lo01.ogg"
            }
        ]
    };
});
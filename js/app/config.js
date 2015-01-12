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
        columns: 16,
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
        ],
        rowForAnimal: {
            "bird": 1,
            "kangaroo": 2,
            "baby-kangaroo": 2,
            "monkey": 3,
            "bear": 4
        },
        animalForRow: {
            1: "bird",
            2: "kangaroo",
            3: "monkey",
            4: "bear"
        },
        maxRegistryItems: 15
    };
});

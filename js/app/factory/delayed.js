/**
 * delayed.js
 *
 * Factory function that creates functions that execute one or more functions after a time interval has passed.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 05/12/14
 */
define(function (require) {
    "use strict";

    var executor = require("app/factory/executor");

    function getTimestamp() {
        return new Date().getTime();
    }

    return function delayed(f, ms) {
        var exec = executor(f),
            startTime = getTimestamp();
        if (ms === undefined) {
            ms = 1000; // default interval 1 sec
        }
        return function () {
            var currentTime = getTimestamp();
            if (currentTime > startTime + ms) {
                exec.apply(null, arguments);
            }
        };
    };
});
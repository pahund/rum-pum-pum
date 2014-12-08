/**
 * interval
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03/12/14
 */

define(function (require) {
    "use strict";

    var executor = require("app/factory/executor");

    function getTimestamp() {
        return new Date().getTime();
    }

    return function interval(f, ms) {
        var exec = executor(f),
            startTime = getTimestamp();
        if (ms === undefined) {
            ms = 1000; // default interval 1 sec
        }
        return function () {
            var currentTime = getTimestamp();
            if (currentTime > startTime + ms) {
                exec.apply(null, arguments);
                startTime = getTimestamp();
            }
        };
    };
});

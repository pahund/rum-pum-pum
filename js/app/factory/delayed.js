/**
 * delayed.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 05/12/14
 */
define(function () {
    "use strict";

    return function delayed(func, ms) {
        var flag = true,
            startTime;
        function getTimestamp() {
            return new Date().getTime();
        }
        if (typeof func !== "function") {
            throw "Error: delayed factory expects function to be executed as first argument";
        }
        if (ms === undefined) {
            ms = 1000; // default interval 1 sec
        }
        startTime = getTimestamp();
        return function () {
            var currentTime = getTimestamp();
            if (flag && currentTime > startTime + ms) {
                func();
                flag = false;
            }
        };
    };
});
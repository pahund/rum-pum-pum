/**
 * intervalExecutor
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03/12/14
 */

define(function () {
    "use strict";

    return function intervalExecutor(func, interval) {
        var startTime;
        function getTimestamp() {
            return new Date().getTime();
        }
        if (typeof func !== "function") {
            throw "Error: intervalExecutorFacotry expects function to be executed as first argument";
        }
        if (interval === undefined) {
            interval = 1000; // default interval 1 sec
        }
        startTime = getTimestamp();
        return function () {
            var currentTime = getTimestamp();
            if (currentTime > startTime + interval) {
                func();
                startTime = getTimestamp();
            }
        };
    };
});

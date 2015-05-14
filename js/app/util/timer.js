/**
 * timer.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 20/12/14
 */
define(function (require) {
    "use strict";

    var getTimestamp = require("../util/getTimestamp");

    return function () {
        var time = getTimestamp(),
            startTime = time,
            calls = 0;

        return {
            interval: function () {
                var t = getTimestamp(),
                    ms = t - time;
                time = t;
                return ms;
            },
            duration: function () {
                return getTimestamp() - startTime;
            },
            reset: function () {
                time = getTimestamp();
                startTime = time;
            },
            average: function () {
                return Math.round((getTimestamp() - startTime) * 10 / ++calls) / 10;
            }
        };
    };

});

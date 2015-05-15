/**
 * timer.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 20/12/14
 */
define(function (require) {
    "use strict";

    let getTimestamp = require("../util/getTimestamp");

    return function () {
        let time = getTimestamp(),
            startTime = time,
            calls = 0;

        return {
            interval: function () {
                let t = getTimestamp(),
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

/**
 * timer.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 20/12/14
 */
define(function (require) {
    "use strict";

    var getTimestamp = require("app/util/getTimestamp");

    return function () {
        var time = getTimestamp(),
            startTime = time;

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
            }
        };
    };

});
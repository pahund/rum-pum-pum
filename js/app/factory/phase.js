/**
 * phase
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03/12/14
 */

define(function (require) {
    "use strict";

    var executor = require("app/factory/executor");

    return function phase(f, numberOfPhases) {
        var exec = executor(f),
            p = 0;
        if (typeof numberOfPhases !== "number") {
            throw "Error: phase factory expects number of phases as second argument";
        }
        return function () {
            var slice = Array.prototype.slice,
                args = [p].concat(slice.apply(arguments));
            exec.apply(null, args);
            if (++p === numberOfPhases) {
                p = 0;
            }
        };
    };
});

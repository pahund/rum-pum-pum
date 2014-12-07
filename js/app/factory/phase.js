/**
 * phase
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03/12/14
 */

define(function () {
    "use strict";

    return function phase(func, numberOfPhases) {
        var p = 0;
        if (typeof func !== "function") {
            throw "Error: phase factory expects function to be executed as first argument";
        }
        if (typeof numberOfPhases !== "number") {
            throw "Error: phase factory expects number of phases as second argument";
        }
        return function () {
            func(p);
            if (++p === numberOfPhases) {
                p = 0;
            }
        };
    };
});

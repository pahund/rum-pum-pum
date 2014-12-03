/**
 * phasedExecutor
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03/12/14
 */

define([], function () {
    "use strict";

    return function phasedExecutor(func, numberOfPhases) {
        var phase = 0;
        if (typeof func !== "function") {
            throw "Error: phasedExecutorFactory expects function to be executed as first argument";
        }
        if (typeof numberOfPhases !== "number") {
            throw "Error: phasedExecutorFactory expects number of phases as second argument";
        }
        return function () {
            func(phase);
            if (++phase === numberOfPhases) {
                phase = 0;
            }
        };
    };
});

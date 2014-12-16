/**
 * flip.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 07/12/14
 */
define(function (require) {
    "use strict";

    var executor = require("app/factory/executor");

    return function flip(f1, f2, predf) {
        var exec1 = executor(f1),
            exec2 = executor(f2),
            state = true;
        return function () {
            if (predf.apply(null, arguments)) {
                state = !state;
            }
            if (state) {
                exec1.apply(null, arguments);
            } else {
                exec2.apply(null, arguments);
            }
        };
    };
});
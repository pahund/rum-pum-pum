/**
 * conditional.js
 *
 * Factory that creates functions that execute one or more functions if a predicate function returns true.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 05/12/14
 */
define(function (require) {
    "use strict";

    var executor = require("app/factory/executor");

    return function conditional(f, predf) {
        var exec = executor(f);
        return function () {
            if (predf.apply(null, arguments)) {
                exec.apply(null, arguments);
            }
        };
    };
});
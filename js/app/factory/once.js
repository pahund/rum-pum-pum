/**
 * once.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 05/12/14
 */
define(function (require) {
    "use strict";

    var executor = require("app/factory/executor");

    return function once(f) {
        var exec = executor(f),
            flag = true;
        return function () {
            if (flag) {
                exec.apply(null, arguments);
            }
            flag = false;
        };
    };
});
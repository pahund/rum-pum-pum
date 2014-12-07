/**
 * once.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 05/12/14
 */
define(function () {
    "use strict";

    return function once(func) {
        var flag = true;
        return function () {
            if (flag) {
                func();
            }
            flag = false;
        };
    };
});
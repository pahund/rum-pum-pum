/**
 * conditional.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 05/12/14
 */
define(function () {
    "use strict";

    return function conditional(func, predf) {
        return function () {
            if (predf()) {
                func();
            }
        };
    };
});
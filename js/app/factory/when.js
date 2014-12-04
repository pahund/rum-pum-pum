/**
 * when
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03/12/14
 */

define([], function () {
    "use strict";

    return function when() {
        var args = arguments;
        return function(predf, func) {
            if (predf.apply(null, args)) {
                func.apply(null, args);
            }
        };
    };
});
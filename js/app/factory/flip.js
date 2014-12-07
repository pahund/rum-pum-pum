/**
 * flip.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 07/12/14
 */
define(function () {
    "use strict";

    return function flip(func1, func2, predf) {
        var state = true;
        return function () {
            if (state) {
                if (predf()) {
                    func1();
                    state = !state;
                }
            } else {
                if (!predf()) {
                    func2();
                    state = !state;
                }
            }
        };
    };
});
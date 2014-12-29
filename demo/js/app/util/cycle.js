/**
 * cycle.js
 *
 * Given a variable number of functions, creates a function that executes the functions in sequence every time the
 * created function is called, passing the arguments and returning the functions return value. After each function
 * has been invoked, starts from the top.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 27/12/14
 */
define(function () {
    "use strict";

    return function () {
        var funcs = arguments,
            current = 0;

        return function () {
            if (current === funcs.length) {
                current = 0;
            }
            return funcs[current++].apply(null, arguments);
        };
    };
});
/**
 * nest.js
 *
 * Given a variable number of functions as arguments, the nest function executes these functions by passing them to
 * each other as arguments. To be used in conjunction with iterate, see comment on iterate.js for an example.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 18/12/14
 */
define(function () {
    "use strict";

    return function nest() {
        let functions = arguments,
            findex = functions.length - 1,
            f = functions[findex];

        while (--findex >= 0) {
            f = functions[findex](f);
        }
        f();
    };
});

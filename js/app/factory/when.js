/**
 * when
 *
 * A factory function that creates a function for executing another function if a predicate returns true.
 *
 * There are two ways to use it:
 *
 * (a) pass a predicate function and 0-n additional arguments to when(), you get a function that takes a
 *     callback function; the callback function is executed with the additional arguments if the predicate
 *     returns true for the additional arguments
 * (b) pass 0-n arguments to when(), you get a function that takes a predicate function and a callback function;
 *     the callback function is executed with the arguments passed to when() if the predicate returns true
 *     for the arguments passed to when()
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03/12/14
 */

define(function () {
    "use strict";

    return function when() {
        var slice = Array.prototype.slice,
            args = slice.apply(arguments),
            firstArg = args.slice(0, 1),
            otherArgs = args.slice(1);

        if (typeof firstArg === "function") {
            return function (func) {
                if (firstArg.apply(null, otherArgs)) {
                    return func.apply(null, otherArgs);
                }
            };
        }

        return function(predf, func) {
            if (predf.apply(null, args)) {
                return func.apply(null, args);
            }
        };
    };
});
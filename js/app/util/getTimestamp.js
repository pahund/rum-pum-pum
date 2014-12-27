/**
 * getTimestamp.js
 *
 * A function that creates a time stamp.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 15/12/14
 */
define(function () {
    "use strict";

    return function () {
        return new Date().getTime();
    };
});
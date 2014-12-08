/**
 * executor.js
 *
 * Factory for functions that execute one or more functions.
 *
 * Factory gets a function or an array of functions as input and returns a function.
 *
 * The function returned gets arbitrary number of arguments and executes each of the functions passed to the factory,
 * passing the arguments to each function call.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 07/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery");

    function verify() {
        /* jshint validthis:true */
        if (typeof this !== "function") {
            throw "Error initializing executor: argument is not a function";
        }
    }

    function isArray(input) {
        return Object.prototype.toString.call(input) === "[object Array]";
    }

    return function executor(input) {
        var tasks = isArray(input) ? input : [ input ];
        $.each(tasks, verify);
        return function () {
            var args = arguments;
            $.each(tasks, function () {
                /* jshint validthis:true */
                this.apply(null, args);
            });
        };
    };
});
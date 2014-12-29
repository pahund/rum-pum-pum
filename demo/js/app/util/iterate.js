/**
 * iterate.js
 *
 * A function that returns a function that returns a function that returns a function... Argh! Stop it! My head hurts.
 *
 * Seriously, this one is for iterating lists that can be passed as variable number of arguments or as array (or even
 * both), it creates a function that accepts a callback. This function creates a function that iterates the items
 * and invokes the callback, passing the current item as arguments to the callback. This is handy for using in
 * conjunction with the nest function, like this:
 *
 * var fruits = iterate("apples", "oranges"),
 *     vegs = iterate("carrots", "broccoli");
 *
 * function fav(fruit, veg) {
 *     console.log("My favorite fruit is: " + fruit);
 *     console.log("My favorite vegetable is: " + veg);
 * }
 *
 * nest(fruits, vegs, fav);
 *
 * This will output the following:
 *
 * "My favorite fruit is: apples"
 * "My favorite vegetable is: carrots"
 * "My favorite fruit is: apples"
 * "My favorite vegetable is: broccoli"
 * "My favorite fruit is: oranges"
 * "My favorite vegetable is: carrots"
 * "My favorite fruit is: oranges"
 * "My favorite vegetable is: broccoli"
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 18/12/14
 */
define(function () {
    "use strict";

    return function iterate() {
        var slice = Array.prototype.slice,
            items = [],
            i;

        for (i = 0; i < arguments.length; i++) {
            items = items.concat(arguments[i]);
        }

        return function (callback) {
            return function() {
                var prev = slice.apply(arguments),
                    i;
                for (i = 0; i < items.length; i++) {
                    if (typeof callback === "function") {
                        callback.apply(null, prev.concat(items[i]));
                    }
                }
            };
        };
    };
});
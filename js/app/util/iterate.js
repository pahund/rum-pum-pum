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
 * let fruits = iterate("apples", "oranges"),
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
 * @since 18 Dec 2014
 */
function iterate(...items) {
    items = items.reduce((prev, curr) => prev.concat(curr), []);
    return callback => {
        return (...prev) => {
            items.forEach(item => {
                if (typeof callback === "function") {
                    callback(...prev.concat(item));
                }
            });
        };
    };
}

export default iterate;

/**
 * nest.js
 *
 * Given a variable number of functions as arguments, the nest function executes these functions by passing them to
 * each other as arguments. To be used in conjunction with iterate, see comment on iterate.js for an example.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 18 Dec 2014
 */
function nest(...functions) {
    functions.reduceRight((prev, curr) => curr(prev))();
}

export default nest;

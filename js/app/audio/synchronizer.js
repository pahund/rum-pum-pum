/**
 * synchronizer.js
 *
 * Synchonization buffer between animation time and audio time.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 24 May 2015
 */

const latency = 20; // ms

let foobar = 0;

console.log("[PH_LOG] synchronizer is like SOOO getting initialized"); // PH_TODO: REMOVE

function foo() {
    console.log("[PH_LOG] adding +1 to foobar"); // PH_TODO: REMOVE
    foobar++;
}

function bar() {
    console.log("[PH_LOG] foobar: ", foobar); // PH_TODO: REMOVE
}


export default {
    foo,
    bar
};

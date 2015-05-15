/**
 * timer.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 20/12/14
 */
import getTimestamp from "../util/getTimestamp";

function timer() {
    let time = getTimestamp(),
        startTime = time,
        calls = 0;

    return {
        interval() {
            let t = getTimestamp(),
                ms = t - time;
            time = t;
            return ms;
        },
        duration() {
            return getTimestamp() - startTime;
        },
        reset() {
            time = getTimestamp();
            startTime = time;
        },
        average() {
            return Math.round((getTimestamp() - startTime) * 10 / ++calls) / 10;
        }
    };
}

export default timer;

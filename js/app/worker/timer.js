/**
 * A web worker for keeping precise musical time. Based on the example by Chris Wilson.
 *
 * @author <a href="https://github.com/cwilso">Chris Wilson</a>
 * @see https://github.com/cwilso/metronome
 * @since 17 May 2015
 */
let timerID = null,
    interval = 100;

self.onmessage = (e) => {
    if (e.data === "start") {
        //console.log("[PH_LOG] starting"); // PH_TODO: REMOVE
        timerID = setInterval(function () {
            postMessage("tick");
        }, interval);
        return;
    }
    if (e.data.interval) {
        //console.log("[PH_LOG] setting interval"); // PH_TODO: REMOVE
        interval = e.data.interval;
        //console.log("[PH_LOG] interval: ", interval); // PH_TODO: REMOVE
        if (timerID) {
            clearInterval(timerID);
            timerID = setInterval(() => postMessage("tick"), interval);
        }
        return;
    }
    if (e.data === "stop") {
        //console.log("[PH_LOG] stopping"); // PH_TODO: REMOVE
        clearInterval(timerID);
        timerID = null;
    }
};


/**
 * futureEvents.js
 *
 * Manages a map of callback functions that resolve promises, similar to a pub/sub system.
 *
 * Example:
 *
 * let future = futureEvents.on("foobar");
 * future.then(() => console.log("FOO!"));
 * future.then(() => console.log("BAR!"));
 * futureEvents.fire("foobar"); // FOO! BAR!
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16 May 2015
 */
const futureEvents = (() => {
    const callbacks = {};

    function isRegistered(topic) {
        return callbacks.hasOwnProperty(topic);
    }

    function on(topic) {
        let callback,
            promise;

        promise = new Promise(resolve => {
            callback = () => resolve();
        });
        callbacks[topic] = callback;
        return promise;
    }

    function fire(topic) {
        if (!isRegistered(topic)) {
            return;
        }
        callbacks[topic]();
        delete callbacks[topic];
    }

    return { on, fire };
})();

export default futureEvents;

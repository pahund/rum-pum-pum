/**
 * context.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 06/11/14
 */

define(function () {
    "use strict";

    let Context = window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.oAudioContext ||
        window.msAudioContext;

    if (!Context) {
        // Web Audio API is not available. Ask the user to use a supported browser.
        throw new Error("No Web Audio API - use a better browser");
    }

    return new Context();
});

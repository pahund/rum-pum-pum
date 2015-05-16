/**
 * context.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 3 Dec 2014
 */

const Context = window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext ||
    window.msAudioContext;

if (!Context) {
    // Web Audio API is not available. Ask the user to use a supported browser.
    throw new Error("No Web Audio API - use a better browser");
}

export default new Context();

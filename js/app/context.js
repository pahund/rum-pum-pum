/**
 * context.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 06/11/14
 */

"use strict";

/* global define */
define([], function () {

    var Context = window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.oAudioContext ||
        window.msAudioContext;

    if (!Context) {
        // Web Audio API is not available. Ask the user to use a supported browser.
        throw "No Web Audio API - use a better browser";
    }

    return new Context();
});

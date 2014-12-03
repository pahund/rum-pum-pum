/**
 * load.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 06/11/14
 */

/* global define */
define([
    "jquery",
    "app/context"
], function ($, context) {
    return function (url, callback) {

        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        request.onload = function () {

            context.decodeAudioData(
                request.response,
                function (buffer) {
                    if (!buffer) {
                        throw "error decoding file data: " + url;
                    }
                    callback(buffer);
                },
                function () {
                    throw "error decoding file data: " + url;
                }
            );
        };

        request.onerror = function () {
            throw "error loading " + url;
        };

        request.send();
    };
});
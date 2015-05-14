/**
 * load.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 06/11/14
 */

define(function (require) {

    var context = require("./context");

    return function (url, callback) {

        var request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";

        request.onload = function () {

            context.decodeAudioData(
                request.response,
                function (buffer) {
                    if (!buffer) {
                        throw new Error("error decoding file data: " + url);
                    }
                    callback(buffer);
                },
                function () {
                    throw new Error("error decoding file data: " + url);
                }
            );
        };

        request.onerror = function () {
            throw new Error("error loading " + url);
        };

        request.send();
    };
});

/**
 * loadSound.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 6 Nov 2014
 */

import context from "./context";

function loadSound(url, callback) {

    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {

        context.decodeAudioData(
            request.response,
            buffer => {
                if (!buffer) {
                    throw new Error("error decoding file data: " + url);
                }
                callback(buffer);
            },
            () => {
                throw new Error("error decoding file data: " + url);
            }
        );
    };

    request.onerror = function () {
        throw new Error("error loading " + url);
    };

    request.send();
}

export default loadSound;

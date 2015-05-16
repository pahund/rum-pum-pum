/**
 * playing.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 16 Dec 2014
 */
import componentFactory from "./componentFactory";

const playing = componentFactory("playing", [
    {
        name: "sound",
        mandatory: true
    },
    {
        name: "triggered",
        fallback: false
    }
]);

export default playing;

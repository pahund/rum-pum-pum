/**
 * playing.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 16/12/14
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

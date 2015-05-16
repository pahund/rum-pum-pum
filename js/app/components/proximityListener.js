/**
 * proximityListener.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 15 Dec 2014
 */
import componentFactory from "./componentFactory";

const proximityListener = componentFactory("proximityListener", [
    {
        name: "action",
        fallback() {}
    }
]);

export default proximityListener;

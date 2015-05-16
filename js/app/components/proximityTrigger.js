/**
 * proximityTrigger.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 15 Dec 2014
 */
import componentFactory from "./componentFactory";

const proximityTrigger = componentFactory("proximityTrigger", [
    {
        name: "vertical",
        fallback: false
    },
    {
        name: "horizontal",
        fallback: false
    },
    {
        name: "threshold",
        fallback: 100
    }
]);

export default proximityTrigger;

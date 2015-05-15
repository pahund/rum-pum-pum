/**
 * withSequenceAnimation.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 16/12/14
 */
import componentFactory from "./componentFactory";

const withSequenceAnimation = componentFactory("withSequenceAnimation", [
    {
        name: "sequences",
        mandatory: true
    },
    {
        name: "currentSequence",
        fallback: 0
    },
    {
        name: "running",
        fallback: false
    }
]);

export default withSequenceAnimation;

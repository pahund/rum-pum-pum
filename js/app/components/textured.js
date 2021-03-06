/**
 * textured.js
 *
 * A component for entities that have a texture.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 11 Dec 2014
 */
import componentFactory from "./componentFactory";

const textured = componentFactory("textured", [
    {
        name: "image",
        mandatory: true
    }
]);

export default textured;

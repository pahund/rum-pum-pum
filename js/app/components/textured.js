/**
 * textured.js
 *
 * A component for entities that have a texture.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 11/12/14
 */
define(function (require) {
    "use strict";

    var id = "textured",
        validateComponent = require("app/util/validateComponent");

    return function (input) {

        validateComponent(id, input, ["image", "frame"]);

        return {
            id: id,
            image: input.image,
            frame: input.frame,
            startFrame: input.startFrame === undefined ? 0 : input.startFrame
        };
    };
});
/**
 * textured.js
 *
 * A component for entities that have a texture.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 11/12/14
 */
define(function () {
    "use strict";

    return function (input) {
        if (input.image === undefined) {
            throw "Error: attempted to create textured component without mandatory setting path";
        }
        if (input.frame === undefined) {
            throw "Error: attempted to create textured component without mandatory setting frame";
        }
        return {
            id: "textured",
            image: input.image,
            frame: input.frame,
            startFrame: input.startFrame === undefined ? 0 : input.startFrame
        };
    };
});
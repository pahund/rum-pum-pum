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

    return require("app/components/componentFactory")("textured", [
        {
            name: "image",
            mandatory: true
        }
    ]);
});
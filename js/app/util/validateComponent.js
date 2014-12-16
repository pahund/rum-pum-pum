/**
 * validateComponent.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery");

    return function (id, input, properties) {
        if (typeof properties === "string") {
            properties = [ properties ];
        }
        $.each(properties, function () {
            if (input[this] === undefined) {
                throw "Error: attempted to create component \"" + id + "\" without mandatory property \"" + this + "\"";
            }
        });
    };
});
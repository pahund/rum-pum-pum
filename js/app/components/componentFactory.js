/**
 * componentFactory.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 16/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery"),
        clone = require("app/util/clone");

    return function(id, properties) {
        return function (input) {
            var component = {
                id: id
            };
            $.each(properties, function () {
                if (this.mandatory && input[this.name] === undefined) {
                    throw new Error("Attempted to create component \"" + id +
                            "\" without mandatory property \"" + this.name + "\"");
                }
                //component[this.name] = input[this.name] === undefined ? this.fallback : input[this.name];
                //var comp = input[this.name] === undefined ? this.fallback : input[this.name];
                /*
                if (typeof comp === "object") {
                    comp = $.extend(true, {}, comp);
                }
                */
                //component[this.name] = clone(comp);
                component[this.name] = input[this.name] === undefined ? this.fallback : input[this.name];
            });
            return component;
        };
    };
});
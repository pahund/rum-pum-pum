/**
 * componentFactory.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 16/12/14
 */
define(function (require) {
    "use strict";

    let $ = require("jquery");

    return function(id, properties) {
        return function (input) {
            let component = {
                id: id
            };
            $.each(properties, function () {
                if (this.mandatory && input[this.name] === undefined) {
                    throw new Error("Attempted to create component \"" + id +
                            "\" without mandatory property \"" + this.name + "\"");
                }
                component[this.name] = input[this.name] === undefined ? this.fallback : input[this.name];
            });
            return component;
        };
    };
});

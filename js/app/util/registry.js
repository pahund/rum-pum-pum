/**
 * registry.js
 *
 * Returns a function that manages a map of keys and items.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 19/12/14
 */
define(function () {
    "use strict";

    return function registry() {
        var reg = {};
        return {
            get: function (key, constructor) {

                var item = reg[key];
                if (item === undefined) {
                    item = constructor();
                    reg[key] = item;
                }
                return item;
            },

            call: function (key, constructor) {
                this.get(key, constructor)();
            },

            remove: function (key) {
                delete reg[key];
            }
        };
    };
});
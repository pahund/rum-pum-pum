/**
 * registry.js
 *
 * Returns a function that manages a map of keys and items.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 19/12/14
 */
define(function () {
    "use strict";

    return function registry(maxItems, garbageCollect) {
        var reg = {},
            count = 0;

        function addItem(key, constructor) {
            var item = constructor();
            reg[key] = item;
            count++;
            if (count > maxItems && typeof garbageCollect === "function") {
                garbageCollect(reg);
                count = Object.keys(reg).length;
            }
            return item;
        }

        if (maxItems === undefined) {
            maxItems = 100;
        }

        return {
            get: function (key, constructor) {
                var item = reg[key] || addItem(key, constructor);
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

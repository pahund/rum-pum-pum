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

    var registryId = 0;

    return function registry(maxItems, garbageCollect) {
        var reg = {},
            count = 0,
            id = registryId++;

        console.log("[PH_LOG] instantiated registry " + id); // PH_TODO: REMOVE

        function addItem(key, constructor) {
            var item = constructor();
            reg[key] = item;
            console.log("[PH_LOG] item was added to registry " + id + ": " + key); // PH_TODO: REMOVE
            count++;
            console.log("[PH_LOG] registry " + id + " has " + count + " items"); // PH_TODO: REMOVE
            if (count > maxItems && typeof garbageCollect === "function") {
                garbageCollect(reg);
                count = Object.keys(reg).length;
                console.log("[PH_LOG] registry " + id + " has " + count + " items after GC"); // PH_TODO: REMOVE
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
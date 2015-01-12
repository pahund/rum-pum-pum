/**
 * registerAndExecute.js
 *
 * Basic utility function for systems; manages a map of entity IDs and callback functions and creates a function that
 * executes the callback for a specified entity ID, passing the specified components to the callback. An optional
 * condition function can be used to manage the execution - if the condition returns true, the callback if executed,
 * otherwise it is removed from the map.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 17/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery"),
        registryf = require("app/util/registry");

    /**
     * Creates the register and execute function.
     *
     * @param {function} Callback function (required)
     * @param {function} Condition function (optional)
     * @param {string} Component IDs (variable number of arguments, at least 1)
     * @return {function} The register and execute function, which accepts an entity ID and map of components as arguments
     */
    return function () {
        var slice = Array.prototype.slice,
            registry = registryf(),
            callback = arguments[0],
            hasCondition = typeof arguments[1] === "function",
            condition = hasCondition ? arguments[1] : function () { return true; },
            compIds = slice.call(arguments, hasCondition ? 2 : 1);

        return function (id, comp) {
            var c = [];
            $.each(compIds, function () {
                c.push(comp[this]);
            });
            if (!condition.apply(null, c)) {
                registry.remove(id);
                return;
            }
            registry.call(id, function () {
                return callback.apply(null, c);
            });
        };
    };
});
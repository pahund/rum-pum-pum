/**
 * registerAndExecute.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 17/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery");

    return function () {
        var slice = Array.prototype.slice,
            registry = {},
            callback = arguments[0],
            hasCondition = typeof arguments[1] === "function",
            condition = hasCondition ? arguments[1] : function () { return true; },
            compIds = slice.call(arguments, hasCondition ? 2 : 1);
        return function (id, comp) {
            var a = registry[id],
                c = [ id ];
            $.each(compIds, function () {
                c.push(comp[this]);
            });
            if (!condition.apply(null, c)) {
                if (a) {
                    delete registry[id];
                }
                return;
            }
            if (a === undefined) {
                a = callback.apply(null, c);
                registry[id] = a;
            }
            a();
        };
    };
});
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
            compIds = slice.call(arguments, 1);
        return function (id, comp) {
            var a = registry[id];
            if (a === undefined) {
                var c = [ id ];
                $.each(compIds, function () {
                    c.push(comp[this]);
                });
                a = callback.apply(null, c);
                registry[id] = a;
            }
            a();
        };
    };
});
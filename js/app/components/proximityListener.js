/**
 * proximityListener.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 15/12/14
 */
define(function () {
    "use strict";

    var id = "proximityListener";

    return function (input) {
        return {
            id: id,
            action: input.action === undefined ? function () {} : input.action
        };
    };
});
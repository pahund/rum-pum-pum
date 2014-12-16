/**
 * proximityTrigger.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 15/12/14
 */
define(function () {
    "use strict";

    var id = "proximityTrigger";

    return function (input) {
        return {
            id: id,
            vertical: input.vertical === undefined ? false : input.vertical,
            horizontal: input.horizontal === undefined ? false : input.horizontal,
            threshold: input.threshold === undefined ? 100 : input.threshold
        };
    };
});
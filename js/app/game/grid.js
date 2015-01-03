/**
 * grid.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03/01/15
 */
define(function (require) {
    "use strict";

    var config = require("app/config"),
        gridCalculator = require("app/util/gridCalculator");

    return gridCalculator({
        rows: config.rows,
        columns: config.columns
    });
});
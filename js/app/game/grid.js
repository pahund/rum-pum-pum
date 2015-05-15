/**
 * grid.js
 *
 * The grid that the entities are placed on. A singleton composed of a
 * grid calculator and a grid toggler instance.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03/01/15
 */
define(function (require) {
    "use strict";

    let config = require("../config"),
        gridCalculator = require("../util/gridCalculator"),
        gridToggler = require("../util/gridToggler"),
        calculator,
        toggler;

    calculator = gridCalculator({
        rows: config.rows,
        columns: config.columns
    });

    toggler = gridToggler(config.rows, config.columns);

    return $.extend(true, calculator, toggler);
});

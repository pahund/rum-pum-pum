/**
 * grid.js
 *
 * The grid that the entities are placed on. A singleton composed of a
 * grid calculator and a grid toggler instance.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 3 Jan 2015
 */
import $ from "jquery";
import config from "../config";
import gridCalculator from "../util/gridCalculator";
import gridToggler from "../util/gridToggler";

let calculator,
    toggler;

calculator = gridCalculator({
    rows: config.rows,
    columns: config.columns
});

toggler = gridToggler(config.rows, config.columns);

export default $.extend(true, calculator, toggler);

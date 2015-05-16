/**
 * gridCalculator.js
 *
 * Calculates X/Y coordinates for positioning entities, using a grid of arbitrary number of rows and columns.
 * Initialize the grid calculator by passing the width and height of the grid (percentual values in relation to the
 * browser viewport dimensions), and the number of rows and columns.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 22 Dec 2014
 */
import $ from "jquery";
import dimensions from "../game/dimensions";

function gridCalculator(options) {
    let settings = {},
        defaults,
        init,
        calculate,
        bounds,
        change;

    defaults = {
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        rows: 16,
        columns: 16
    };

    init = {
        settings() {
            $.extend(true, settings, defaults, options);
            return init;
        },
        bounds() {
            bounds = {
                top: calculate.percentage(dimensions.viewport.h, settings.top),
                left: calculate.percentage(dimensions.viewport.w, settings.left),
                height: calculate.percentage(dimensions.viewport.h, settings.height),
                width: calculate.percentage(dimensions.viewport.w, settings.width)
            };
            return init;
        }
    };

    calculate = {
        percentage(value, percentage) {
            return value * percentage / 100;
        },
        position(index, totalCount, totalSize, offset, anchorOffset) {
            let size = totalSize / totalCount;
            if (anchorOffset === undefined) {
                anchorOffset = 0;
            }
            return offset + (index * size) - size + (size * anchorOffset);
        },
        cell(pixelCoord, cellSize, offset) {
            return Math.floor((pixelCoord - offset) / cellSize) + 1;
        }
    };

    change = {
        setting(name, value) {
            settings[name] = value;
            init.bounds();
        }
    };

    init.settings().bounds();

    return {
        get: {
            x(column, anchorOffset) {
                return calculate.position(column, settings.columns, bounds.width, bounds.left, anchorOffset);
            },
            y(row, anchorOffset) {
                return calculate.position(row, settings.rows, bounds.height, bounds.top, anchorOffset);
            },
            w() {
                return bounds.width / settings.columns;
            },
            h() {
                return bounds.height / settings.rows;
            },
            column(x) {
                return calculate.cell(x, this.w(), bounds.left);
            },
            row(y) {
                return calculate.cell(y, this.h(), bounds.top);
            }
        },

        set: (() => {
            let setters = {};
            $.each(settings, name => setters[name] = value => change.setting(name, value));
            return setters;
        })()
    };
}

export default gridCalculator;

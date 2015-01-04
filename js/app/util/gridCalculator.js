/**
 * gridCalculator.js
 *
 * Calculates X/Y coordinates for positioning entities, using a grid of arbitrary number of rows and columns.
 * Initialize the grid calculator by passing the width and height of the grid (percentual values in relation to the
 * browser viewport dimensions), and the number of rows and columns.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 22/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery"),
        dimensions = require("app/game/dimensions");

    return function (options) {
        var settings = {},
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
            settings: function () {
                $.extend(true, settings, defaults, options);
                return init;
            },
            bounds: function () {
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
            percentage: function (value, percentage) {
                return value * percentage / 100;
            },
            position: function (index, totalCount, totalSize, offset) {
                var size = totalSize / totalCount;
                return offset + (index * size) - (size / 2);
            },
            cell: function (pixelCoord, cellSize, offset) {
                return Math.floor((pixelCoord - offset) / cellSize) + 1;
            }
        };

        change = {
            setting: function (name, value) {
                settings[name] = value;
                init.bounds();
            }
        };

        init.settings().bounds();

        return {
            get: {
                x: function (column) {
                    return calculate.position(column, settings.columns, bounds.width, bounds.left);
                },
                y: function (row) {
                    return calculate.position(row, settings.rows, bounds.height, bounds.top);
                },
                w: function () {
                    return bounds.width / settings.columns;
                },
                h: function () {
                    return bounds.height / settings.rows;
                },
                column: function (x) {
                    return calculate.cell(x, this.w(), bounds.left);
                },
                row: function (y) {
                    return calculate.cell(y, this.h(), bounds.top);
                }
            },

            set: (function () {
                var setters = {};
                $.each(settings, function (name) {
                    setters[name] = function (value) {
                        change.setting(name, value);
                    };
                });
                return setters;
            }())
        };
    };
});
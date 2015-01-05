/**
 * gridToggler.js
 *
 * Stores boolean states for a grid of a configurable number of rows and columns, providing
 * methods to change and get the state of each grid cell.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 04/01/15
 */
define(function () {
    "use strict";

    return function (rows, cols) {

        var toggles = [],
            row,
            col;

        for (row = 1; row <= rows; row++) {
            toggles[row] = [];
            for (col = 1; col <= cols; col++) {
                toggles[row][col] = false;
            }
        }

        return {
            isOccupied: function (row, col) {
                return toggles[row][col];
            },

            turnOn: function (row, col) {
                toggles[row][col] = true;
            },

            turnOff: function (row, col) {
                toggles[row][col] = false;
            },

            toggle: function (row, col) {
                toggles[row][col] = !toggles[row][col];
                return toggles[row][col];
            }
        };
    };
});
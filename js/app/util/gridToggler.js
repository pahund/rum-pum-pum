/**
 * gridToggler.js
 *
 * Stores boolean states for a grid of a configurable number of rows and columns, providing
 * methods to change and get the state of each grid cell.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 4 Jan 2015
 */
function gridToggler(rows, cols) {

    let toggles = [],
        rowIt,
        colIt;

    for (rowIt = 1; rowIt <= rows; rowIt++) {
        toggles[rowIt] = [];
        for (colIt = 1; colIt <= cols; colIt++) {
            toggles[rowIt][colIt] = false;
        }
    }

    return {
        isOccupied(row, col) {
            return toggles[row][col];
        },

        turnOn(row, col) {
            toggles[row][col] = true;
        },

        turnOff(row, col) {
            toggles[row][col] = false;
        },

        toggle(row, col) {
            toggles[row][col] = !toggles[row][col];
            return toggles[row][col];
        }
    };
}

export default gridToggler;

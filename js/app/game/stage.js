/**
 * stage.js
 *
 * Initialization and interaction logic for the Pixi stage. Creates and returns the stage as a singleton.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 04/12/14
 */
define(function (require) {
    "use strict";

    var PIXI = require("app/util/pixi.dev.patched"),
        grid = require("app/game/grid"),
        config = require("app/config"),
        entityManager = require("app/systems/entityManager"),
        stage = new PIXI.Stage(0xFFFFFF, true);

    function interact(data) {
        var row = grid.get.row(data.global.y),
            col = grid.get.column(data.global.x),
            occupied = grid.isOccupied(row, col),
            type = config.animalForRow[row];
        if (type === undefined) {
            return;
        }
        if (!occupied) {
            entityManager.add(type, col);
        } else {
            entityManager.remove(type, col);
        }

    }

    stage.mousedown = interact;
    stage.touchstart = interact;

    return stage;
});
/**
 * entityManager.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 04/01/15
 */
define(function (require) {
    "use strict";

    var world = require("app/game/world"),
        config = require("app/config"),
        grid = require("app/game/grid"),
        bear = require("app/entities/bear"),
        monkey = require("app/entities/monkey"),
        kangaroo = require("app/entities/kangaroo");

    function addEntity(type, col) {
        var row = config.rowForAnimal[type],
            x = grid.get.x(col, 0.5),
            y = grid.get.y(row, 1),
            id = type + col;

        if (grid.isOccupied(row)) {
            throw new Error("attempted to add " + type + " to row " + row + ", column " + col + ", " +
            "which is already occupied");
        }
        grid.turnOn(row, col);
        switch (type) {
            case "kangaroo":
                world.addEntity(id, kangaroo({
                    x: x,
                    y: y
                }));
                break;
            case "baby-kangaroo":
                world.addEntity(id, kangaroo({
                    variant: 1,
                    x: x,
                    y: y
                }));
                break;
            case "monkey":
                world.addEntity(id, monkey({
                    x: x,
                    y: y
                }));
                break;
            case "bear":
                world.addEntity(id, bear({
                    x: x,
                    y: y
                }));
                break;
        }
        return id;
    }

    return {
        /**
         * Adds an music animal entity to the world and the grid.
         * @param type The type of entity: kangaroo, baby-kangaroo, monkey or bear (birds are not managed by this component)
         * @col The column of the grid to display the entity in
         * @return The ID of the new entity
         */
        add: addEntity,

        /**
         * Adds a kangaroo entity (low cuica) to the world and the grid.
         * @col The column of the grid to display the kangaroo in
         * @return The ID of the new entity
         */
        addKangaroo: function () {
            return addEntity("kangaroo", arguments[arguments.length - 1]);
        },

        /**
         * Adds a baby kangaroo entity (high cuica) to the world and the grid.
         * @col The column of the grid to display the baby kangaroo in
         * @return The ID of the new entity
         */
        addBabyKangaroo: function () {
            return addEntity("baby-kangaroo", arguments[arguments.length - 1]);
        },

        /**
         * Adds a monkey entity (snare drum) to the world and the grid.
         * @col The column of the grid to display the monkey in
         * @return The ID of the new entity
         */
        addMonkey: function () {
            return addEntity("monkey", arguments[arguments.length - 1]);
        },

        /**
         * Adds a bear entity (bass drum) to the world and the grid.
         * @col The column of the grid to display the bear in
         * @return The ID of the new entity
         */
        addBear: function () {
            return addEntity("bear", arguments[arguments.length - 1]);
        }
    };
});
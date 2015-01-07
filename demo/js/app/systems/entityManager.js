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
            y = grid.get.y(row, 1);

        if (grid.isOccupied(row)) {
            throw new Error("attempted to add " + type + " to row " + row + ", column " + col + ", " +
            "which is already occupied");
        }
        grid.turnOn(row, col);
        switch (type) {
            case "kangaroo":
                world.addEntity("kangaroo" + col, kangaroo({
                    x: x,
                    y: y
                }));
                break;
            case "baby-kangaroo":
                world.addEntity("baby-kangaroo" + col, kangaroo({
                    variant: 1,
                    x: x,
                    y: y
                }));
                break;
            case "monkey":
                world.addEntity("monkey" + col, monkey({
                    x: x,
                    y: y
                }));
                break;
            case "bear":
                world.addEntity("bear" + col, bear({
                    x: x,
                    y: y
                }));
                break;
            default:
                throw new Error("invalid type: " + type);
        }
    }

    return {
        add: addEntity,
        addKangaroo: function () {
            addEntity("kangaroo", arguments[arguments.length - 1]);
        },
        addBabyKangaroo: function () {
            addEntity("baby-kangaroo", arguments[arguments.length - 1]);
        },
        addMonkey: function () {
            addEntity("monkey", arguments[arguments.length - 1]);
        },
        addBear: function () {
            addEntity("bear", arguments[arguments.length - 1]);
        }
    };
});
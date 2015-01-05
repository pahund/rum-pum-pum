/**
 * background.js
 *
 * Background graphics of the main screen.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 03/01/15
 */
define(function (require) {
    "use strict";

    var grid = require("app/game/grid"),
        PIXI = require("pixi.dev"),
        background = new PIXI.Graphics(),
        row,
        col,
        x,
        y,
        w,
        h;

    for (row = 1; row <= 4; row++) {
        for (col = 1; col <= 16; col++) {
            w = Math.round(grid.get.w());
            h = Math.round(grid.get.h());
            x = Math.round(grid.get.x(col) - w / 2);
            y = Math.round(grid.get.y(row) - h / 2);
            x += 10;
            y += 10;
            w -= 20;
            h -= 20;

            background.beginFill(0xEEEEEE).drawRoundedRect(x, y, w, h, 15).endFill();
        }
    }

    return background;
});
/**
 * background.js
 *
 * Background graphics of the main screen.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 3 Jan 2015
 */
import grid from "./grid";
import PIXI from "pixi";
import dimensions from "./dimensions";

const background = new PIXI.Graphics();

background.beginFill(0xFFFFFF).drawRect(0, 0, dimensions.viewport.w, dimensions.viewport.h).endFill();

for (let row = 1; row <= 4; row++) {
    for (let col = 1; col <= 16; col++) {
        let w = grid.get.w() - 20,
            h = grid.get.h() - 20,
            x = grid.get.x(col) + 10,
            y = grid.get.y(row) + 10;

        background.beginFill(0xEEEEEE).drawRoundedRect(x, y, w, h, 15).endFill();
    }
}

export default background;

/**
 * stage.js
 *
 * Initialization and interaction logic for the Pixi stage. Creates and returns the stage as a singleton.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 04/12/14
 */
import PIXI from "pixi";
import grid from "./grid";
import config from "../config";
import entityManager from "../systems/entityManager";

let stage = new PIXI.Container();

function interact(event) {
    let row = grid.get.row(event.data.global.y),
        col = grid.get.column(event.data.global.x),
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

stage.interactive = true;
stage.mousedown = interact;
stage.touchstart = interact;

export default stage;

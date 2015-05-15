/**
 * renderer.js
 *
 * Initialization logic for the Pixi renderer. Creates and returns the renderer as a singleton.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 04/12/14
 */
import PIXI from "pixi";
import dimensions from "./dimensions";

export default PIXI.autoDetectRenderer(dimensions.viewport.w, dimensions.viewport.h, {
    antialias: true
});

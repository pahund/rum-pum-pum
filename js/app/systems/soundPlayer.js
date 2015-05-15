/**
 * soundPlayer.js
 *
 * A system that plays sounds for entities with the playing component.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 16/12/14
 */
import world from "../game/world";
import player from "../audio/player";

export default () => {
    world.forEachEntityWithComponents("playing")((id, components) => {
        let pc = components.playing;
        if (!pc.triggered) {
            return;
        }
        player.play(pc.sound);
        pc.triggered = false;
    });
};

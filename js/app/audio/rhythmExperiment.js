/**
 * rhythmExperiment.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 17 May 2015
 */
import context from "./context";
import player from "./player";

function rhythmExperiment() {
    //console.log("[PH_LOG] run"); // PH_TODO: REMOVE
    // We'll start playing the rhythm 100 milliseconds from "now"
    const startTime = context.currentTime + 0.100,
        tempo = 80, // BPM (beats per minute)
        eighthNoteTime = (60 / tempo) / 2;

    // Play 2 bars of the following:
    for (let bar = 0; bar < 2; bar++) {
        const time = startTime + bar * 8 * eighthNoteTime;
        let i;
        // Play the bass (kick) drum on beats 1, 5
        player.play("kick", time);
        player.play("kick", time + 4 * eighthNoteTime);

        // Play the snare drum on beats 3, 7
        player.play("snare", time + 2 * eighthNoteTime);
        player.play("snare", time + 6 * eighthNoteTime);

        // Play the hi-hat every eighth note.
        for (i = 0; i < 8; ++i) {
            player.play("hi-hat-closed", time + i * eighthNoteTime);
        }
    }
}

export default rhythmExperiment;

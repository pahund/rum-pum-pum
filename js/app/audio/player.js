/**
 * player.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 06/11/14
 */

define(function (require) {

    var context = require("app/audio/context"),
        load = require("app/audio/load"),
        buffers = {};

    return {
        load: function (id, path) {
            load(path, function (data) {
                buffers[id] = data;
            });
        },

        play: function (id) {
            var source = context.createBufferSource(),
                gain = context.createGain();

            source.connect(gain);
            gain.connect(context.destination);
            source.buffer = buffers[id];
            source.start(0);

        }
    };
});

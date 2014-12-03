/**
 * player.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 06/11/14
 */

define([
    "app/context",
    "app/load"
], function (context, load) {

    var buffers = {};

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
})

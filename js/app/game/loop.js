/**
 * loop.js
 *
 * The main game loop.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 04/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery"),
        renderer = require("app/game/renderer"),
        stage = require("app/game/stage"),
        config = require("app/config"),
        timer = require("app/util/timer")(),
        actions = [],
        $monitor = $("#monitor");

    (function loop() {
        $.each(actions, function () {
            this();
        });
        if (config.debug) {
            $monitor.html(timer.average());
        }
        window.requestAnimationFrame(loop);
        renderer.render(stage);
    })();

    return {
        add: function () {
            $.each(arguments, function () {
                actions.push(this);
            });
        }
    };
});
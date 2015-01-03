/**
 * loop.js
 *
 * The main game loop.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
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
        $monitor = $("#monitor"),
        running = false;

    (function loop() {
        if (running) {
            $.each(actions, function () {
                this();
            });
            if (config.debug) {
                $monitor.html(timer.average());
            }
            renderer.render(stage);
        }
        window.requestAnimationFrame(loop);
    })();

    return {
        init: function () {
            renderer.render(stage);
        },
        add: function () {
            $.each(arguments, function () {
                actions.push(this);
            });
        },
        start: function () {
            running = true;
        },
        stop: function () {
            running = false;
        }
    };
});
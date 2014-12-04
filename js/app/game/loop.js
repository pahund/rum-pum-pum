/**
 * loop.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 04/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery"),
        renderer = require("app/game/renderer"),
        stage = require("app/game/stage"),
        actions = {};

    (function loop(){
        $.each(actions, function (name, action) {
            action();
        });
        renderer.render(stage);
        window.requestAnimationFrame(loop);
    })();

    return {
        add: function (name, func) {
            actions[name] = func;
        }
    };
});
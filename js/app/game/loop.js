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
        window.requestAnimationFrame(loop);
        renderer.render(stage);
    })();

    return {
        add: function (name, func) {
            actions[name] = func;
        }
    };
});
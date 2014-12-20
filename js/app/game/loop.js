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
        //counter = 0,
        //timer = require("app/util/timer")(),
        actions = [];

    (function loop(){
        //console.log("loop #" + (++counter) + ", " + timer.duration()); */
        $.each(actions, function () {
            this();
        });
        renderer.render(stage);
        //console.log("    stage:");
        //$.each(stage.children, function (index, value) {
        //    console.log("        #" + index + " " + value.texture.frame.x);
        //});
        window.requestAnimationFrame(loop);
    })();

    return {
        add: function () {
            $.each(arguments, function () {
                actions.push(this);
            });
        }
    };
});
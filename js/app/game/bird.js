/**
 * bird.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 04/12/14
 */
define(function (require) {
    "use strict";

    var PIXI = require("pixi.dev"),
        factory = {
            intervalExecutor: require("app/factory/intervalExecutor"),
            phasedExecutor: require("app/factory/phasedExecutor"),
            when: require("app/factory/when")
        },
        win = {
            w: $(window).width(),
            h: $(window).height()
        },
        stage = new PIXI.Stage(0xFFFFFF),
        renderer = PIXI.autoDetectRenderer(win.w, win.h),
        texture = PIXI.Texture.fromImage("images/flapping-bird.png"),
        bird,
        flapper;

    function placeLeft(sprite) {
        sprite.position.x = 0 - sprite.width;
    }

    function isRight(sprite) {
        return sprite.x > win.w;
    }

    function flap(phase) {
        texture.setFrame(new PIXI.Rectangle(phase * 395, 0, 395, 419));
    }

    return {
        init: function () {
            texture.setFrame(new PIXI.Rectangle(0, 0, 395, 419));

            bird = new PIXI.Sprite(texture);
            bird.anchor.x = 0;
            bird.anchor.y = 0.5;
            bird.position.y = win.h / 2;
            stage.addChild(bird);
            $("body").append(renderer.view);

            flapper = factory.intervalExecutor(factory.phasedExecutor(flap, 3), 100);

            placeLeft(bird);

            (function animloop(){
                flapper();
                bird.position.x += 20;
                factory.when(bird)(isRight, placeLeft);
                renderer.render(stage);
                window.requestAnimationFrame(animloop);
            })();
        }
    };
});
/**
 * main.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 22/10/14
 */

"use strict";

/* global require */
require.config({
    baseUrl: "js/lib",
    paths: {
        app: "../app"
    }
});

require([
    "jquery",
    "app/player",
    "pixi.dev",
    "app/factory/intervalExecutor",
    "app/factory/phasedExecutor",
    "app/factory/when"
], function ($, player, PIXI, intervalExecutorFactory, phasedExecutorFactory, when) {

    var win = {
            w: $(window).width(),
            h: $(window).height()
        },
        stage,
        renderer,
        texture,
        bird,
        flapper;

    function playFactory(name) {
        return function () {
            player.play(name);
        };
    }

    $(".drum").each(function () {
        var $button = $(this),
            name = $button.data("name"),
            file = "sounds/" + name + ".ogg";
        player.load(name, file);
        $button.on("click", playFactory(name));
    });

    stage = new PIXI.Stage(0xFFFFFF);
    renderer = PIXI.autoDetectRenderer(win.w, win.h);
    texture = PIXI.Texture.fromImage("images/flapping-bird.png");
    texture.setFrame(new PIXI.Rectangle(0, 0, 395, 419));
    bird = new PIXI.Sprite(texture);
    bird.anchor.x = 0;
    bird.anchor.y = 0.5;
    bird.position.y = win.h / 2;
    stage.addChild(bird);
    $("body").append(renderer.view);

    function placeLeft(sprite) {
        sprite.position.x = 0 - sprite.width;
    }

    function isRight(sprite) {
        return sprite.x > win.w;
    }

    function flap(phase) {
        texture.setFrame(new PIXI.Rectangle(phase * 395, 0, 395, 419));
    }

    flapper = intervalExecutorFactory(phasedExecutorFactory(flap, 3), 100);

    placeLeft(bird);

    (function animloop(){
        window.requestAnimationFrame(animloop);
        flapper();
        bird.position.x += 20;
        when(bird)(isRight, placeLeft);
        renderer.render(stage);
    })();

});



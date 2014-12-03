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
    "pixi.dev"
], function ($, player, PIXI) {

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
    bird.anchor.x = 0.5;
    bird.anchor.y = 0.5;
    bird.position.x = win.w / 2;
    bird.position.y = win.h / 2;
    stage.addChild(bird);
    $("body").append(renderer.view);

    function intervalExecutorFactory(func, interval) {
        var startTime;
        function getTimestamp() {
            return new Date().getTime();
        }
        if (typeof func !== "function") {
            throw "Error: intervalExecutorFacotry expects function to be executed as first argument";
        }
        if (interval === undefined) {
            interval = 1000; // default interval 1 sec
        }
        startTime = getTimestamp();
        return function () {
            var currentTime = getTimestamp();
            if (currentTime > startTime + interval) {
                func();
                startTime = getTimestamp();
            }
        };
    }

    function phasedExecutorFactory(func, numberOfPhases) {
        var phase = 0;
        if (typeof func !== "function") {
            throw "Error: phasedExecutorFactory expects function to be executed as first argument";
        }
        if (typeof numberOfPhases !== "number") {
            throw "Error: phasedExecutorFactory expects number of phases as second argument";
        }
        return function () {
            func(phase);
            if (++phase === numberOfPhases) {
                phase = 0;
            }
        };
    }

    function flap(phase) {
        texture.setFrame(new PIXI.Rectangle(phase * 395, 0, 395, 419));
    }

    flapper = intervalExecutorFactory(phasedExecutorFactory(flap, 3), 100);

    (function animloop(){
        requestAnimationFrame(animloop);
        flapper();
        renderer.render(stage);
    })();

});



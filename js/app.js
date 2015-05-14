/**
 * app.js
 *
 * Starting point of the application, does all the initialization and starts the game loop.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 22/10/14
 */

"use strict";

var $ = require("jquery"),
    config = require("./app/config"),
    player = require("./app/audio/player"),
    entityManager = require("./app/systems/entityManager"),
    PIXI = require("pixi"),
    renderer = require("./app/game/renderer"),
    stage = require("./app/game/stage"),
    grid = require("./app/game/grid"),
    loop = require("./app/game/loop"),
    world = require("./app/game/world"),
    background = require("./app/game/background"),
    spriteManager = require("./app/systems/spriteManager"),
    bird = require("./app/entities/bird"),
    loader = PIXI.loader,
    start,
    stop;

start = function () {
    $("#play").html("Stop").one("click", stop);
    loop.start();
};

stop = function () {
    $("#play").html("Start").one("click", start);
    loop.stop();
};

function onAssetsLoaded() {

    stage.addChild(background);

    world.addEntity("bird", bird({
        x: grid.get.x(1, 0.5),
        y: grid.get.y(1, 0.5),
        minX: grid.get.x(1, 0.5),
        maxX: grid.get.x(17, 0.5)
    }));
    $.each([3, 7, 11, 15], entityManager.addKangaroo);
    $.each([13], entityManager.addBabyKangaroo);
    $.each([5, 13, 15, 16], entityManager.addMonkey);
    $.each([1, 4, 11], entityManager.addBear);

    spriteManager.init(world);
    loop.init();

    loop.add(
        require("./app/systems/frameAnimator"),
        require("./app/systems/mover"),
        require("./app/systems/proximityDetector"),
        require("./app/systems/sequenceAnimator"),
        require("./app/systems/soundPlayer"),
        spriteManager.update
    );

    $("#play").one("click", start);
}

$("body").append(renderer.view);

loader.add("images/sprites.json").load(onAssetsLoaded);

player.load(config.sounds);

if (config.debug) {
    $("#monitor").html("debug active").show();
}



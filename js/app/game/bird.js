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
            interval: require("app/factory/interval"),
            phase: require("app/factory/phase"),
            when: require("app/factory/when")
        },
        dimensions = require("app/game/dimensions"),
        stage = require("app/game/stage"),
        texture = PIXI.Texture.fromImage("images/flapping-bird.png"),
        bird,
        flapper;

    function placeLeft(sprite) {
        sprite.position.x = 0 - sprite.width;
    }

    function isRight(sprite) {
        return sprite.x > dimensions.viewport.w;
    }

    function flap(p) {
        texture.setFrame(new PIXI.Rectangle(p * 395, 0, 395, 419));
    }

    return {
        init: function () {
            texture.setFrame(new PIXI.Rectangle(0, 0, 395, 419));

            bird = new PIXI.Sprite(texture);
            bird.anchor.x = 0;
            bird.anchor.y = 0.5;
            bird.position.y = dimensions.viewport.h / 4;
            stage.addChild(bird);

            flapper = factory.interval(factory.phase(flap, 3), 100);

            placeLeft(bird);
        },

        fly: function () {
            flapper();
            bird.position.x += 20;
            factory.when(bird)(isRight, placeLeft);
        },

        isRightOf: function (otherSprite) {
            return bird.x > otherSprite.x;
        },

        isOffScreen: function () {
            return isRight(bird);
        }
    };
});
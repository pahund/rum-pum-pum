/**
 * bear.js
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 05/12/14
 */
define(function (require) {
    "use strict";

    var PIXI = require("pixi.dev"),
        factory = {
            flip: require("app/factory/flip"),
            once: require("app/factory/once"),
            delayed: require("app/factory/delayed"),
            conditional: require("app/factory/conditional")
        },
        width = 551,
        height = 760,
        frame = {
            beat: new PIXI.Rectangle(0, 0, width, height),
            pause: new PIXI.Rectangle(width, 0, width, height)
        },
        dimensions = require("app/game/dimensions"),
        stage = require("app/game/stage"),
        texture = PIXI.Texture.fromImage("images/kick-bear.png"),
        bear,
        bird,
        kicker,
        sound;

    function beat() {
        console.log("[PH_LOG] beat"); // PH_TODO: REMOVE
        sound();
        texture.setFrame(frame.beat);
    }

    function pause() {
        console.log("[PH_LOG] pause"); // PH_TODO: REMOVE
        texture.setFrame(frame.pause);
    }

    function birdHasPassed() {
        return bird.isRightOf(bear);
    }

    function resetKicker() {
        kicker = getKicker();
    }

    function getKicker() {
        /*
        return factory.flip([
            factory.once(beat),
            factory.delayed(factory.once(pause), 100)
        ], resetKicker, birdHasPassed);
        */
        return factory.conditional([
            factory.once(beat),
            factory.delayed([
                factory.once([
                    pause,
                    resetKicker
                ])
            ], 100)
        ], birdHasPassed);
    }

    return {
        init: function () {
            texture.setFrame(frame.pause);

            bear = new PIXI.Sprite(texture);
            bear.anchor.x = 0.5;
            bear.anchor.y = 0.5;
            bear.position.y = dimensions.viewport.h / 4 * 3;
            bear.position.x = dimensions.viewport.w / 2;
            stage.addChild(bear);

            resetKicker();
        },

        set: {
            bird: function (newBird) {
                bird = newBird;
            },
            sound: function (newSound) {
                sound = newSound;
            }
        },

        kick: function () {
            kicker();
        }
    };
});
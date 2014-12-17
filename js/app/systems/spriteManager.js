/**
 * spriteManager.js
 *
 * Stores all sprites that represent entities on the stage. Provides initialization logic that creates all the sprites
 * from the world and update logic that changes the sprites according to changes in the world.
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 14/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery"),
        PIXI = require("pixi.dev"),
        stage = require("app/game/stage"),
        world = require("app/game/world"),
        sprites = {};

    function updateFrame(sprite, comp) {
        var currentFrame,
            frame;

        $.each(comp, function () {
            currentFrame = this.currentFrame;
            if (currentFrame !== undefined) {
                return false;
            }
        });

        if (currentFrame === undefined) {
            return;
        }
        frame = comp.textured.frame.clone();
        frame.x = frame.width * currentFrame;
        sprite.texture.setFrame(frame);
    }

    function updatePosition(sprite, comp) {
        sprite.position = comp.positioned.coordinates;
    }

    return {
        init: function () {
            world.forEachEntityWithComponents("textured")(function () {
                var texture,
                    frame,
                    sprite;

                texture = PIXI.Texture.fromImage(this.components.textured.image);
                frame = this.components.textured.frame.clone();
                frame.x = frame.width * this.components.textured.startFrame;
                texture.setFrame(frame);
                sprite = new PIXI.Sprite(texture);
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                if (this.components.positioned) {
                    sprite.position = this.components.positioned.coordinates;
                    sprite.scale = this.components.positioned.scale;
                } else {
                    // if the sprite is not positioned, it is hidden (out of visible viewport)
                    sprite.position = new PIXI.Point(-10000, 0);
                }
                stage.addChild(sprite);
                sprites[this.id] = sprite;
            });
        },

        update: function () {
            world.forEachEntityWithComponents("textured", "positioned")(function (id, comp) {
                var sprite = sprites[id];
                updateFrame(sprite, comp);
                updatePosition(sprite, comp);
            });
        }
    };
});
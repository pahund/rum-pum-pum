/**
 * spriteManager.js
 *
 * Stores all sprites that represent entities on the stage. Provides initialization logic that creates all the sprites
 * from the world and update logic that changes the sprites according to changes in the world.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 14/12/14
 */
define(function (require) {
    "use strict";

    var PIXI = require("pixi"),
        stage = require("../game/stage"),
        world = require("../game/world"),
        sprites = {};

    function addSprite() {
        var texture,
            sprite,
            id,
            components;

        if (arguments.length === 1) {
            id = arguments[0].id;
            components = arguments[1].components;
        }
        else if (arguments.length === 2) {
            id = arguments[0];
            components = arguments[1];
        }
        else {
            throw new Error("invalid number of arguments for addSprite function: " + arguments.length);
        }

        texture = PIXI.Texture.fromFrame(components.textured.image);
        sprite = new PIXI.Sprite(texture);
        if (components.positioned) {
            sprite.position = components.positioned.coordinates;
            sprite.scale = components.positioned.scale;
            sprite.anchor = components.positioned.anchor;
        } else {
            // if the sprite is not positioned, it is hidden (out of visible viewport)
            sprite.position = new PIXI.Point(-10000, 0);
        }
        sprites[id] = stage.addChild(sprite);
        return sprite;
    }

    function removeSprite(id) {
        stage.removeChild(sprites[id]);
        delete sprites[id];
    }

    function updateFrame(sprite, comp) {
        sprite.texture = PIXI.Texture.fromFrame(comp.textured.image);
    }

    function updatePosition(sprite, comp) {
        sprite.position = comp.positioned.coordinates;
    }

    return {
        init: function () {
            world.forEachEntityWithComponents("textured")(addSprite);
        },

        add: function (id) {
            addSprite(world.getEntity(id));
        },

        update: function () {
            world.forEachEntityWithComponents("textured", "positioned")(function (id, comp) {
                var sprite = sprites[id];
                if (sprite === undefined) {
                    sprite = addSprite(id, comp);
                }
                updateFrame(sprite, comp);
                updatePosition(sprite, comp);
            });
            $.each(sprites, function (id) {
                if (!world.hasEntity(id)) {
                    removeSprite(id);
                }
            });
        }
    };
});

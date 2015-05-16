/**
 * spriteManager.js
 *
 * Stores all sprites that represent entities on the stage. Provides initialization logic that creates all the sprites
 * from the world and update logic that changes the sprites according to changes in the world.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 14 Dec 2014
 */
import PIXI from "pixi";
import stage from "../game/stage";
import world from "../game/world";

const sprites = {};

function addSprite() {
    let texture,
        sprite,
        id,
        components;

    if (arguments.length === 1) {
        id = arguments[0].id;
        components = arguments[1].components;
    }
    else {
        id = arguments[0];
        components = arguments[1];
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

export default {
    init() {
        world.forEachEntityWithComponents("textured")(addSprite);
    },

    add(id) {
        addSprite(world.getEntity(id));
    },

    update() {
        world.forEachEntityWithComponents("textured", "positioned")((id, comp) => {
            let sprite = sprites[id];
            if (sprite === undefined) {
                sprite = addSprite(id, comp);
            }
            updateFrame(sprite, comp);
            updatePosition(sprite, comp);
        });
        $.each(sprites, id => {
            if (!world.hasEntity(id)) {
                removeSprite(id);
            }
        });
    }
};

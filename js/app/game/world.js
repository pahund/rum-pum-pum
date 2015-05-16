/**
 * world.js
 *
 * The "world" object is the central manager for all entities. Created and returned as a singleton.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 14 Dec 2014
 */
import $ from "jquery";
import futureEvents from "../util/futureEvents";

let entities = {};

function hasEntity(entityId) {
    return entities.hasOwnProperty(entityId);
}

function hasComponent(entityId, componentId) {
    return entities[entityId].hasOwnProperty(componentId);
}

const world = {
    forEachEntityWithComponents(...needles) {
        return callback => {
            $.each(entities, (id, haystack) => {
                let applicable = true;
                $.each(needles, (index, needle) => {
                    if (haystack[needle] === undefined) {
                        applicable = false;
                        return false;
                    }
                });
                if (!applicable) {
                    return;
                }
                callback.call({
                    id,
                    components: haystack
                }, id, haystack);
            });
        };
    },

    addEntity(entityId, components) {
        if (hasEntity(entityId)) {
            throw new Error("Attempted to add entity " + entityId + ", which is already registered");
        }
        let entity = {};
        $.each(components, (index, component) => {
            entity[component.id] = component;
        });
        entity.cleanup = futureEvents.on("cleanup-" + entityId);
        entities[entityId] = entity;
    },

    removeEntity(entityId) {
        if (!hasEntity(entityId)) {
            throw new Error("Attempted to remove entity " + entityId + ", which is not registered");
        }
        futureEvents.fire("cleanup-" + entityId);
        delete entities[entityId];
    },

    addComponent(entityId, component) {
        if (!hasEntity(entityId)) {
            throw new Error("Attempted to add component " + component.id + " to unknown entity " + entityId);
        }
        let components = entities[entityId];
        if (hasComponent(entityId, component.id)) {
            throw new Error("Attempted to add component " + component.id + " to entity " + entityId + ", which " +
                    "has already been added to that entity");
        }
        components[component.id] = component;
    },

    setComponent(entityId, component) {
        if (!hasEntity(entityId)) {
            throw new Error("Attempted to set component " + component.id + " of unknown entity " + entityId);
        }
        let components = entities[entityId];
        if (!hasComponent(entityId, component.id)) {
            throw new Error("Attempted to set component " + component.id + " of entity " + entityId + ", which " +
                    "does not have that component");
        }
        components[component.id] = component;
    },

    hasComponent,

    hasEntity,

    getEntity(id) {
        if (!hasEntity(id)) {
            throw new Error("Attempted to get entity " + id + ", which does not exist");
        }
        let components = entities[id];
        return { id, components };
    },

    getComponentOfEntity(entityId, componentId) {
        if (!hasEntity(entityId)) {
            throw new Error("Attempted to get component " + componentId + " from non-existent entity " + entityId);
        }
        if (!hasComponent(componentId)) {
            throw new Error("Attempted to get component " + componentId + " from entity " + entityId + ", which the " +
                    "entity does not have");
        }
        return entities[entityId][componentId];
    },

    getComponentsById(componentId) {
        return $.map(entities, components => {
            let component = components[componentId];
            if (component !== undefined) {
                return component;
            }
        });
    },

    getEntitiesByComponent(componentId) {
        return $.map(entities, (components, entityId) => {
            if (components[componentId] === undefined) {
                return undefined;
            }
            return {
                id: entityId,
                components
            };
        });
    },

    getEntitiesByComponents(...args) {
        return $.map(entities, (components, entityId) => {
            let applicable = true;
            $.each(args, (index, arg) => {
                if (components[arg] === undefined) {
                    applicable = false;
                    return false;
                }
            });
            if (!applicable) {
                return undefined;
            }
            return {
                id: entityId,
                components
            };
        });
    },

    getEntityIdByCoordinates(x, y) {
        let entityId;
        $.each(entities, (id, components) => {
            let positioned = components.positioned;
            if (positioned === undefined) {
                return true; // continue iteration
            }
            if (positioned.coordinates.x === x && positioned.coordinates.y === y) {
                entityId = id;
                return false; // break iteration
            }
        });
        return entityId;
    }
};

export default world;

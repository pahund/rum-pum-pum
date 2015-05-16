/**
 * world.js
 *
 * The "world" object is the central manager for all entities. Created and returned as a singleton.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 14 Dec 2014
 */
import $ from "jquery";

let entities = {};

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
        if (entities[entityId] !== undefined) {
            throw new Error("Attempted to add entity " + entityId + ", which is already registered");
        }
        entities[entityId] = {};
        $.each(components, (index, component) => {
            entities[entityId][component.id] = component;
        });
    },

    removeEntity(entityId) {
        if (entities[entityId] === undefined) {
            throw new Error("Attempted to remove entity " + entityId + ", which is not registered");
        }
        delete entities[entityId];
    },

    addComponent(entityId, component) {
        let components = entities[entityId];
        if (components === undefined) {
            throw new Error("Attempted to add component " + component.id + " to unknown entity " + entityId);
        }
        if (components[component.id] !== undefined) {
            throw new Error("Attempted to add component " + component.id + " to entity " + entityId + ", which " +
                    "has already been added to that entity");
        }
        components[component.id] = component;
    },

    setComponent(entityId, component) {
        let components = entities[entityId];
        if (components === undefined) {
            throw new Error("Attempted to set component " + component.id + " of unknown entity " + entityId);
        }
        if (components[component.id] === undefined) {
            throw new Error("Attempted to set component " + component.id + " of entity " + entityId + ", which " +
                    "does not have that component");
        }
        components[component.id] = component;
    },

    hasComponent(entityId, componentId) {
        return entities[entityId][componentId] !== undefined;
    },

    hasEntity(entityId) {
        return entities[entityId] !== undefined;
    },

    getEntity(entityId) {
        let components = entities[entityId];
        if (components === undefined) {
            throw new Error("Attempted to get entity " + entityId + ", which does not exist");
        }
        return {
            id: entityId,
            components
        };
    },

    getComponentOfEntity(entityId, componentId) {
        let component = entities[entityId][componentId];
        if (component === undefined) {
            throw new Error("Attempted to get component " + componentId + " from entity " + entityId + ", which the " +
                    "entity does not have");
        }
        return component;
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

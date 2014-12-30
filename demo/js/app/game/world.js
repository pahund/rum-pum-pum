/**
 * world.js
 *
 * The "world" object is the central manager for all entities. Created and returned as a singleton.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 14/12/14
 */
define(function (require) {
    "use strict";

    var $ = require("jquery"),
        entities = {};

    return {
        forEachEntityWithComponents: function () {
            var needles = arguments;
            return function(callback) {
                $.each(entities, function (id, haystack) {
                    var applicable = true;
                    $.each(needles, function () {
                        if (haystack[this] === undefined) {
                            applicable = false;
                            return false;
                        }
                    });
                    if (!applicable) {
                        return;
                    }
                    callback.call({
                        id: id,
                        components: haystack
                    }, id, haystack);
                });
            };
        },

        addEntity: function (entityId, components) {
            if (entities[entityId] !== undefined) {
                throw new Error("Attempted to add entity " + entityId + ", which is already registered");
            }
            entities[entityId] = {};
            $.each(components, function () {
                entities[entityId][this.id] = this;
            });
        },

        addComponent: function (entityId, component) {
            var components = entities[entityId];
            if (components === undefined) {
                throw new Error("Attempted to add component " + component.id + " to unknown entity " + entityId);
            }
            if (components[component.id] !== undefined) {
                throw new Error("Attempted to add component " + component.id + " to entity " + entityId + ", which " +
                        "has already been added to that entity");
            }
            components[component.id] = component;
        },

        addComponents: function (entityId, components) {
            $.each(components, function () {
                this.addComponent(entityId, this);
            });
        },

        setComponent: function (entityId, component) {
            var components = entities[entityId];
            if (components === undefined) {
                throw new Error("Attempted to set component " + component.id + " of unknown entity " + entityId);
            }
            if (components[component.id] === undefined) {
                throw new Error("Attempted to set component " + component.id + " of entity " + entityId + ", which " +
                        "does not have that component");
            }
            components[component.id] = component;
        },

        hasComponent: function (entityId, componentId) {
            return entities[entityId][componentId] !== undefined;
        },

        getEntity: function (entityId) {
            var components = entities[entityId];
            if (components === undefined) {
                throw new Error("Attempted to get entity " + entityId + ", which does not exist");
            }
            return {
                id: entityId,
                components: components
            };
        },

        getComponentOfEntity: function (entityId, componentId) {
            var component = entities[entityId][componentId];
            if (component === undefined) {
                throw new Error("Attempted to get component " + componentId + " from entity " + entityId + ", which the " +
                        "entity does not have");
            }
            return component;
        },

        getComponentsById: function (componentId) {
            return $.map(entities, function (components) {
                var component = components[componentId];
                if (component !== undefined) {
                    return component;
                }
            });
        },

        getEntitiesByComponent: function (componentId) {
            return $.map(entities, function (components, entityId) {
                if (components[componentId] === undefined) {
                    return;
                }
                return {
                    id: entityId,
                    components: components
                };
            });
        },

        getEntitiesByComponents: function () {
            var args = arguments;
            return $.map(entities, function (components, entityId) {
                var applicable = true;
                $.each(args, function () {
                    if (components[this] === undefined) {
                        applicable = false;
                        return false;
                    }
                });
                if (!applicable) {
                    return;
                }
                return {
                    id: entityId,
                    components: components
                };
            });

        }
    };
});
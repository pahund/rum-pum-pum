/**
 * proximityDetector.js
 *
 * A system that detects if a trigger component moves past a listener component and triggers a callback when the
 * detection is successful.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 15/12/14
 */
define(function (require) {
    "use strict";

    var world = require("app/game/world"),
        nest = require("app/util/nest"),
        iterate = require("app/util/iterate"),
        registry = require("app/util/registry")();

    function getDistance(ent1, ent2) {
        var h = ent2.components.positioned.coordinates.x - ent1.components.positioned.coordinates.x,
            v = ent2.components.positioned.coordinates.y - ent1.components.positioned.coordinates.y;
        return {
            dist: {
                h: h < 0 ? h * -1 : h,
                v: v < 0 ? v * -1 : v
            },
            dir: {
                h: h < 0 ? -1 : 1,
                v: v < 0 ? -1 : 1
            }
        };
    }

    function getRequiredHits(ent) {
        var hasH = ent.components.proximityTrigger.horizontal,
            hasV = ent.components.proximityTrigger.vertical,
            h = 0;

        if (hasH) {
            h++;
        }
        if (hasV) {
            h++;
        }
        return h;
    }

    function getActualHits(ent, d1, d2) {
        var hasH = ent.components.proximityTrigger.horizontal,
            hasV = ent.components.proximityTrigger.vertical,
            threshold = ent.components.proximityTrigger.threshold,
            h = 0;

        if (hasH && d1.dir.h !== d2.dir.h && d1.dist.h < threshold && d2.dist.h < threshold) {
            h++;
            if (hasV && d1.dist.v < threshold && d2.dist.v < threshold) {
                h++;
            }
        } else if (hasV && d1.dir.v !== d2.dir.v && d1.dist.v < threshold && d2.dist.v < threshold) {
            h++;
            if (hasH && d1.dist.h < threshold && d2.dist.h < threshold) {
               h++;
            }
        }
        return h;
    }

    function proximity(trigger, listener) {
        var d1 = getDistance(trigger, listener);
        return function () {
            var d2 = getDistance(trigger, listener),
                requiredHits = getRequiredHits(trigger),
                actualHits = getActualHits(trigger, d1, d2);

            // it does not make sense to have a prox trigger that has neither horizontal nor vertial triggering enabled
            if (requiredHits === 0) {
                throw new Error("Proximity trigger component for entity " + trigger.id +
                        " does not have any directions enabled");
            }

            if (requiredHits === actualHits) {
                listener.components.proximityListener.action(trigger, listener);
            }
            d1 = d2;
        };
    }

    return function () {
        var triggerIt = iterate(world.getEntitiesByComponents("proximityTrigger", "positioned")),
            listenerIt = iterate(world.getEntitiesByComponent("proximityListener", "positioned"));

        nest(triggerIt, listenerIt, function (trigger, listener) {
            var key = trigger.id + ">" + listener.id,
                constructor;

            constructor = function () {
                return proximity(trigger, listener);
            };

            registry.call(key, constructor);
        });
    };
});
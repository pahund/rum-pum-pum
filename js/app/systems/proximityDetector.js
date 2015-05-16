/**
 * proximityDetector.js
 *
 * A system that detects if a trigger component moves past a listener component and triggers a callback when the
 * detection is successful.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 15/12/14
 */
import world from "../game/world";
import nest from "../util/nest";
import iterate from "../util/iterate";
import registryf from "../util/registry";

const registry = registryf();

function getDistance(ent1, ent2) {
    let h = ent2.components.positioned.coordinates.x - ent1.components.positioned.coordinates.x,
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
    let hasH = ent.components.proximityTrigger.horizontal,
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
    let hasH = ent.components.proximityTrigger.horizontal,
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
    let d1 = getDistance(trigger, listener);
    return () => {
        let d2 = getDistance(trigger, listener),
            requiredHits = getRequiredHits(trigger),
            actualHits = getActualHits(trigger, d1, d2);

        // it does not make sense to have a prox trigger that has neither horizontal nor vertical triggering enabled
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

export default () => {
    let triggerIt = iterate(world.getEntitiesByComponents("proximityTrigger", "positioned")),
        listenerIt = iterate(world.getEntitiesByComponent("proximityListener", "positioned"));

    nest(triggerIt, listenerIt, (trigger, listener) => {
        let key = trigger.id + ">" + listener.id,
            constructor = () => proximity(trigger, listener);

        registry.call(key, constructor);
    });
};

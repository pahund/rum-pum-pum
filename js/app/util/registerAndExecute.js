/**
 * registerAndExecute.js
 *
 * Basic utility function for systems; manages a map of entity IDs and callback functions and creates a function that
 * executes the callback for a specified entity ID, passing the specified components to the callback. An optional
 * condition function can be used to manage the execution - if the condition returns true, the callback if executed,
 * otherwise it is removed from the map.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 17/12/14
 */
import $ from "jquery";
import world from "../game/world";

/**
 * Creates the register and execute function.
 *
 * @param {function} Callback function (required)
 * @param {function} Condition function (optional)
 * @param {string} Component IDs (variable number of arguments, at least 1)
 * @return {function} The register and execute function, which accepts an entity ID and map of components as arguments
 */
function registerAndExecute() {
    const slice = Array.prototype.slice,
        registry = world.getWorldRegistry(),
        callback = arguments[0],
        hasCondition = typeof arguments[1] === "function",
        condition = hasCondition ? arguments[1] : () => true,
        compIds = slice.call(arguments, hasCondition ? 2 : 1);

    return (id, comp) => {
        let c = [];
        $.each(compIds, (index, compId) => {
            c.push(comp[compId]);
        });
        if (!condition.apply(null, c)) {
            registry.remove(id);
            return;
        }
        registry.call(id, () => callback.apply(null, c));
    };
}

export default registerAndExecute;

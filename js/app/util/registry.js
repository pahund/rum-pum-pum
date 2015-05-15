/**
 * registry.js
 *
 * Returns a function that manages a map of keys and items.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 19/12/14
 */
function registry(maxItems, garbageCollect) {
    let reg = {},
        count = 0;

    function addItem(key, constructor) {
        let item = constructor();
        reg[key] = item;
        count++;
        if (count > maxItems && typeof garbageCollect === "function") {
            garbageCollect(reg);
            count = Object.keys(reg).length;
        }
        return item;
    }

    if (maxItems === undefined) {
        maxItems = 100;
    }

    return {
        get(key, constructor) {
            let item = reg[key] || addItem(key, constructor);
            return item;
        },

        call(key, constructor) {
            this.get(key, constructor)();
        },

        remove(key) {
            delete reg[key];
        }
    };
}

export default registry;

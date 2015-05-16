/**
 * registry.js
 *
 * Returns a function that manages a map of keys and functions.
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 19 Dec 2014
 */
function registry() {
    const reg = {};

    /**
     * Removes an item from the registry.
     * @param key The key under which the item is registered
     */
    function removeItem(key) {
        delete reg[key];
    }

    /**
     * Adds a new item to the registry.
     * @param key The key under which the item is registered
     * @param constructor A factory function that creates the item
     * @param cleanup A promise that causes the item to be removed from the registry when the promise is resolved (optional)
     * @returns {*}
     */
    function addItem(key, constructor, cleanup) {
        if (constructor === undefined) {
            throw new Error("key " + key + " is not registered and no constructor was provided to create it");
        }
        let item = constructor();
        reg[key] = item;
        if (cleanup !== undefined) {
            cleanup.then(() => removeItem(key));
        }
        return item;
    }

    return {
        get(key, constructor, cleanup) {
            return reg[key] || addItem(key, constructor, cleanup);
        },

        call(key, constructor, cleanup) {
            this.get(key, constructor, cleanup)();
        },

        remove: removeItem,

        getSize() {
            return Object.keys(reg).length;
        },

        has(key) {
            return reg.hasOwnProperty(key);
        }
    };
}

export default registry;

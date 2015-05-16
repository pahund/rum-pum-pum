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

    function addItem(key, constructor) {
        if (constructor === undefined) {
            throw new Error("key " + key + " is not registered and no constructor was provided to create it");
        }
        let item = constructor();
        reg[key] = item;
        return item;
    }

    return {
        get(key, constructor) {
            return reg[key] || addItem(key, constructor);
        },

        call(key, constructor) {
            this.get(key, constructor)();
        },

        remove(key) {
            delete reg[key];
        },

        getSize() {
            return Object.keys(reg).length;
        }
    };
}

export default registry;

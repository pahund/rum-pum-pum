/**
 * clone.js
 *
 * @author <a href="https://github.com/pahund">Patrick Hund</a>
 * @since 19 Dec 2014
 * @see http://stackoverflow.com/questions/728360/most-elegant-way-to-clone-a-javascript-object
 */
import $ from "jquery";

function clone(obj) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    // if the object has its own clone method, use this (e.g. PIXI.Rectangle, PIXI.Point)
    if (typeof obj.clone === "function") {
        return obj.clone();
    }

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        $.each(obj, (index, value) => copy[index] = clone(value));
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        $.each(obj, (name, value) => copy[name] = clone(value));
        return copy;
    }

    throw new Error("Unable to clone object; type " + (typeof obj) + " is not supported");
}

export default clone;


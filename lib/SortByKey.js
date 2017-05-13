/**
 * Provide the sortByKey functions, and ability to attach to the Array and
 * Object classes.
 *
 * @author Orgun109uk <orgun109uk@gmail.com>
 */

'use strict';

/**
 * Sort an array by the provided key.
 *
 * @param {Array} data The array to sort.
 * @param {string} key The key to use for sorting.
 * @param {boolean} [reverse=false] - Reverse the order.
 */
function arraySortByKey(data, key, reverse) {
    data.sort((a, b) => {
        const aw = a[key] !== undefined ? (
            typeof a[key] === 'function' ?
            parseInt(a[key](), 10) :
            parseInt(a[key], 10)
        ) : 0;
        const bw = b[key] !== undefined ? (
            typeof b[key] === 'function' ?
            parseInt(b[key](), 10) :
            parseInt(b[key], 10)
        ) : 0;

        if (aw === bw) {
            return 0;
        }

        return reverse !== true && aw < bw ? -1 : 1;
    });
}

/**
 * Sort an object by the provided key.
 *
 * @param {Array} data The object to sort.
 * @param {String} key The key to use for sorting.
 * @param {boolean} [reverse=false] Reverse the order.
 */
function objectSortByKey(data, key, reverse) {
    let keys = Object.keys(data);
    keys.sort((a, b) => {
        const aw = data[a][key] !== undefined ? parseInt(data[a][key], 10) : 0;
        const bw = data[b][key] !== undefined ? parseInt(data[b][key], 10) : 0;
        if (aw === bw) {
            return 0;
        }

        return reverse !== true && aw < bw ? -1 : 1;
    });

    keys.forEach((key) => {
        const value = data[key];
        delete data[key];
        data[key] = value;
    });
}

/**
 * Sort an array or object by the provided key.
 *
 * This can also be accessed via Array.sortBy() or Object.sortBy().
 *
 * @param {Object|Array} obj The object to sort.
 * @param {string} key The key to use for sorting.
 * @param {boolean} [reverse=false] Reverse the order.
 */
module.exports = function(obj, key, reverse) {
    if (obj instanceof Array) {
        arraySortByKey(obj, key, reverse);
    } else {
        objectSortByKey(obj, key, reverse);
    }
};

/**
 * Attach the sortByKey methods to the Array and Object classes.
 */
module.exports.attach = function() {
    /* eslint-disable */
    Array.sortByKey = arraySortByKey;
    Array.prototype.sortByKey = function(key, reverse) {
        Array.sortByKey(this, key, reverse);
    };

    Object.sortByKey = objectSortByKey;
    Object.prototype.sortByKey = function(key, reverse) {
        Object.sortByKey(this, key, reverse);
    };
    /* eslint-enable */
};

var map = new WeakMap();
var index = 0;

export const weakKey = (obj: object): string => {
    var key = map.get(obj)

    if (!key) {
        key = 'weak-key-' + index++;
        map.set(obj, key)
    }

    return key
}
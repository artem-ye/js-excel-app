export function capitalize(str) {
    if (typeof str !== 'string') {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function storage(key, data = null) {
    if (!data) { // getter mode
        return JSON.parse(localStorage.getItem(key));
    } else { // setter mode
        localStorage.setItem(key, JSON.stringify(data));
    }
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    return a === b;
}


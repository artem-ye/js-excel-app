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

export function camelToDashCase(str) {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles={}) {
    return Object.keys(styles)
        .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
        .join('; ');
}

export function preventDefault(event) {
    event.preventDefault();
}

export function debounce(fn, wait) {
    let timeout;

    return function(...args) {
        // eslint-disable-next-line
        const context = this;
        const later = () => {
            clearTimeout(timeout);
            fn.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

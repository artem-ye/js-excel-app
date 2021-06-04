class Dom {
    constructor(selector) {
        this.$el = (typeof selector === 'string')
            ? document.querySelector(selector)
            : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    text(text) {
        // Setter mode
        if (typeof text != 'undefined') {
            this.$el.textContent = text;
            return this;
        }
        // Getter mode
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim();
        } else {
            return this.$el.textContent.trim();
        }
    }

    clear() {
        this.html('');
        return this;
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el;
        }
        if (Element.prototype.append) {
            this.$el.append(node);
        } else {
            this.$el.appendChild(node);
        }
        return this;
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback);
        return this;
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback);
        return this;
    }

    find(selector) {
        return $(this.$el.querySelector(selector));
    }

    get data() {
        return this.$el.dataset;
    }

    closest(selector) {
        return $(this.$el.closest(selector));
    }

    getCoords() {
        return this.$el.getBoundingClientRect();
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector);
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => this.$el.style[key] = styles[key]);
        return this;
    }

    getStyles(styles=[]) {
        return styles.reduce((res, s) => {
            res[s] = this.$el.style[s];
            return res;
        }, {});
    }

    addClass(className) {
        this.$el.classList.add(className);
        return this;
    }

    removeClass(className) {
        this.$el.classList.remove(className);
        return this;
    }

    cellid(parse) {
        if (parse) {
            const [rowid, colid] = this.cellid().split(':').map((e) => +e);
            return {
                rowid,
                colid
            };
        }
        return this.data.cellid;
    }

    focus() {
        this.$el.focus();
        return this;
    }

    attr(name, value) {
        if (value) {
            this.$el.setAttribute(name, value);
            return this;
        }
        return this.$el.getAttribute(name);
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes) => {
    const el = document.createElement(tagName);

    if (classes) {
        el.classList.add(classes);
    }

    return $(el);
};

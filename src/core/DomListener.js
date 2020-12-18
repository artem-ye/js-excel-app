import { capitalize } from './utils';

export class DomListener {
    constructor($root, listeners=[], name) {
        if (!$root) {
            throw new Error('No $root provided for DomListner');
        }

        this.$root = $root;
        this.listeners = listeners;
        this.name = name;
        this.listenersHandlers = {};
    }

    initDomListeners() {
        this.listeners.forEach(listener => {
            // const methodName = getEventHandlerMethodName(listener);
            // if (!this[methodName]) {
            //     const thisClassName = this.name;
            //     throw new Error(`Method ${methodName} is not implemented in ${thisClassName} component`);
            // }
            // this[methodName] = this[methodName].bind(this);
            // this.$root.on(listener, this[methodName]);
            this.$root.on(listener, this.getListenerHandler(listener));
        });
    }

    removeDomListeners() {
        this.listeners.forEach(listener =>
            this.$root.off(listener, this.getListenerHandler(listener))
        );
    }

    getListenerHandler(eventName) {
        const methodName = 'on' + capitalize(eventName);

        if (! this.listenersHandlers[methodName]) {
            if (!this[methodName]) {
                throw new Error(`Method ${methodName} is not implemented in ${this.name} component`);
            }

            this.listenersHandlers[methodName] = this[methodName].bind(this);
        }

        return this.listenersHandlers[methodName];
    }
}

// function getEventHandlerMethodName(eventName) {
//     return 'on' + capitalize(eventName);
// }

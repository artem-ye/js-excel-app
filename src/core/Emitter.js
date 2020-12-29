export class Emitter {
    constructor() {
        this.listeners = {};
    }

    // dispatch, fire, trigger
    // emit listeners
    emit(event, ...args) {
        if (! Array.isArray( this.listeners[event])) {
            return false;
        }

        this.listeners[event].forEach(callback =>
            callback(...args)
        );

        return true;
    }

    // on, listen
    // returns unsubscribe callback (pseudo destructor)
    subscribe(event, callback) {
        // this.listeners[event] = this.listeners[event] || [];
        if (! this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);

        // Return unsubscribe callback
        return () => {
            this.listeners[event] = this.listeners[event]
                .filter(listener => listener !== callback);
        };
    }
}

// *************************************************************************
// Usage example
// *************************************************************************

// const emitter = new Emitter();
// const unsub = emitter.subscribe('test-event', data => console.log(data));
// emitter.emit('test-event', 'Go emitter');
// emitter.emit('test-event-2', 'This message never be displayed');

// setTimeout(() => {
//     emitter.emit('test-event', 'Go emitter 2 seconds later');
// }, 2000);

// setTimeout(() => {
//     // emitter.emit('test-event', 'Go emitter 2 seconds later');
//     unsub();
//     console.log('Unsubscribed');
// }, 3000);

// setTimeout(() => {
//     emitter.emit('test-event', 'Go emitter 4 seconds later');
// }, 4000);

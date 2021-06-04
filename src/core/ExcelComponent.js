import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options={}) {
        super($root, options.listeners, options.name || 'ExcelComponent');
        this.prepare();

        this.emitter = options.emitter;
        this.emitterUnSubscribers = [];

        this.storeSubscriptions = options.storeSubscriptions || [];
        this.store = options.store;
        this.storeSub = null;
    }

    // Pre init component settings
    prepare() { }

    init() {
        this.initDomListeners();
    }

    toHTML() {
        return '';
    }

    // Emit event subscribers
    $emit(event, ...args) {
        this.emitter.emit(event, ...args);
    }

    // Subscribe to event
    $on(event, eventHandler) {
        const unsub = this.emitter.subscribe(event, eventHandler);
        this.emitterUnSubscribers.push(unsub);
    }

    // Pure REDUX
    $dispatch(action) {
        this.store.dispatch(action);
    }

    onStoreUpdate() {}

    isStoreWatching(key) {
        return this.storeSubscriptions.includes(key);
    }

    // // Pure REDUX
    // $subscribe(fn) {
    //     this.storeSub = this.store.subscribe(fn);
    // }

    destroy() {
        this.removeDomListeners();
        this.emitterUnSubscribers.forEach(unsub => unsub());
        // this.storeSub.unsubscribe();
    }
}


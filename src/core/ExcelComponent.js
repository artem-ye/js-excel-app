import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options={}) {
        super($root, options.listeners, options.name || 'ExcelComponent');
        this.prepare();
        this.emitter = options.emitter;
        this.emitterUnSubscribers = [];
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

    destroy() {
        this.removeDomListeners();
        this.emitterUnSubscribers.forEach(unsub => unsub());
    }
}


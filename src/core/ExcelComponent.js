import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
    constructor($root, options={}) {
        super($root, options.listeners, options.name || 'ExcelComponent');
        // this.name = options.name || 'ExcelComponent';
    }

    toHTML() {
        return '';
    }

    init() {
        this.initDomListeners();
    }

    destroy() {
        this.removeDomListeners();
    }
}

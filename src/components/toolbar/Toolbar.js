import { defaultCellStyle } from '../../constants';
import { $ } from '../../core/dom';
import { ExcelStateComponent } from '../../core/ExcelStateComponent';
import { createToolbar } from './toolbar.template';

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            storeSubscriptions: ['currentStyles'],
            ...options
        });
    }

    prepare() {
        this.initState(defaultCellStyle);
    }

    get template() {
        return createToolbar(this.state);
    }

    toHTML() {
        return this.template;
    }

    onStoreUpdate(changes) {
        this.setState(changes.currentStyles);
    }

    onClick(event) {
        const $target = $(event.target);

        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value);
            this.$emit('toolbar:applyStyle', value);
        }
    }
}

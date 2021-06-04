import { ExcelComponent } from '@core/ExcelComponent';
import { $ } from '../../core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';

    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            storeSubscriptions: ['currentText'],
            ...options
        });
    }

    init() {
        super.init();

        this.$formula = this.$root.find('#formula');

        this.$on('table:select', $cell => {
            this.$formula.text($cell.data.value);
        });
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id= "formula" class="input" contenteditable spellcheck="false"></div>
        `;
    }

    onInput(event) {
        const text = $(event.target).text();
        this.$emit('formula:input', text);
    }

    onKeydown(event) {
        const {key} = event;
        const keys = ['Enter', 'Tab'];

        if (keys.includes(key)) {
            event.preventDefault();
            this.$emit('formula:done', null);
        }
    }

    onStoreUpdate({currentText}) {
        this.$formula.text( currentText );
    }
}

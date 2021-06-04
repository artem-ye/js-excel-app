import { ExcelComponent } from '@core/ExcelComponent';
import { defaultTextTitle } from '../../constants';
import { $ } from '../../core/dom';
import { debounce } from '../../core/utils';
import * as actions from '../../redux/actions';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300);
    }

    toHTML() {
        const title = this.store.getState().titleText || defaultTextTitle;
        return `
        <input type="text" class="input" value="${title}"/>
                
        <div>                    
            <div class="button">
                <span class="material-icons">delete</span>
            </div>
            <div class="button">
                <span class="material-icons">exit_to_app</span>
            </div>
        </div>
        `;
    }

    onInput(event) {
        console.log('On input');
        const titleText = $(event.target).text();
        this.$dispatch(actions.changeTitle(titleText));
    }
}

import { ExcelComponent } from '@core/ExcelComponent';
import { defaultTextTitle } from '../../constants';
import { $ } from '../../core/dom';
import { ActiveRoute } from '../../core/routes/ActiveRoute';
import { debounce } from '../../core/utils';
import * as actions from '../../redux/actions';

export class Header extends ExcelComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
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
            <div class="button" data-button="remove">
                <span class="material-icons" data-button="remove">delete</span>
            </div>
            <div class="button" data-button="exit">
                <span class="material-icons" data-button="exit">exit_to_app</span>
            </div>
        </div>
        `;
    }

    onInput(event) {
        const titleText = $(event.target).text();
        this.$dispatch(actions.changeTitle(titleText));
    }

    onClick(event) {
        const buttonData = $(event.target).data.button;

        if (buttonData === 'remove') {
            const decision = confirm('Удалить таблицу?');

            if (decision) {
                localStorage.removeItem('excel:'+ActiveRoute.param);
                ActiveRoute.navigate('');
            }
        } else if (buttonData === 'exit') {
            ActiveRoute.navigate('');
        }
    }
}

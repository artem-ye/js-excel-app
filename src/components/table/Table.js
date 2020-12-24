import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resizer';
import { isCell, isGroupSeletion, isResizer } from './table.functions';
import { TableSelection } from './TableSelection';
import { $ } from '../../core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable(35);
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();

        const $defaultSelectedCell = this.$root.find('[data-cellid="0:0"]');
        this.selection.select($defaultSelectedCell);
    }

    onMousedown(event) {
        if (isResizer(event)) {
            resizeHandler(event, this.$root);
        } else if (isCell(event)) {
            if (isGroupSeletion(event)) {
                const $target = $(event.target);
                this.selection.selectGroup($target);
            } else {
                const $target = $(event.target);
                this.selection.select($target);
            }
        }
    }
}

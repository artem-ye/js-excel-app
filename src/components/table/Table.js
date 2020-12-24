import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resizer';
import { isResizeable } from './table.functions';

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

    onMousedown(event) {
        if (isResizeable(event)) {
            resizeHandler(event, this.$root);
        }
    }
}

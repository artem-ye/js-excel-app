import { ExcelComponent } from '@core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resizer';
import { isCell, isGroupSelection, isResizer, range, nextCell } from './table.functions';
import { TableSelection } from './TableSelection';
import { $ } from '../../core/dom';
import * as actions from '../../redux/actions';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        });
    }

    toHTML() {
        return createTable(35, this.store.getState());
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();
        this.selectCell( this.$root.find('[data-cellid="0:0"]') );

        this.$on('formula:input', data => {
            this.selection.$current.text(data);
            this.updateTextInStore(data);
        });

        this.$on('formula:done', () => {
            this.selection.$current.focus();
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(event, this.$root);
            this.$dispatch(actions.tableResize(data));
        } catch (e) {
            console.warn('Resize err', e.message);
        }
    }

    onMousedown(event) {
        if (isResizer(event)) {
            this.resizeTable(event);
        } else if (isCell(event)) {
            if (isGroupSelection(event)) {
                const $target = $(event.target);
                const $current = this.selection.$current;
                const $selectedCells = range($current, $target, this.$root);
                this.selection.selectGroup($selectedCells);
            } else {
                const $target = $(event.target);
                this.selectCell($target);
            }
        }
    }

    onKeydown(event) {
        if (!isCell(event)) {
            return false;
        }

        const keysMoveMap = {
            ArrowDown: 'Down',
            ArrowUp: 'Up',
            ArrowLeft: 'Left',
            ArrowRight: 'Right',
            Enter: 'Down',
            Tab: 'Right',
        };

        const {key, shiftKey} = event;
        const moveDirection = keysMoveMap[key];

        if (!shiftKey && moveDirection) {
            event.preventDefault();
            const $current = this.selection.$current;
            const $nextCell = nextCell($current, this.$root, moveDirection);
            this.selectCell($nextCell);
        }
    }

    updateTextInStore(value) {
        const id = this.selection.$current.cellid();
        this.$dispatch(actions.changeText( {id, value} ));
    }

    onInput(event) {
        // this.$emit('table:input', $(event.target));
        // console.log('ID', this.selection.$current.cellid());
        this.updateTextInStore( $(event.target).text() );
    }
}


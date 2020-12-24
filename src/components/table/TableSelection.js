// @ts-check
export class TableSelection {
    static selectedCssClass = 'selected';

    constructor() {
        this.group = [];
        this.current = null;
    }

    select($el) {
        this.clear();
        this.group.push($el);
        $el.addClass(TableSelection.selectedCssClass);
        this.current = $el;
    }

    selectGroup($target) {
        if (!this.current) {
            return false;
        }

        const current = this.current.cellid(true);
        const target = $target.cellid(true);

        console.log(current, target);
        // console.log('C', this.current.cellid(), 'T', $target.cellid(), 'Parsed', $target.cellid(true));

        // this.group.push($target);
        // $target.addClass(TableSelection.selectedCssClass);

        this.current = $target;
    }

    clear() {
        this.group.splice(0).forEach(
            $cell => $cell.removeClass(TableSelection.selectedCssClass)
        );
    }

//     selectHandler(event) {
//         /** @type Element */
//         const $cell = event.target;

//         if (this.selection.has($cell)) {
//             this.selection.delete($cell);
//         } else {
//             this.selection.forEach($el => $el.classList.toggle('selected'));
//             this.selection.clear();
//             this.selection.add($cell);
//         }

//         $cell.classList.toggle('selected');

//         // console.log(this.selection);
//         // event.target.toggle
//     }
}

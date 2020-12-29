// @ts-check
export class TableSelection {
    static selectedCssClass = 'selected';

    constructor() {
        this.$group = [];
        this.$current = null;
    }

    select($el) {
        if (!$el.$el) {
            return;
        }

        this.clear();
        this.$group.push($el);
        $el.addClass(TableSelection.selectedCssClass).focus();
        this.$current = $el;
    }

    selectGroup($group = []) {
        if (!this.$group) {
            return false;
        }

        this.clear();
        $group.forEach($cell =>
            $cell.addClass(TableSelection.selectedCssClass)
        );
        this.$group = $group;
    }

    clear() {
        this.$group.splice(0, this.$group.length).forEach(
            $cell => $cell.removeClass(TableSelection.selectedCssClass)
        );
    }
}


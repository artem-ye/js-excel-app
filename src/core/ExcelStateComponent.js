import { ExcelComponent } from './ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
    constructor(...args) {
        super(...args);
    }

    get template() {
        throw new Error('get template must be implemented in child of ExcelStateComponent class');
        // return JSON.stringify(this.state, null, 2);
    }

    initState(initialState = {}) {
        this.state = {...initialState};
    }

    setState(newState) {
        this.state = {...this.state, ...newState};
        this.$root.html(this.template);
    }
}

import { debounce } from '../utils';

export class StateProcessor {
    constructor(saver, delay=300) {
        this.saver = saver;
        this.save = debounce(this.save.bind(this), delay);
    }

    save(state) {
        this.saver.save(state);
    }

    get() {
        return this.saver.get();
    }
}

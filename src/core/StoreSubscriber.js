import { isEqual } from './utils';

export class StoreSubscriber {
    constructor(store) {
        this.store = store;
        this.subscribe = null;
        this.prevState = {};
    }

    subscribeComponents(components) {
        this.prevState = this.store.getState();
        this.subscribe = this.store.subscribe(state => {
            Object.keys(state).forEach(k => {
                if (!isEqual(this.prevState[k], state[k])) {
                    // console.log('Subscriber::Updating');
                    components.forEach(component => {
                        if (component.isStoreWatching(k)) {
                            const changes = {[k]: state[k]};
                            component.onStoreUpdate(changes);
                            // console.log('Sub upd...', k, component);
                        }
                    });
                }

                // console.log('Subscriber:', k);
            });

            this.prevState = this.store.getState();
        });
    }

    unsubscribe() {
        this.subscribe.unsubscribe();
    }
}

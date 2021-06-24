import { Page } from '../core/page/Page';

import { Excel } from '@/components/excel/Excel';
import { Formula } from '@/components/formula/Formula';
import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';

// import { storage } from '@/core/utils';
import { createStore } from '@/core/store/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { normalizeInitialState } from '../redux/initialState';
import { StateProcessor } from '../core/page/StateProcessor';
import { LocalStorageSaver } from '../shared/LocalStorageSaver';

export class ExcelPage extends Page {
    constructor(params) {
        super(params || Date.now().toString());
        this.storeSubscription = null;
        this.stateProcessor = new StateProcessor(
            new LocalStorageSaver( this.params )
        );
    }

    async getRoot() {
        const state = await this.stateProcessor.get();
        const store = createStore(rootReducer, normalizeInitialState(state));
        this.storeSubscription = store.subscribe( this.stateProcessor.save );

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store: store
        });

        return this.excel.getRoot();
    }

    afterRender() {
        this.excel.init();
    }

    destroy() {
        this.excel.destroy();
        this.storeSubscription.unsubscribe();
    }
}

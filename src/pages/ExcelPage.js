import { Page } from '../core/Page';

import { Excel } from '@/components/excel/Excel';
import { Formula } from '@/components/formula/Formula';
import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';

import { storage, debounce } from '@/core/utils';
import { createStore } from '@/core/store/createStore';
import { rootReducer } from '@/redux/rootReducer';
import { normalizeInitialState } from '../redux/initialState';

function storageName(param) {
    return `excel:${param}`;
}

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString();
        const state = storage(storageName(params));
        const store = createStore(rootReducer, normalizeInitialState(state));
        const stateListener = state => {
            storage(storageName(params), state);
        };
        store.subscribe( debounce(stateListener, 300) );

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
    }
}

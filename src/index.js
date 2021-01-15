import './scss/index.scss';

import { Excel } from './components/excel/Excel';
import { Formula } from '@/components/formula/Formula';
import { Header } from '@/components/header/Header';
import { Table } from '@/components/table/Table';
import { Toolbar } from '@/components/toolbar/Toolbar';

import { storage } from './core/utils';
import { initialState } from './redux/initialState';
import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';

const store = createStore(rootReducer, initialState);

store.subscribe(state => {
    // console.log('App state', state);
    // localStorage.setItem('excel-state', JSON.stringify(state));
    storage('excel-state', state);
});

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store: store
});

excel.render();

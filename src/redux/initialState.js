import { storage } from '../core/utils';

const defaultState = {
    rowState: {},
    colState: {},
    cellsDataState: {},
    currentText: '',
};

export const initialState = storage('excel-state') || defaultState;

import { defaultCellStyle, defaultTextTitle } from '../constants';
import { storage } from '../core/utils';

const defaultState = {
    titleText: defaultTextTitle,
    rowState: {},
    colState: {},
    cellsDataState: {},
    stylesState: {},
    currentText: '',
    currentStyles: defaultCellStyle
};

const normalize = state => ({
    ...state,
    currentStyles: defaultCellStyle,
    currentText: ''
});

export const initialState = normalize( storage('excel-state') ) || defaultState;
// export const initialState = storage('excel-state') || defaultState;

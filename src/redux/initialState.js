import { defaultCellStyle, defaultTextTitle } from '../constants';
// import { storage } from '../core/utils';

const defaultState = {
    titleText: defaultTextTitle,
    lastOpenDate: null,
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

// export const initialState = normalize( storage('excel-state') ) || defaultState;

export function normalizeInitialState(state) {
    return state ? normalize(state) : defaultState;
}

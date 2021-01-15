import { CHANGE_TEXT, TABLE_RESIZE } from './types';

export function rootReducer(state, action) {
    let prevState;
    let dataField;

    switch (action.type) {
        case TABLE_RESIZE:
            dataField = action.data.type === 'col' ? 'colState' : 'rowState';
            prevState = state[dataField] || {};
            prevState[action.data.id] = action.data.value;
            return {...state, [dataField]: prevState};

        case CHANGE_TEXT:
            prevState = state.cellsDataState || {};
            prevState[action.data.id] = action.data.value;
            return {
                ...state,
                currentText: action.data.value,
                cellsDataState: prevState
            };

        default:
            return state;
    }
}

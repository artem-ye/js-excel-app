import {
    CHANGE_TEXT,
    CHANGE_STYLES,
    TABLE_RESIZE,
    APPLY_STYLE,
    CHANGE_TITLE,
    CHANGE_LAST_OPEN_DATE
} from './types';

export function rootReducer(state, action) {
    let dataField;
    let val;

    switch (action.type) {
        case TABLE_RESIZE:
            dataField = action.data.type === 'col' ? 'colState' : 'rowState';
            return {
                ...state,
                [dataField]: value(state, dataField, action)
            };

        case CHANGE_TEXT:
            dataField = 'cellsDataState';
            return {
                ...state,
                currentText: action.data.value,
                [dataField]: value(state, dataField, action)
            };

        case CHANGE_STYLES:
            return {
                ...state,
                currentStyles: action.data
            };

        case APPLY_STYLE:
            dataField = 'stylesState';
            val = state[dataField] || {};
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value};
                // val[id] = toInlineStyles(action.data.value);
            });

            return {
                ...state,
                [dataField]: val,
                currentStyles: {...state.currentStyles, ...action.data.value}
            };

        case CHANGE_TITLE:
            dataField = 'titleText';
            return {
                ...state,
                [dataField]: action.data
            };

        case CHANGE_LAST_OPEN_DATE:
            return {
                ...state,
                lastOpenDate: action.data
            };

        default:
            return state;
    }
}

function value(state, field, action) {
    // const val = state[field] || {};
    const val = { ...state[field] };
    val[action.data.id] = action.data.value;
    return val;
}

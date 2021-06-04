// import { defaultCellStyle } from '../../constants';
import { defaultCellStyle } from '../../constants';
import { parse } from '../../core/parse';
import { toInlineStyles } from '../../core/utils';

const CODES = {
    A: 65,
    Z: 90
};

const COL_DEFAULT_WIDTH = 120;
const ROW_DEFAULT_HEIGHT = 24;

function getColWidth(colState, index) {
    return (!colState || !colState[index] ? COL_DEFAULT_WIDTH : colState[index]) + 'px';
}

function getRowHeight(rowState, index) {
    return (!rowState || !rowState[index] ? ROW_DEFAULT_HEIGHT : rowState[index]) + 'px';
}

function getCellText(cellsDataState, cellId) {
    return !cellsDataState || !cellsDataState[cellId] ? '' : cellsDataState[cellId];
}

function createRow(rowIndex, dataContent, height=ROW_DEFAULT_HEIGHT) {
    const resizer = rowIndex ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div 
            class="row" 
            data-type="resizable" 
            data-rowid="${rowIndex}" 
            style="height: ${height}">
                <div class="row-info">
                    ${rowIndex}
                    ${resizer}
                </div>
                <div class="row-data">${dataContent}</div>
        </div>
    `;
}

function toColumn({content, colId, width}) {
    return `
        <div 
            class="column" 
            data-type="resizable" 
            data-colid="${colId}" 
            style="width: ${width}"
        >
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

function toCell(state, rowId) {
    const {colState, cellsDataState, stylesState = {}} = state;

    return function(_, colId) {
        const width = getColWidth(colState, colId);
        const cellId = `${rowId}:${colId}`;
        const content = getCellText(cellsDataState, cellId);
        const styles = toInlineStyles({...defaultCellStyle, ...stylesState[cellId]});

        return `
         <div 
            class="cell"
            contenteditable="true"
            data-rowid="${rowId}"
            data-colid="${colId}"            
            data-cellid="${cellId}"
            data-type="cell"
            data-value="${content || ''}"
            style="${styles}; width: ${width}"
        >
             ${parse(content)}
         </div>
     `;
    };
}

function withWidthFrom(state) {
    return function(col, index) {
        return {
            content: col, colId: index, width: getColWidth(state, index)
        };
    };
}

export function createTable(rowsCount=15, state = {}) {
    const COLS_COUNT = CODES.Z - CODES.A + 1;
    const rows = [];
    // const {colState, rowState, cellsDataState} = state;
    const {colState, rowState} = state;

    // Header
    const cbArrIndexToColTitle = (_, index) => String.fromCharCode(CODES.A + index);

    const headerCols = new Array(COLS_COUNT).fill('')
        .map( cbArrIndexToColTitle )
        .map(withWidthFrom(colState))
        .map(toColumn)
        .join('');

    rows.push( createRow('', headerCols) );

    for (let rowIdx=0; rowIdx<rowsCount; rowIdx++) {
        const dataCols = new Array(COLS_COUNT).fill('')
            .map( toCell(state, rowIdx) )
            .join('');
        rows.push( createRow(rowIdx+1, dataCols, getRowHeight(rowState, rowIdx+1)) );
    }

    return rows.join('');
}

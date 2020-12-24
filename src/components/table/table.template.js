const CODES = {
    A: 65,
    Z: 90
};

function toCell(content, colIdx) {
    return `
        <div class="cell" contenteditable="true" data-colid="${colIdx}">
            ${content}
        </div>
    `;
}

function createRow(rowIndex, dataContent) {
    const resizer = rowIndex ? '<div class="row-resize" data-resize="row"></div>' : '';
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${rowIndex}
                ${resizer}
            </div>
            <div class="row-data">${dataContent}</div>
        </div>
    `;
}

function toColumn(content, colIdx) {
    return `
        <div class="column" data-type="resizable" data-colid="${colIdx}">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

export function createTable(rowsCount=15) {
    const COLS_COUNT = CODES.Z - CODES.A + 1;
    const rows = [];

    // Header
    const cbArrIndexToColTitle = (_, index) => String.fromCharCode(CODES.A + index);

    const headerCols = new Array(COLS_COUNT).fill('')
        .map( cbArrIndexToColTitle )
        .map( toColumn )
        .join('');

    rows.push( createRow('', headerCols) );

    // Data rows
    const dataCols = new Array(COLS_COUNT).fill('')
        .map( toCell )
        .join('');

    for (let i=0; i<rowsCount; i++) {
        rows.push( createRow(i+1, dataCols) );
    }

    return rows.join('');
}

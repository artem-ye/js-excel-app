const CODES = {
    A: 65,
    Z: 90
};

function createCell(content) {
    return `
        <div class="cell" contenteditable="true">
            ${content}
        </div>
    `;
}

function createRow(infoContent, dataContent) {
    return `
        <div class="row">
            <div class="row-info">${infoContent}</div>
            <div class="row-data">${dataContent}</div>
        </div>
    `;
}

function createCol(content) {
    return `
        <div class="column">${content}</div>
    `;
}

// function cbArrIndexToColTitle(_, index) {
//     return String.fromCharCode(CODES.A + index);
// }

export function createTable(rowsCount=15) {
    const COLS_COUNT = CODES.Z - CODES.A + 1;
    const rows = [];

    // Header
    const cbArrIndexToColTitle = (_, index) => String.fromCharCode(CODES.A + index);

    const headerCols = new Array(COLS_COUNT).fill('')
        .map( cbArrIndexToColTitle )
        .map( createCol )
        .join('');

    rows.push( createRow('', headerCols) );

    // Data rows
    const dataCols = new Array(COLS_COUNT).fill('')
        .map( createCell )
        .join('');

    for (let i=0; i<rowsCount; i++) {
        rows.push( createRow(i+1, dataCols) );
    }

    return rows.join('');
}

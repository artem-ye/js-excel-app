const CODES = {
    A: 65,
    Z: 90
};

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

function toColumn(content, colId) {
    return `
        <div class="column" data-type="resizable" data-colid="${colId}">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
}

// function toCell(content, colId, rowId) {
//     console.log(rowId, colId);
//     return `
//         <div class="cell" contenteditable="true" data-colid="${colId}" data-rowid="${rowId}">
//             ${content}
//         </div>
//     `;
// }

function toCell(rowId) {
    return function(content, colId) {
        return `
         <div 
            class="cell"
            contenteditable="true"
            data-rowid="${rowId}"
            data-colid="${colId}"            
            data-cellid="${rowId}:${colId}"
            data-type="cell"
        >
             ${content}
         </div>
     `;
    };
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

    for (let rowIdx=0; rowIdx<rowsCount; rowIdx++) {
        const dataCols = new Array(COLS_COUNT).fill('')
            // .map( (el, colIdx) => toCell(el, colIdx, rowIdx) )
            .map( toCell(rowIdx) )
            .join('');
        rows.push( createRow(rowIdx+1, dataCols) );
    }

    return rows.join('');
}

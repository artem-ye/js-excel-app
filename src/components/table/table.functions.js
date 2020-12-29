export function isResizer(event) {
    return event.target.dataset.resize;
}

export function isCell(event) {
    return (event.target.dataset.type === 'cell');
}

export function isGroupSelection(event) {
    return event.shiftKey;
}

export function range($current, $target, $root) {
    const current = $current.cellid(true);
    const target = $target.cellid(true);

    const startRowid = Math.min(current.rowid, target.rowid);
    const endRowId = Math.max(current.rowid, target.rowid);
    const startColid = Math.min(current.colid, target.colid);
    const endColId = Math.max(current.colid, target.colid);

    const $range = [];

    for (let rowid = startRowid; rowid <= endRowId; rowid++) {
        for (let colid = startColid; colid <= endColId; colid++) {
            $range.push(
                $root.find(`[data-cellid="${rowid}:${colid}"]`)
            );
        }
    }

    return $range;
}

export function nextCell($current, $root, direction) {
    let {rowid, colid} = $current.cellid(true);

    switch (direction) {
        case 'Down':
            rowid++; break;
        case 'Up':
            rowid--; break;
        case 'Left':
            colid--; break;
        case 'Right':
            colid++; break;
        default:
            break;
    }

    const $next = $root.find(`[data-cellid="${rowid}:${colid}"]`);
    return $next.$el ? $next : $current;
}

export function isResizer(event) {
    return event.target.dataset.resize;
}

export function isCell(event) {
    return (event.target.dataset.type === 'cell');
}

export function isGroupSeletion(event) {
    return event.shiftKey;
}

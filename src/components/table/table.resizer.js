import { $ } from '../../core/dom';

// onMousemove resize handler
export function resizeHandler(event, $root) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type=resizable]');
    const resizeType = $resizer.data.resize;

    // Draw vertical/horizontal line
    const resizerInitialStyleState = $resizer.$el.style;
    $resizer.css({
        'opacity': 1,
        [resizeType === 'col' ? 'height': 'width']: '100vmax'
    });

    const coords = $parent.getCoords();
    let newSize;
    document.onmousemove = (resizeType === 'col')
        // column resizer
        ? (e) => {
            const delta = e.pageX - coords.right;
            newSize = delta + coords.width;
            $resizer.css({'left': newSize + 'px'});
        }
        // row resizer
        : (e) => {
            const delta = e.pageY - coords.bottom;
            newSize = delta + coords.height;
            $resizer.css({'top': newSize + 'px'});
        };

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        $resizer.$el.style = resizerInitialStyleState;

        if (resizeType === 'col') {
            $root.findAll(`[data-colid="${$parent.data.colid}"]`)
                .forEach(cell => cell.style.width = newSize + 'px');
        } else {
            $parent.css({height: newSize + 'px'});
        }
    };
}

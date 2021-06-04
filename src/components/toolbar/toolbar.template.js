function toButton(button) {
    const meta = `
        data-type="button"
        data-value='${JSON.stringify(button.value)}'
    `;

    return `
        <div 
            class="button ${button.active ? 'active' : ''}
            ${meta}
        ">
            <span 
                class="material-icons"
                ${meta}
            >
                ${button.icon}
            </span>
        </div>`;
}

export function createToolbar(state) {
    const isBoldActive = state['fontWeight'] === 'bold';
    const isItalicActive = state['fontStyle'] === 'italic';
    const isUnderlineActive = state['textDecoration'] === 'underline';

    const buttons = [
        {
            icon: 'format_align_left',
            active: state['textAlign'] === 'left',
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            active: state['textAlign'] === 'center',
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: state['textAlign'] === 'right',
            value: {textAlign: 'right'}
        },
        {
            icon: 'format_bold',
            active: isBoldActive,
            value: {fontWeight: (isBoldActive ? 'normal' : 'bold')}
        },
        {
            icon: 'format_italic',
            active: isItalicActive,
            value: {fontStyle: isItalicActive ? 'normal' : 'italic'}
        },
        {
            icon: 'format_underline',
            active: isUnderlineActive,
            value: {textDecoration: isUnderlineActive ? 'none' : 'underline'}
        },
    ];

    return buttons.map(toButton).join('');
}

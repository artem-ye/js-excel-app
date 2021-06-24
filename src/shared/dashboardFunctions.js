import { storage } from '../core/utils';

function toHTML(key) {
    const model = storage(key);
    const modelId = key.split(':')[1];

    const time = model.lastOpenDate;
    const title = model.titleText;

    const date = new Date;
    date.setTime(time);

    return `
        <li class="db__record">
            <a href="#excel/${modelId}">${title}</a>
            <strong>${date.toLocaleDateString() +' '+date.toLocaleTimeString()}</strong>
        </li>
    `;
}

function getAllKeys() {
    const keys = [];

    for (let i=0; i<localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.startsWith('excel')) {
            continue;
        }
        keys.push(key);
    }

    return keys;
}

export function createRecordsTable() {
    const keys = getAllKeys();

    if (!keys.length) {
        return `<p>Нет сохраненных таблиц</p>`;
    }

    return `
        <div class="db__list-header">
            <span>Название таблицы</span>
            <span>Дата открытия</span>
        </div>

        <ul class="db__list">
            ${keys.map(toHTML).join('')}
        </ul>
    `;
}



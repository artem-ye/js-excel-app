/**
 * @jest-environment jsdom
 */

import { Router } from './Router';
import { Page } from '../Page';

class DashboardPage extends Page {
    getRoot() {
        const root = document.createElement('div');
        root.innerHTML ='Dashboard div EL';
        return root;
    }
}

class ExcelPage extends Page {
    getRoot() {
        const root = document.createElement('div');
        root.innerHTML ='Excel div EL';
        return root;
    }
}

describe('Router:', ()=>{
    let router;
    let $rootSelector;

    beforeEach(() => {
        $rootSelector = document.createElement('div');
        router = new Router($rootSelector, {
            dashboard: DashboardPage,
            excel: ExcelPage
        });
    });

    test('should be defined', () => {
        expect(router).toBeDefined();
    });

    test('should render Dashboard Page', () => {
        router.changePageHandler();
        expect($rootSelector.innerHTML).toBe('<div>Dashboard div EL</div>');
    });
});

import {createStore} from './createStore';

const initialState = {
    count: 0
};

const reducer = (state=0, action) => {
    if (action.type === 'ADD') {
        return {...state, count: state.count+1};
    }

    return state;
};

describe('createStore', () => {
    let store;
    let handler;

    beforeEach(() => {
        store = store = createStore(reducer, initialState);
        handler = jest.fn();
    });

    test('should return store obj', () => {
        expect(store).toBeDefined();
        expect(store.dispatch).toBeDefined();
        expect(store.subscribe).toBeDefined();
        expect(store.getState).not.toBeUndefined();
    });

    test('should return obj as state', () => {
        expect(store.getState).toBeInstanceOf(Object);
    });

    test('should return default state', () => {
        expect(store.getState()).toEqual(initialState);
    });

    test('should NOT change state if action NOT exists', () => {
        const prevState = store.getState();
        store.dispatch({type: 'NOT_EXISTING_ACTION'});
        expect(store.getState()).toEqual(prevState);
    });

    test('subscriber function must be called', () => {
        store.subscribe(handler);
        store.dispatch({type: 'ADD'});
        expect(handler).toHaveBeenCalled();
        expect(handler).toHaveBeenCalledWith(store.getState());
    });

    test('unsubscribe handler should not be called if unsubscribed', () => {
        const subscription = store.subscribe(handler);
        subscription.unsubscribe();

        store.dispatch({type: 'ADD'});
        expect(handler).not.toHaveBeenCalled();
    });

    test('async dispatch', () => {
        return new Promise(resolve => {
            setTimeout(() => {
                store.dispatch({type: 'ADD'});
            }, 100);

            setTimeout(() => {
                expect(store.getState().count).toBe(1);
                resolve();
            }, 300);
        });
    });
});

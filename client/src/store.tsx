import allReducers from './reducers';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore } from 'redux-persist';

export const store = createStore(allReducers, 
    compose(applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    ));

export const persistor = persistStore(store);
   
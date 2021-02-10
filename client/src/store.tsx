import allReducers from './reducers';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';

const store = createStore(allReducers, 
    compose(applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    ));
   
export default store;
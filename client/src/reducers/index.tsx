import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cartReducer } from './cartReducer';
import { dishReducer } from './dishReducer';
import { pathReducer } from './pathReducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

export const allReducers = combineReducers({
    user: userReducer,
    cart: cartReducer,
    dish: dishReducer,
    path: pathReducer
});

export type AppState = ReturnType<typeof allReducers>;

export default persistReducer(persistConfig, allReducers);
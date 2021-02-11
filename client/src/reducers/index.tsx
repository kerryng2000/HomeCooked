import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const allReducers = combineReducers({
    user: userReducer
});

export type AppState = ReturnType<typeof allReducers>;

export default persistReducer(persistConfig, allReducers);
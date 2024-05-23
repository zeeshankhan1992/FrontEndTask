
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import {userApi} from "./services/users"
import {loanApi} from "./services/loan"

// Combine reducers
const rootReducer = combineReducers({ 
    [userApi.reducerPath]: userApi.reducer, 
    [loanApi.reducerPath]: loanApi.reducer, 
});

// Configure Redux persist
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Redux store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
            .concat(
                userApi.middleware,
                loanApi.middleware,
            ),
});

// Create Redux persistor
export const persistor = persistStore(store);
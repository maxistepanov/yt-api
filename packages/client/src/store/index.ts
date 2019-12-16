import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createFilter, { createBlacklistFilter } from 'redux-persist-transform-filter';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

// you want to remove some keys before you save
const saveSubsetBlacklistFilter = createBlacklistFilter(
    'track',
    ['active']
);

const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        saveSubsetBlacklistFilter,
        // myFilter
    ]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
});

// then run the saga
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

export default store;

export const persistor = persistStore(store);

import { combineReducers, createStore } from 'redux'
import { collapseReducer } from './reducers/CollapseReducer'
import { LoadingReducer } from './reducers/LoadingReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'Nancy',
    storage,
   blacklist: ['LoadingStore'] //  will not be persisted
}

const reducer = combineReducers({
    collapseStore: collapseReducer,
    LoadingStore: LoadingReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)
let store = createStore(persistedReducer)
let persistor = persistStore(store)


export { store, persistor }
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import sessionReducer from './hmacToken'
import userReducer from './userinfo'
import sessionValidator from './validateSession'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import expireReducer from'redux-persist-expire';
// ...

const reducers = combineReducers({
  session: sessionReducer,
  user: userReducer,
  sessionValidator,
})

const persistedReducer = persistReducer({
  key: 'root',
  storage,
  transforms: [
    // Create a transformer by passing the reducer key and configuration. Values
    // shown below are the available configurations with default values
    expireReducer('sessionValidator', {
      // (Optional) Key to be used for the time relative to which store is to be expired
      persistedAtKey: '__persisted_at',
      // (Required) Seconds after which store will be expired
      expireSeconds: 15,
      // (Optional) State to be used for resetting e.g. provide initial reducer state
      expiredState: {value: {idValid:false}},
      // (Optional) Use it if you don't want to manually set the time in the reducer i.e. at `persistedAtKey` 
      // and want the store to  be automatically expired if the record is not updated in the `expireSeconds` time
      autoExpire: true
    })
    // You can add more `expireReducer` calls here for different reducers
    // that you may want to expire
 ]
}, reducers)

export const store = configureStore({
  reducer: persistedReducer
})
export const persistor = persistStore(store)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
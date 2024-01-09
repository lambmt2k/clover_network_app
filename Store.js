import { combineReducers, configureStore, createStore } from '@reduxjs/toolkit'
import loginReducer from "./src/features/Auth/LoginFeatures/LoginSlice"
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import userReducer from "./src/features/Auth/UserFeature/UserSlice"
import postReducer from "./src/features/Post/PostSlice"
import friendReducer from "./src/features/Friend/FriendSlice"




const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist:"login"
  
}
const userPersistConfig = {
  key: 'login',
  storage: AsyncStorage,
  whitelist: ['user','post']
}
const rootReducer = combineReducers({
  login:  persistReducer(userPersistConfig, loginReducer),
  user: userReducer,
  post: postReducer,
  friend: friendReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persistor = persistStore(store);
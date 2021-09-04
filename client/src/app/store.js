import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import productReducer from "../features/Photo/productSlice";
import filterReducer from "../features/Photo/filterSlice";
import userReducer from "../features/Auth/userSlice";
import snackbarReducer from "./snackbarSlice";
import tokenReducer from "./tokenSlice";
const rootReducer = {
  products: productReducer,
  filter: filterReducer,
  auth: userReducer,
  snackbar: snackbarReducer,
  token: tokenReducer,
};
const combine = combineReducers(rootReducer);
const persistConfig = {
  key: "root",
  storage: storage,
  version: 1,
  stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".
};
const persistedReducer = persistReducer(persistConfig, combine);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;

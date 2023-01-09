import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer, { CartState } from "./reducers/cartReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2"; // for authentication

const commonConfig = {
  storage,
};

const cartConfig = {
  ...commonConfig,
  key: "cart",
  whitelist: ["cartItems"], // not reset state when reload page
};

const reducer = combineReducers({
  cart: persistReducer<CartState>(cartConfig, cartReducer),
});

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

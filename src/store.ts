import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./app/modules/auth/store";
import { reducer as formReducer } from 'redux-form'
import productsReducer from "app/modules/products/store/reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  products: productsReducer
});

// const sentryReduxEnhancer = createReduxEnhancer({});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // enhancers: [sentryReduxEnhancer as any]
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
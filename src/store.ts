import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./app/modules/auth/store";
import { reducer as formReducer } from 'redux-form'

export const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer
});

// const sentryReduxEnhancer = createReduxEnhancer({});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  // enhancers: [sentryReduxEnhancer as any]
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkCurrentUserAuth, login, logout } from "./actions";
import { AuthResponse } from "../../domain/interfaces/AuthResponse";
import User from "../../../users/domain/interfaces/User";

export type CurrentUserState = {
  isAuthChecked: boolean
  isAuthChecking: boolean
  isLogged: boolean
  session?: {
    token: string
  }
  user: User | null
};

const initialState: CurrentUserState = {
  isAuthChecked: false,
  isAuthChecking: false,
  isLogged: false,
  session: null,
  user: null,
};

const userAuthSuccessReducer = (state: CurrentUserState, action: PayloadAction<AuthResponse>) => {
  const { token } = action.payload
  state.isAuthChecked = true;
  state.isAuthChecking = false;
  state.isLogged = true;
  state.session = {token: token};
};

const userAuthFailedReducer = (state: CurrentUserState, action: any) => {
  state.isAuthChecked = true;
  state.isAuthChecking = false;
  state.isLogged = false;
  state.session = null;
  state.user = null;
};

const userAuthPendingReducer = (state: CurrentUserState, action: any) => {
  state.isAuthChecked = false;
  state.isAuthChecking = true;
  state.isLogged = false;
  state.session = null;
  state.user = null;
};

const authCurrentUserSlice = createSlice<CurrentUserState, {}>({
  name: "auth/current-user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Check Auth
    builder.addCase(checkCurrentUserAuth.pending, userAuthPendingReducer)
    builder.addCase(checkCurrentUserAuth.fulfilled, userAuthSuccessReducer)
    builder.addCase(checkCurrentUserAuth.rejected, userAuthFailedReducer)

    // Login
    builder.addCase(login.pending, userAuthPendingReducer)
    builder.addCase(login.fulfilled, userAuthSuccessReducer)
    builder.addCase(login.rejected, userAuthFailedReducer)

    // Logout
    builder.addCase(logout.pending, (state) => {
      state.isLogged = false;
      state.session = null;
      state.user = null;
    })
  },
});

const authCurrentUserReducer = authCurrentUserSlice.reducer;

export default authCurrentUserReducer;

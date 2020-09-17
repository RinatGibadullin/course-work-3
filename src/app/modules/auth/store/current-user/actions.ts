import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../domain/services/AuthService";
import { AuthCredentials } from "../../domain/interfaces/AuthCredentials";
import { AuthResponse } from "../../domain/interfaces/AuthResponse";

const PREFIX = "auth/current-user";

export const checkCurrentUserAuth = createAsyncThunk<AuthResponse>(
  `${PREFIX}/checkCurrentUserAuth`,
  async (_, thunkApi) => {
    return authService.checkUserAuth();
  }
)

export const login = createAsyncThunk<AuthResponse, AuthCredentials>(
  `${PREFIX}/login`,
  async (credentials, thunkApi) => {
    return authService.login(credentials);
  }
)

export const logout = createAsyncThunk<void>(
  `${PREFIX}/logout`,
  async (_, thunkApi) => {
    return authService.logout();
  }
)

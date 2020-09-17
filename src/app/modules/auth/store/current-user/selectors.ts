import { createSelector } from "@reduxjs/toolkit";
import { authStateSelector } from "../selectors";

export const currentUserStateSelector = createSelector(
  authStateSelector,
  (state) => state.currentUser
);

export const isAuthCheckingSelector = createSelector(
  currentUserStateSelector,
  (state) => state.isAuthChecking
);

export const isLoggedSelector = createSelector(
  currentUserStateSelector,
  (state) => state.isLogged
);

export const isAuthCheckedSelector = createSelector(
  currentUserStateSelector,
  (state) => state.isAuthChecked
);

export const currentUserSelector = createSelector(
  currentUserStateSelector,
  (state) => state.user
)
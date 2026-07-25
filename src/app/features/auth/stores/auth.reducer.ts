import { createReducer, on } from "@ngrx/store";
import { User } from "../data/auth.models";
import { AuthActions } from "./auth.action";

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    loading: false,
    user,
    token,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.logoutSuccess, () => initialState),
  on(AuthActions.restoreSessionSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
  }))
);

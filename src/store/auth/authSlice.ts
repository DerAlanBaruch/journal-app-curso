import { createSlice } from "@reduxjs/toolkit";
import { AuthState, AuthStatus } from "../../auth/types";

const initialState: AuthState = {
  status: AuthStatus.NOT_AUTHENTICATED,
  user: {
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
  },
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = AuthStatus.AUTHENTICATED;
      state.user = action.payload;
    },
    logout: (state) => {
      state.status = AuthStatus.NOT_AUTHENTICATED;
      state.user = {
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
      };
    },
    checkingCredentials: (state) => {
      state.status = AuthStatus.CHECKING;
    },
    loginError: (state, action) => {
      state.status = AuthStatus.NOT_AUTHENTICATED;
      state.errorMessage = action.payload;
    },
  },
});

export const { checkingCredentials, login, logout, loginError } = authSlice.actions;

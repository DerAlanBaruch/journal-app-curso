import { createSlice } from "@reduxjs/toolkit";
import { AuthState, AuthStatus, User } from "../../auth/types";

const blankUser: User = {
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
}

const initialState: AuthState = {
  status: AuthStatus.NOT_AUTHENTICATED,
  user: structuredClone(blankUser),
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = AuthStatus.AUTHENTICATED;
      state.user = action.payload;
      state.errorMessage = null;
    },
    logout: (state) => {
      state.status = AuthStatus.NOT_AUTHENTICATED;
      state.user = structuredClone(blankUser);
    },
    checkingCredentials: (state) => {
      state.status = AuthStatus.CHECKING;
    },
    loginError: (state, action) => {
      state.status = AuthStatus.NOT_AUTHENTICATED;
      state.errorMessage = action.payload;
      state.user = structuredClone(blankUser);
    },
  },
});

export const { checkingCredentials, login, logout, loginError } = authSlice.actions;

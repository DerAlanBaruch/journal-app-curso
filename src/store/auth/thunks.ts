import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkingCredentials, login, loginError, logout } from "./authSlice";
import {
  LoginData,
  SignUpData,
  loginWithEmail,
  logoutFirebase,
  signInWithGoogle,
  signUpWithEmail,
} from "../../firebase/providers";

export const checkingAuthentication = createAsyncThunk(
  "auth/checkingAuthentication",
  async (_data, thunkApi) => {
    thunkApi.dispatch(checkingCredentials());
    console.log("checking authentication");
  }
);

export const startGoogleSignIn = createAsyncThunk(
  "auth/startGoogleSignIn",
  async (_data, thunkApi) => {
    thunkApi.dispatch(checkingCredentials());
    console.log("google sign in");
    const result = await signInWithGoogle();
    console.log(result);
    if (result.ok) return thunkApi.dispatch(login(result.user));
    thunkApi.dispatch(loginError(result.errorMessage));
  }
);

export const startSignUpWithEmail = createAsyncThunk(
  "auth/startSignUpWithEmail",
  async (data: SignUpData, thunkApi) => {
    thunkApi.dispatch(checkingCredentials());
    const result = await signUpWithEmail(data);
    if (result.ok) return thunkApi.dispatch(login(result.user));
    thunkApi.dispatch(loginError(result.errorMessage));
  }
);

export const startLoginWithEmail = createAsyncThunk(
  "auth/startLoginWithEmail",
  async (data: LoginData, thunkApi) => {
    thunkApi.dispatch(checkingCredentials());
    console.log("login with email");
    const result = await loginWithEmail(data);
    if (result.ok) return thunkApi.dispatch(login(result.user));
    thunkApi.dispatch(loginError(result.errorMessage));
  }
);

export const startLogout = createAsyncThunk(
  "auth/startLogout",
  async (_data, thunkApi) => {
    await logoutFirebase();
    thunkApi.dispatch(logout());
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkingCredentials, login, loginError } from "./authSlice";
import { signInWithGoogle } from "../../firebase/providers";

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
    if (result.ok) thunkApi.dispatch(login(result.user));
    else thunkApi.dispatch(loginError(result.errorMessage));
  }
);

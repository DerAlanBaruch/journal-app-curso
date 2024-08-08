import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { firebaseAuth } from "./config";
import { User } from "../auth/types";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    const { photoURL, email, displayName, uid } = result.user;
    return { ok: true, user: { photoURL, email, displayName, uid } };
  } catch (e: any) {
    console.log(e);
    return {
      ok: false,
      errorMessage: e.message,
    };
  }
};

export type SignUpData = Omit<User, "uid" | "photoURL"> & { password: string };
export type LoginData = Omit<SignUpData, "displayName">;

export const signUpWithEmail = async (userData: SignUpData) => {
  try {
    const { email, password, displayName } = userData;
    if (!email || !password || !displayName) throw new Error("Invalid data");
    const response = await createUserWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const { uid, photoURL } = response.user;
    await updateProfile(response.user, { displayName });
    return { ok: true, user: { email, displayName, uid, photoURL } };
  } catch (e: any) {
    console.log(e);
    return {
      ok: false,
      errorMessage: e.message,
    };
  }
};

export const loginWithEmail = async (loginData: LoginData) => {
  try {
    const { email, password } = loginData;
    if (!email || !password) throw new Error("Invalid data");
    const response = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    const { uid, photoURL, displayName } = response.user;
    return { ok: true, user: { uid, photoURL, displayName, email } };
  } catch (e: any) {
    console.log(e);
    return {
      ok: false,
      errorMessage: e.message,
    };
  }
};

export const logoutFirebase = async () => {
  try {
    await firebaseAuth.signOut();
    return { ok: true };
  } catch (e: any) {
    console.log(e);
    return {
      ok: false,
      errorMessage: e.message,
    };
  }
}

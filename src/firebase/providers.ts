import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./config";

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

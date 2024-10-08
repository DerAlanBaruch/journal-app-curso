import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { firebaseAuth } from "../firebase/config";
import {
  RootState,
  AppDispatch,
  login,
  logout,
  startLoadingNotes,
} from "../store";

export const useCheckAuth = () => {
  const { status } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (loggedUser) => {
      if (loggedUser) {
        const { email, displayName, photoURL, uid } = loggedUser;
        dispatch(login({ email, displayName, photoURL, uid }));
        return dispatch(startLoadingNotes());
      }
      dispatch(logout());
    });
  }, []);

  return status;
};

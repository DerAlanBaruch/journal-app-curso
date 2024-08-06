import { AuthState } from "./Auth";

export enum AuthActions {
  LOGIN = "[Auth] Login",
  LOGOUT = "[Auth] Logout",
}

export interface AuthAction {
  type: AuthActions;
  payload?: AuthState;
}

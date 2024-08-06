export enum AuthStatus {
  CHECKING = "checking",
  AUTHENTICATED = "authenticated",
  NOT_AUTHENTICATED = "not-authenticated",
}

export interface User {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthState {
  user?: User;
  status: AuthStatus;
  errorMessage: string | null;
}



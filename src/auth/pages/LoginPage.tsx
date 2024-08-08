import { Google } from "@mui/icons-material";
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  startGoogleSignIn,
  startLoginWithEmail,
} from "../../store";
import { AuthStatus } from "../types";

export const LoginPage: FC = () => {
  const { formState, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const isAuthenticating = useMemo(
    () => status === AuthStatus.CHECKING,
    [status]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
    dispatch(startLoginWithEmail(formState));
  };

  const onGoogleLogin = () => {
    console.log("google login");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="user@email.com"
              fullWidth
              value={formState.email}
              onChange={handleInputChange}
              name="email"
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="********"
              fullWidth
              value={formState.password}
              onChange={handleInputChange}
              name="password"
            />
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center">
            <Grid item display={errorMessage ? "block" : "none"} xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleLogin}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Login with Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Grid item>
              <Typography>
                {"Don't have an account? "}
                <Link
                  color="inherit"
                  component={RouterLink}
                  to="/auth/signup"
                  replace
                >
                  Sign up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

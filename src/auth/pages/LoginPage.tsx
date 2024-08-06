import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import { useDispatch } from "react-redux";
import { AppDispatch, checkingAuthentication, startGoogleSignIn } from "../../store";

export const LoginPage: FC = () => {
  const { formState, handleInputChange } = useForm({
    email: "",
    password: "",
  });

  const dispatch: AppDispatch = useDispatch();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
    dispatch(checkingAuthentication());
  };

  const onGoogleLogin = () => {
    console.log("google login");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
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
          <Grid container spacing={2} sx={{ mt: 2 }} justifyContent={"center"}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth onClick={onGoogleLogin}>
                <Google />
                <Typography sx={{ ml: 1 }}>Login with Google</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container direction={"row"} justifyContent={"end"}>
            <Grid item>
              <Typography>
                Don't have an account?{" "}
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

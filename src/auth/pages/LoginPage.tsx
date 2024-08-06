import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";

export const LoginPage: FC = () => {
  return (
    <AuthLayout title="Login">
      <form action="">
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="user@email.com"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="********"
              fullWidth
            />
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }} justifyContent={"center"}>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" fullWidth>
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

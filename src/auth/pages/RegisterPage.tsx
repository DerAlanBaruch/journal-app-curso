import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { FormValidations, useForm } from "../../hooks";
import { AppDispatch, RootState, startSignUpWithEmail } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { AuthStatus } from "../types";

const initialForm = {
  displayName: "",
  email: "",
  password: "",
};

const formValidations: FormValidations = {
  displayName: {
    required: {
      value: (value: string) => value.length > 0,
      message: "El nombre es requerido",
    },
  },
  email: {
    pattern: {
      value: (value: string) =>
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      message: "El email no es valido",
    },
  },
  password: {
    minLength: {
      value: (value: string) => value.length >= 6,
      message: "El password debe tener al menos 6 caracteres",
    },
  },
};

export const RegisterPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { formState, handleInputChange, errors, isValid } = useForm(
    initialForm,
    formValidations
  );
  const [submited, setSubmit] = useState(false);

  const { status, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const isAuthenticating = useMemo(
    () => status === AuthStatus.CHECKING,
    [status]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    if (!isValid) return;
    console.log(formState, errors);
    dispatch(startSignUpWithEmail(formState));
  };

  return (
    <AuthLayout title="Sign up">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="Nombre"
              fullWidth
              name="displayName"
              value={formState.displayName}
              onChange={handleInputChange}
              error={submited && !!errors.displayName}
              helperText={submited ? errors.displayName : null}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="user@email.com"
              fullWidth
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              error={submited && !!errors.email}
              helperText={submited ? errors.email : null}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="********"
              fullWidth
              name="password"
              value={formState.password}
              onChange={handleInputChange}
              error={submited && !!errors.password}
              helperText={submited ? errors.password : null}
            />
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }} justifyContent="center">
            <Grid item display={errorMessage ? "block" : "none"} xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
                SignUp
              </Button>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Grid item>
              <Typography>
                {"Already have an account? "}
                <Link
                  color="inherit"
                  component={RouterLink}
                  to="/auth/login"
                  replace
                >
                  Login
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

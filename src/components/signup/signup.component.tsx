import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styles from "./signup.module.css";

type Props = {
  isLoginHandler: () => void;
  submitHandler: (
    e: React.FormEvent<HTMLFormElement>,
    email: FormDataEntryValue | null,
    password: FormDataEntryValue | null,
    passwordConfirm?: FormDataEntryValue | null
  ) => void;
  errorState: string;
};

export default function SignUp({
  isLoginHandler,
  submitHandler,
  errorState = "",
}: Props) {
  console.log("********", errorState);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const passwordConfirm = data.get("passwordConfirm");

    submitHandler(event, email, password, passwordConfirm);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <BakeryDiningIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid> */}
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                error={
                  errorState === "Please enter a valid email address" ||
                  errorState === "Email already in use" ||
                  errorState ===
                    "Something went wrong. This email may already be registered."
                }
                helperText={
                  errorState === "Please enter a valid email address" ||
                  errorState === "Email already in use" ||
                  errorState ===
                    "Something went wrong. This email may already be registered."
                    ? errorState
                    : ""
                }
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={
                  errorState === "Please enter a valid password" ||
                  errorState === "Passwords do not match"
                }
                helperText={
                  errorState === "Please enter a valid password" ||
                  errorState === "Passwords do not match"
                    ? errorState
                    : ""
                }
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorState === "Passwords do not match"}
                helperText={
                  errorState === "Passwords do not match"
                    ? "Passwords don't match"
                    : ""
                }
                required
                fullWidth
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                id="passwordConfirm"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <button onClick={isLoginHandler} className={styles.toggle}>
              Already have an account? Sign in
            </button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

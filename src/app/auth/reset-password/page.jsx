"use client";
import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import { useRouter, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styles from "./reset-password.module.css";
import { signIn } from "../utils/signin";

export default function ResetPassword() {
  const [errorState, setErrorState] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const url = process.env.NEXT_PUBLIC_API_URL;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const passwordConfirm = data.get("password-confirm");

    try {
      if (!password) {
        setErrorState({ password: ["Please enter a valid email address"] });
        throw new Error(
          JSON.stringify({ password: ["Please enter a valid email address"] })
        );
      }
      if (password !== passwordConfirm) {
        setErrorState({ password: ["Passwords do not match"] });
        throw new Error(
          JSON.stringify({ password: ["Passwords do not match"] })
        );
      }

      const response = await fetch(`${url}/api/password_reset/confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        setErrorState(errorData);
        throw new Error(JSON.stringify(errorData));
      }

      if (response.ok) {
        const data = await response.json();
        setErrorState("");
        // sign in
        signIn(email, password);

        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.auth}>
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
            Reset your password
          </Typography>
          <Typography component="p">
            Enter a new password for your account.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              error={errorState.password ? true : false}
              helperText={errorState.password ? errorState.password : ""}
              margin="normal"
              required
              fullWidth
              id="password"
              label="New Password"
              name="password"
              autoComplete="new-password"
              autoFocus
            />
            <TextField
              error={errorState.password ? true : false}
              helperText={errorState.password ? errorState.password : ""}
              margin="normal"
              required
              fullWidth
              id="password-confirm"
              label="Confirm Password"
              name="password-confirm"
              autoComplete="new-password"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </section>
  );
}

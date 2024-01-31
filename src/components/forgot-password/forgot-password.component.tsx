import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import Link from "next/link";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styles from "./forgot-password.module.css";

type Props = {
  // isLoginHandler: () => void,
  submitHandler: (
    e: React.FormEvent<HTMLFormElement>,
    email: FormDataEntryValue | null
    // passwordConfirm?: FormDataEntryValue | null
  ) => void;
  // errorState: {
  //   email?: string;
  //   password1?: string;
  //   error: boolean;
  //   username?: string;
  // };
};

export default function ForgotPassword({
  //   isLoginHandler,
  submitHandler,
}: // errorState = { error: false },
Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    // const password = data.get("password");

    submitHandler(event, email);
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
            Forgot Password?
          </Typography>
          <Typography component="p">
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Send reset link
            </Button>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link className={styles.toggle} href="/auth">
                Back to Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}

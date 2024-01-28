import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";

import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import styles from "./signin.module.css";

type Props = {
  isLoginHandler: () => void;
  submitHandler: (
    e: React.FormEvent<HTMLFormElement>,
    email: FormDataEntryValue | null,
    password: FormDataEntryValue | null
    // passwordConfirm?: FormDataEntryValue | null
  ) => void;
  errorState: {
    email?: string;
    password1?: string;
    error: boolean;
    username?: string;
  };
};

export default function SignIn({
  isLoginHandler,
  submitHandler,
  errorState = { error: false },
}: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    submitHandler(event, email, password);
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
          Sign in
        </Typography>
        <Typography component="p">
          Sign in to access your favorite recipes!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={errorState.email ? true : false}
            helperText={errorState.email ? errorState.email : ""}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={errorState.password1 ? true : false}
            helperText={errorState.password1 ? errorState.password1 : ""}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Box>
        <Grid container>
          <Grid item xs>
            {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
          </Grid>
          <Grid item>
            <button onClick={isLoginHandler} className={styles.toggle}>
              {"Don't have an account? Sign Up"}
            </button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

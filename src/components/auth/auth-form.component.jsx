import { useState, useRef, FormEvent } from "react";
import { signIn as authSignIn } from "next-auth/react";
import classes from "./auth-form.module.css";
import { useRouter } from "next/navigation";
import SignIn from "../signin/signin.component";
import SignUp from "../signup/signup.component";
import React from "react";

const createUser = async (email, password1, password2) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const username = email;
  const response = await fetch(`${url}/api/user/register/`, {
    method: "POST",
    body: JSON.stringify({ username, email, password1, password2 }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response;
    throw new Error(
      errorData.message ||
        "Something went wrong. This email may already be registered."
    );
  }
};
const signIn = async (email, password) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const username = email;

  const response = await authSignIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (!response.ok) {
    const errorData = await response.error;
    throw new Error(errorData || "Sign-in failed.");
  }

  if (response.ok) {
    const data = await response;

    return data;
  }
};

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const [errorState, setErrorState] = useState("");
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    setErrorState("");
  }

  const submitHandler = async (
    e,
    enteredEmail,
    enteredPasword,
    enteredPasswordConfirm = ""
  ) => {
    e.preventDefault();

    try {
      if (!enteredEmail) {
        throw new Error("Please enter a valid email address");
      }
      if (!enteredPasword) {
        throw new Error("Please enter a valid password");
      }
      if (!isLogin) {
        if (enteredPasword !== enteredPasswordConfirm) {
          throw new Error("Passwords do not match");
        }
        const result = await createUser(
          enteredEmail,
          enteredPasword,
          enteredPasswordConfirm
        );
      }

      const result2 = await signIn(enteredEmail, enteredPasword);
      if (result2.ok) {
        router.replace("/");
      }
    } catch (err) {
      let errMsg = err.message;
      if (err.message === "CredentialsSignin") {
        errMsg = "Invalid email or password";
      }
      setErrorState(errMsg);
      console.error(errMsg);
    }
  };

  return (
    <section className={classes.auth}>
      {isLogin && (
        <SignIn
          submitHandler={submitHandler}
          isLoginHandler={switchAuthModeHandler}
          errorState={errorState}
        />
      )}
      {!isLogin && (
        <SignUp
          submitHandler={submitHandler}
          isLoginHandler={switchAuthModeHandler}
          errorState={errorState}
        />
      )}
    </section>
  );
}

export default AuthForm;

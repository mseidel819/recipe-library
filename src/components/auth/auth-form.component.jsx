import { useState } from "react";
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
    const errorData = await response.json();
    errorData.error = true;
    return errorData;
  }

  if (response.ok) {
    const data = await response.json();
    data.error = false;

    return data;
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

  const data = await response;
  return data;
};

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const [errorState, setErrorState] = useState("");
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    setErrorState({});
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
        setErrorState({ email: ["Please enter a valid email address"] });
        throw new Error(
          JSON.stringify({ email: ["Please enter a valid email address"] })
        );
      }
      if (!enteredPasword) {
        setErrorState({ password1: ["Please enter a valid password"] });

        throw new Error(
          JSON.stringify({ password1: ["Please enter a valid password"] })
        );
      }
      if (!isLogin) {
        if (enteredPasword !== enteredPasswordConfirm) {
          setErrorState({ password1: ["Passwords do not match"] });

          throw new Error(
            JSON.stringify({ password1: ["Passwords do not match"] })
          );
        }

        const result = await createUser(
          enteredEmail,
          enteredPasword,
          enteredPasswordConfirm
        );
        if (result.error && result.error === true) {
          setErrorState(result);
          throw new Error(JSON.stringify(result));
        }
      }

      const result2 = await signIn(enteredEmail, enteredPasword);
      if (result2.ok) {
        router.replace("/");
      }
      if (!result2.ok) {
        setErrorState({
          password1: ["Invalid email or password"],
          email: ["Invalid email or password"],
        });
        throw new Error(JSON.stringify(result2.error));
      }
    } catch (err) {
      console.error(err.message);
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

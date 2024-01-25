import { useState, useRef, FormEvent } from "react";
import { signIn as authSignIn } from "next-auth/react";
import classes from "./auth-form.module.css";
import { useRouter } from "next/navigation";
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
};
const signIn = async (email, password) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const username = email;

  const result = await authSignIn("credentials", {
    redirect: true,
    email,
    password,
    callbackUrl: "/",
  });
};

function AuthForm() {
  const emailInpufRef = useRef();
  const passwordInputRef = useRef();
  const passwordConfirmInputRef = useRef();
  const usernameInpufRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const [requestError, setRequestError] = useState();
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInpufRef.current.value;
    const enteredPasword = passwordInputRef.current.value;

    try {
      if (!isLogin) {
        // const enteredUsername = usernameInpufRef.current.value;
        const enteredPasswordConfirm = passwordConfirmInputRef.current.value;

        const result = await createUser(
          enteredEmail,
          enteredPasword,
          enteredPasswordConfirm
        );
      }

      const result2 = await signIn(enteredEmail, enteredPasword);
    } catch (err) {
      console.log("oops", err);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInpufRef} />
        </div>
        <div className={classes.control}>
          {!isLogin && <label htmlFor="password">Create Password</label>}
          {isLogin && <label htmlFor="password">Your Password</label>}
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordConfirmInputRef}
            />
          </div>
        )}
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;

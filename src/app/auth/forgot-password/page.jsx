"use client";

import ForgotPassword from "../../../components/forgot-password/forgot-password.component";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./forgot-password.module.css";

const requestReset = async (email) => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${url}/api/password_reset/`, {
    method: "POST",
    body: JSON.stringify({ email }),
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

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e, email) => {
    e.preventDefault();

    try {
      const data = await requestReset(email);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (!submitted) {
    return <ForgotPassword submitHandler={handleSubmit} />;
  }
  if (submitted) {
    return (
      <div className={styles.auth}>
        <p>
          If an account with that email exists, we sent you an email with
          instructions to reset your password.
        </p>
      </div>
    );
  }
};

export default ForgotPasswordPage;

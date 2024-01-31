"use client";

import ForgotPassword from "../../../components/forgot-password/forgot-password.component";
import { useRouter } from "next/navigation";

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
  const handleSubmit = async (e, email) => {
    e.preventDefault();

    try {
      const data = await requestReset(email);
      router.replace("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  return <ForgotPassword submitHandler={handleSubmit} />;
};

export default ForgotPasswordPage;

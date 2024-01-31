import { signIn as authSignIn } from "next-auth/react";

export const signIn = async (email, password) => {
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

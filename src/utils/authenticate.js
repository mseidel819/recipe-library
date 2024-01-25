export const authenticateUser = async (email, password) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${url}/api/user/login/`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

import { useQuery } from "@tanstack/react-query";

const fetchFavorites = (session) => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  const headers = {
    "Content-Type": "application/json",
  };

  // If the session contains a JWT token, include it in the headers
  if (!session) return [];
  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  return fetch(`${url}/api/blog-recipes/favorites`, {
    headers,
  })
    .then((res) => res.json())
    .then((data) => data);
};

const useFetchFavorites = (session) => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => fetchFavorites(session),
  });
};

export default useFetchFavorites;

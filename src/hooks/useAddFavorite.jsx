import { useMutation } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const addFavorite = ({ session, recipe_id }) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const headers = {
    "Content-Type": "application/json",
  };

  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  return fetch(`${url}/api/blog-recipes/favorites/`, {
    method: "POST",
    body: JSON.stringify({ recipe_id }),
    headers,
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const useAddFavorites = (session, recipe_id, checked) => {
  const mutation = useMutation({
    mutationFn: () => addFavorite(session, recipe_id),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
    },
  });

  if (!checked) {
    return { ...mutation, isError: false };
  }

  return mutation;
};

export default useAddFavorites;

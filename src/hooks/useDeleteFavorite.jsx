import { useMutation } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const deleteFavorite = ({ session, recipe_id }) => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  const headers = {
    "Content-Type": "application/json",
  };

  if (session?.access_token) {
    headers["Authorization"] = `Bearer ${session.access_token}`;
  }

  return fetch(`${url}/api/blog-recipes/favorites/${recipe_id}`, {
    method: "DELETE",
    headers,
  })
    .then((res) => res.json())
    .then((data) => data);
};

const useDeleteFavorites = (session, recipe_id, checked) => {
  const mutation = useMutation({
    mutationFn: () => deleteFavorite(session, recipe_id),
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
    },
  });

  if (!checked) {
    return { ...mutation, isError: false };
  }

  return mutation;
};

export default useDeleteFavorites;

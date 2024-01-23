import { useQuery } from "@tanstack/react-query";

const fetchRecipe = ({ author_id, recipe_id }) => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  return fetch(`${url}/api/blog-recipes/by-author/${author_id}/${recipe_id}`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

const useFetchRecipe = ({ author_id, recipe_id }) => {
  return useQuery({
    queryKey: ["recipe"],
    queryFn: () => fetchRecipe({ author_id, recipe_id }),
  });
};

export default useFetchRecipe;

import { useQuery } from "@tanstack/react-query";

const fetchRecipe = ({ author_id, recipe_id }) => {
  return fetch(
    `https://peppy-alpaca-9050d7.netlify.app/api/blog-recipes/by-author/${author_id}/${recipe_id}`
  )
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

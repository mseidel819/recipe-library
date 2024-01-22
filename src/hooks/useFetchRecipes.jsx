import { useQuery } from "@tanstack/react-query";

const fetchRecipes = (author_id, category) => {
  return fetch(
    `https://peppy-alpaca-9050d7.netlify.app/api/blog-recipes/by-author/${author_id}/?categories=${category}`
  )
    .then((res) => res.json())
    .then((data) => data);
};

const useFetchRecipes = (author_id, category) => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: () => fetchRecipes(author_id, category),
  });
};

export default useFetchRecipes;

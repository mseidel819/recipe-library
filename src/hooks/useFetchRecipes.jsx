import { useQuery } from "@tanstack/react-query";

const fetchRecipes = (author_id, category, page) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  return fetch(
    `${url}/api/blog-recipes/by-author/${author_id}/?categories=${category}&page=${page}`
  )
    .then((res) => res.json())
    .then((data) => data);
};

const useFetchRecipes = (author_id, category, page = 1) => {
  return useQuery({
    queryKey: ["recipes", author_id, category, page],
    queryFn: () => fetchRecipes(author_id, category, page),
  });
};

export default useFetchRecipes;

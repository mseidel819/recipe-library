import { useQuery } from "@tanstack/react-query";

const fetchRecipes = (author_id, category, page, search) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  return fetch(
    `${url}/api/blog-recipes/by-author/${author_id}/?categories=${category}&page=${page}&title=${search}`
  )
    .then((res) => res.json())
    .then((data) => data);
};

const useFetchRecipes = (author_id, category, page = 1, search = "") => {
  return useQuery({
    queryKey: ["recipes", author_id, category, page, search],
    queryFn: () => fetchRecipes(author_id, category, page, search),
  });
};

export default useFetchRecipes;

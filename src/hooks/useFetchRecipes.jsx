import { useQuery } from "@tanstack/react-query";

const fetchRecipes = (author_id, category, page, search, pageSize) => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  return fetch(
    `${url}/api/blog-recipes/by-author/${author_id}/?categories=${category}&page=${page}&title=${search}&page_size=${pageSize}`
  )
    .then((res) => res.json())
    .then((data) => data);
};

const useFetchRecipes = (
  author_id,
  category,
  page = 1,
  search = "",
  pageSize = ""
) => {
  return useQuery({
    queryKey: ["recipes", author_id, category, page, search, pageSize],
    queryFn: () => fetchRecipes(author_id, category, page, search, pageSize),
  });
};

export default useFetchRecipes;

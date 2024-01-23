import { useQuery } from "@tanstack/react-query";

const fetchAuthors = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;

  return fetch(`${url}/api/blog-recipes/authors`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

const useFetchAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: () => fetchAuthors(),
  });
};

export default useFetchAuthors;

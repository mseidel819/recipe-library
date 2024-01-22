import { useQuery } from "@tanstack/react-query";

const fetchAuthors = () => {
  return fetch(
    "https://peppy-alpaca-9050d7.netlify.app/api/blog-recipes/authors"
  )
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

import { useState, useEffect } from "react";

const useFetchAuthors = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch("https://peppy-alpaca-9050d7.netlify.app/api/blog-recipes/authors")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAuthors(data);
      });
  }, []);

  return authors;
};

export default useFetchAuthors;

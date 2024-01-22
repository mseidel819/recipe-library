import { useState, useEffect } from "react";

const useFetchRecipes = ({ author_id, category }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(
      `https://peppy-alpaca-9050d7.netlify.app/api/blog-recipes/by-author/${author_id}/?categories=${category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      });
  }, [author_id, category]);

  return recipes;
};

export default useFetchRecipes;

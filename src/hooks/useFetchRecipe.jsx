import { useState, useEffect } from "react";

const useFetchRecipe = ({ author_id, recipe_id }) => {
  const [recipe, setRecipe] = useState([]);

  useEffect(() => {
    fetch(
      `https://peppy-alpaca-9050d7.netlify.app/api/blog-recipes/by-author/${author_id}/${recipe_id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
      });
  }, [author_id, recipe_id]);

  return recipe;
};

export default useFetchRecipe;

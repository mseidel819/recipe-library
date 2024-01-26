"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useFetchRecipe from "@/hooks/useFetchRecipe";
import useDeleteFavorites from "@/hooks/useDeleteFavorite";
import useAddFavorites from "@/hooks/useAddFavorite";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import AccordionComponent from "../../../components/accordion/accordion.component.jsx";
import RecipeLoader from "../../../components/loaders/recipe/recipe-loader.component.jsx";
import useFetchFavorites from "@/hooks/useFetchFavorites";

const label = { inputProps: { "aria-label": "Favorite recipe" } };

const Recipe = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [author_id, recipe_id] = params.recipe;
  const [checked, setChecked] = useState(false);

  const {
    isPending,
    isFetching,
    isError,
    data: recipe,
  } = useFetchRecipe({ author_id, recipe_id });

  const {
    isPending: penda,
    isFetching: fenda,
    isError: erora,
    data: favs,
  } = useFetchFavorites(session);

  const isFavorite = favs?.some((fav) => fav.id === +recipe_id);
  useEffect(() => {
    setChecked(isFavorite);
  }, [favs, recipe_id, isFavorite]);

  const { mutate: deleteMutate } = useDeleteFavorites({
    session,
    recipe_id,
    checked,
  });
  const { mutate: addMutate } = useAddFavorites({
    session,
    recipe_id,
    checked,
  });

  const handleFavorite = () => {
    if (checked) {
      deleteMutate();
      setChecked(false);
    }
    if (!checked) {
      addMutate();
      setChecked(true);
    }
  };

  if (isPending) {
    return (
      <div>
        <div className={styles.container}>
          <button className={styles.back_btn} onClick={() => router.back()}>
            <ArrowBackIcon />
            Back
          </button>
          <RecipeLoader />
        </div>
      </div>
    );
  }

  return (
    <div>
      {recipe && (
        <div className={styles.container}>
          <div className={styles.back_nav}>
            <button className={styles.back_btn} onClick={() => router.back()}>
              <ArrowBackIcon />
              Back
            </button>
            {session && (
              <Checkbox
                sx={{
                  color: pink[800],
                  "&.Mui-checked": {
                    color: pink[600],
                  },
                }}
                {...label}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                onChange={handleFavorite}
                checked={checked}
              />
            )}
          </div>

          <h1 className={styles.title}>{recipe.title}</h1>
          <a className={styles.link} href={recipe.link}>
            ({recipe.link})
          </a>
          <div className={styles.info_container}>
            <div className={styles.scores}>
              <span>
                <strong>Rating: </strong>
                {recipe.rating}/5 (out of {recipe.num_reviews} reviews)
              </span>
              <span>
                <strong>Servings: </strong>
                {recipe.servings}
              </span>
            </div>
            <div className={styles.times}>
              <span>
                <strong>Prep time: </strong>
                {recipe.prep_time}
              </span>
              <span>
                <strong>Cook time: </strong>
                {recipe.cook_time}
              </span>
              <span>
                <strong>Total time: </strong>
                {recipe.total_time}
              </span>
            </div>
          </div>
          <AccordionComponent recipe={recipe} />
        </div>
      )}
    </div>
  );
};

export default Recipe;

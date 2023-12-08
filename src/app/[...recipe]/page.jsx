"use client";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import AccordionComponent from "../../components/accordion/accordion.component.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setRecipes } from "@/store/recipes/recipes.slice";
// import { RootState } from "@/store/store";
import sallysData from "../../../data/sallys-baking-addiction.json";

const Recipe = ({ params }) => {
  const [category, slug] = params.recipe;

  const recipes = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  const foundRecipe = recipes.recipes.find((item) => item.slug === slug);

  useEffect(() => {
    dispatch(setRecipes(sallysData));
  }, [dispatch]);

  if (foundRecipe) {
    return (
      <div className={styles.container}>
        <Link className={styles.back_btn} href="/">
          <ArrowBackIcon />
          Back
        </Link>

        <h1 className={styles.title}>{foundRecipe.title}</h1>
        <a className={styles.link} href={foundRecipe.link}>
          ({foundRecipe.link})
        </a>
        <div className={styles.info_container}>
          <div className={styles.scores}>
            <span>
              <strong>Rating: </strong>
              {foundRecipe.rating}/5 (out of {foundRecipe.num_reviews} reviews)
            </span>
            <span>
              <strong>Servings: </strong>
              {foundRecipe.serves}
            </span>
          </div>
          <div className={styles.times}>
            <span>
              <strong>Prep time: </strong>
              {foundRecipe.prep_time}
            </span>
            <span>
              <strong>Cook time: </strong>
              {foundRecipe.cook_time}
            </span>
            <span>
              <strong>Total time: </strong>
              {foundRecipe.total_time}
            </span>
          </div>
        </div>
        <AccordionComponent recipe={foundRecipe} />
      </div>
    );
  }
};

export default Recipe;

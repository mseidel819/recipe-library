"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import BreadData from "../../../../data/sallys-baking-addiction/bread.json";
import BreakfastData from "../../../../data/sallys-baking-addiction/breakfast-treats.json";
import CakeData from "../../../../data/sallys-baking-addiction/desserts-cakes.json";
import CookieData from "../../../../data/sallys-baking-addiction/desserts-cookies.json";
import PieData from "../../../../data/sallys-baking-addiction/desserts-pies.json";
import styles from "./page.module.css";
import AccordionComponent from "../../../components/accordion/accordion.component.jsx";

const Recipe = ({ params }) => {
  const [recipe, setRecipe] = useState({});
  const [category, slug] = params.recipe;

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  useEffect(() => {
    const dataObj = {
      bread: BreadData,
      "breakfast-treats": BreakfastData,
      "desserts-cakes": CakeData,
      "desserts-cookies": CookieData,
      "desserts-pies": PieData,
    };
    const foundRecipe = dataObj[category].find((item) => item.slug === slug);
    setRecipe(foundRecipe);
  }, [slug, category]);
  // prep time, cook time, total time,
  //  link, num_reviews,serves, rating(out of num_reviews)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.container}>
        <Link className={styles.back_btn} href="/">
          <ArrowBackIcon />
          Back
        </Link>

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
              {recipe.serves}
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
    </ThemeProvider>
  );
};

export default Recipe;

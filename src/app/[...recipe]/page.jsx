"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState, useMemo } from "react";
import BreadData from "../../../data/sallys-baking-addiction/bread.json";
import BreakfastData from "../../../data/sallys-baking-addiction/breakfast-treats.json";
import CakeData from "../../../data/sallys-baking-addiction/desserts-cakes.json";
import CookieData from "../../../data/sallys-baking-addiction/desserts-cookies.json";
import PieData from "../../../data/sallys-baking-addiction/desserts-pies.json";
import styles from "./page.module.css";
import AccordionComponent from "../../components/accordion/accordion.component.jsx";

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
        <h1 className={styles.title}>{recipe.title}</h1>
        <AccordionComponent recipe={recipe} />
      </div>
    </ThemeProvider>
  );
};

export default Recipe;

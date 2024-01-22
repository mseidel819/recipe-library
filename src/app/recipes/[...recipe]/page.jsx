"use client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import useSetTheme from "@/hooks/useSetTheme";
import useFetchRecipe from "@/hooks/useFetchRecipe";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import AccordionComponent from "../../../components/accordion/accordion.component.jsx";

const Recipe = ({ params }) => {
  const router = useRouter();
  const [author_id, recipe_id] = params.recipe;

  const theme = useSetTheme();
  const {
    isPending,
    isFetching,
    isError,
    data: recipe,
  } = useFetchRecipe({ author_id, recipe_id });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {recipe && (
        <div className={styles.container}>
          <button className={styles.back_btn} onClick={() => router.back()}>
            <ArrowBackIcon />
            Back
          </button>

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
    </ThemeProvider>
  );
};

export default Recipe;

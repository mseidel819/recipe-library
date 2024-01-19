"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CardList from "@/components/card-list/card-list.component";
import TabsLayout from "../layout";
import useSetTheme from "@/hooks/useSetTheme";

// this page will display the author selected from the entry page where the user clicked 1 authors name. user will then see all of the categories in a tab list.
// user can then click on a category and see all of the recipes in that category on this same page. it will add a param to the url for the category.
// if no second param (category) only tab will display with a "select category" message. or all recipes? is this too much?
// where is the author data stored and passed to get list of categories? context?
import { useEffect, useState } from "react";

const AuthorPage = ({ params }) => {
  const [author_id, category] = params.author;
  const [recipes, setRecipes] = useState([]);
  const [theme, setTheme] = useState({});

  const themeHook = useSetTheme();

  useEffect(() => {
    setTheme(themeHook);
  }, [theme, themeHook]);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/api/blog-recipes/by-author/${author_id}/?categories=${category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      });
  }, [author_id, category]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <CardList data={recipes} category={category} />
      </div>
    </ThemeProvider>
  );
};

export default AuthorPage;
AuthorPage.getLayout = function getLayout(page) {
  return <TabsLayout>{page}</TabsLayout>;
};

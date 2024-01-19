"use client";

import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useEffect } from "react";

import styles from "./page.module.css";
import BasicTabs from "@/components/tabs/tabs.component";
import React from "react";

export default function Home() {
  const [authors, setAuthors] = React.useState([]);
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
    fetch("http://127.0.0.1:8000/api/blog-recipes/authors")
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data);
      });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className={styles.main}>
        <h1>Select a blog to begin</h1>
        <ul>
          {authors.map((author) => (
            <li key={author.id}>
              <a href={`/blogs/${author.id}`}>
                {author.name} - {author.total_recipes} recipes
              </a>
            </li>
          ))}
        </ul>
        {/* <BasicTabs /> */}
      </main>
    </ThemeProvider>
  );
}

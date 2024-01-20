"use client";

import React, { useEffect, useState } from "react";
import useSetTheme from "@/hooks/useSetTheme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import styles from "./page.module.css";

export default function Home() {
  const [authors, setAuthors] = React.useState([]);
  const [theme, setTheme] = useState({});

  const themeHook = useSetTheme();

  useEffect(() => {
    setTheme(themeHook);
  }, [theme, themeHook]);

  useEffect(() => {
    fetch("https://peppy-alpaca-9050d7.netlify.app/api/blog-recipes/authors")
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
        <ul className={styles.list}>
          {authors.map((author) => (
            <li key={author.id} className={styles.list_item}>
              <a href={`/blogs/${author.id}`}>
                {author.name} - {author.total_recipes} recipes
              </a>
            </li>
          ))}
        </ul>
      </main>
    </ThemeProvider>
  );
}

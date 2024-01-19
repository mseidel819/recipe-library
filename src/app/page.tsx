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
      </main>
    </ThemeProvider>
  );
}

"use client";
import useSetTheme from "@/hooks/useSetTheme";
import useFetchAuthors from "@/hooks/useFetchAuthors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import styles from "./page.module.css";

export default function Home() {
  const themeHook = useSetTheme();
  const fetchedAuthors = useFetchAuthors();

  return (
    <ThemeProvider theme={themeHook}>
      <CssBaseline />
      <main className={styles.main}>
        <h1>Select a blog to begin</h1>
        <ul className={styles.list}>
          {fetchedAuthors.map((author) => (
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

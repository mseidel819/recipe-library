"use client";
import useSetTheme from "@/hooks/useSetTheme";
import useFetchAuthors from "@/hooks/useFetchAuthors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import PanLoader from "@/components/loaders/pan/pan.component";
import styles from "./page.module.css";

export default function Home() {
  const themeHook = useSetTheme();
  const { isPending, isFetching, isError, data } = useFetchAuthors();

  return (
    <ThemeProvider theme={themeHook}>
      <CssBaseline />
      <main className={styles.main}>
        <h1>Select a blog to begin</h1>
        {isPending && (
          <div className={styles.loader}>
            <PanLoader />
          </div>
        )}
        <ul className={styles.list}>
          {data?.map((author) => (
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

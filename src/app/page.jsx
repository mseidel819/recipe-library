"use client";
import useFetchAuthors from "@/hooks/useFetchAuthors";
import PanLoader from "@/components/loaders/pan/pan.component";
import styles from "./page.module.css";

export default function Home() {
  const { isPending, isFetching, isError, data } = useFetchAuthors();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Select a blog to begin</h1>
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
  );
}

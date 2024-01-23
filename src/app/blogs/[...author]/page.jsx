"use client";

import CardList from "@/components/card-list/card-list.component";
import TabsLayout from "../layout";
import useFetchRecipes from "@/hooks/useFetchRecipes";
import { Pagination, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";

const AuthorPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [author_id, category] = params.author;
  const [searchField, setSearchField] = useState("");
  const page = searchParams.get("page") || 1;

  const { isPending, isFetching, isError, data } = useFetchRecipes(
    author_id,
    category,
    page,
    searchField
  );

  const totalPages = data?.count ? Math.ceil(data.count / 15) : 1;

  const handlePageChange = (event, value) => {
    router.push(`/blogs/${author_id}/${category}/?page=${value}`);
  };

  const onSearchSubmit = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearchSubmit(event);
    }
  };

  return (
    <div className={styles.container}>
      <TextField
        id="outlined-basic"
        label={`Search ${category}`}
        variant="outlined"
        onKeyDown={handleKeyDown}
        autoComplete="off"
        className={styles.search}
        size="small"
      />
      <CardList data={data?.results} isPending={isPending} />
      {totalPages > 1 && (
        <Pagination
          className={styles.pagination}
          count={totalPages}
          variant="outlined"
          page={+page}
          shape="rounded"
          onChange={handlePageChange}
          size="small"
        />
      )}
    </div>
  );
};

export default AuthorPage;
AuthorPage.getLayout = function getLayout(page) {
  return <TabsLayout>{page}</TabsLayout>;
};

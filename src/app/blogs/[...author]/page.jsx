"use client";

import CardList from "@/components/card-list/card-list.component";
import TabsLayout from "../layout";
import useFetchRecipes from "@/hooks/useFetchRecipes";
import useFetchFavorites from "@/hooks/useFetchFavorites";
import { Pagination, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./page.module.css";
import { useState } from "react";

const AuthorPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [author_id, category] = params.author;
  const [searchField, setSearchField] = useState("");
  const page = searchParams.get("page") || 1;

  const PAGE_SIZE = 15;

  const { isPending, isFetching, isError, data } = useFetchRecipes(
    author_id,
    category,
    page,
    searchField,
    PAGE_SIZE
  );

  const { data: favorites } = useFetchFavorites(session);
  const favoritesIds = favorites?.map((fav) => fav.id);

  const totalPages = data?.count ? Math.ceil(data.count / PAGE_SIZE) : 1;

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
        size="small"
      />
      <CardList
        fav_ids={favoritesIds}
        data={data?.results}
        isPending={isPending}
      />
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

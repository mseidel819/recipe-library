"use client";

import { useEffect } from "react";
import CardList from "@/components/card-list/card-list.component";
import TabsLayout from "../layout";
import useFetchRecipes from "@/hooks/useFetchRecipes";
import { Pagination } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

const AuthorPage = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [author_id, category] = params.author;
  const page = searchParams.get("page") || 1;

  const { isPending, isFetching, isError, data } = useFetchRecipes(
    author_id,
    category,
    page
  );

  const totalPages = data?.count ? Math.ceil(data.count / 15) : 1;

  const handlePageChange = (event, value) => {
    router.push(`/blogs/${author_id}/${category}/?page=${value}`);
  };

  return (
    <div>
      <CardList
        data={data?.results}
        category={category}
        isPending={isPending}
      />
      <Pagination
        className={styles.pagination}
        count={totalPages}
        variant="outlined"
        page={+page}
        shape="rounded"
        onChange={handlePageChange}
      />
    </div>
  );
};

export default AuthorPage;
AuthorPage.getLayout = function getLayout(page) {
  return <TabsLayout>{page}</TabsLayout>;
};

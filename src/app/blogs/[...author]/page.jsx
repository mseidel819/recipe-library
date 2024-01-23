"use client";

import CardList from "@/components/card-list/card-list.component";
import TabsLayout from "../layout";
import useFetchRecipes from "@/hooks/useFetchRecipes";

const AuthorPage = ({ params }) => {
  const [author_id, category] = params.author;

  const { isPending, isFetching, isError, data } = useFetchRecipes(
    author_id,
    category
  );

  return (
    <div>
      <CardList data={data} category={category} isPending={isPending} />
    </div>
  );
};

export default AuthorPage;
AuthorPage.getLayout = function getLayout(page) {
  return <TabsLayout>{page}</TabsLayout>;
};

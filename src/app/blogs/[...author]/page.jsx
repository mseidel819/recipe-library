"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CardList from "@/components/card-list/card-list.component";
import TabsLayout from "../layout";
import useSetTheme from "@/hooks/useSetTheme";
import useFetchRecipes from "@/hooks/useFetchRecipes";

const AuthorPage = ({ params }) => {
  const [author_id, category] = params.author;

  const themeHook = useSetTheme();
  const { isPending, isFetching, isError, data } = useFetchRecipes(
    author_id,
    category
  );

  return (
    <ThemeProvider theme={themeHook}>
      <CssBaseline />
      <div>
        <CardList data={data} category={category} />
      </div>
    </ThemeProvider>
  );
};

export default AuthorPage;
AuthorPage.getLayout = function getLayout(page) {
  return <TabsLayout>{page}</TabsLayout>;
};

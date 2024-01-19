"use client";
import CardList from "@/components/card-list/card-list.component";
import TabsLayout from "../layout";
// this page will display the author selected from the entry page where the user clicked 1 authors name. user will then see all of the categories in a tab list.
// user can then click on a category and see all of the recipes in that category on this same page. it will add a param to the url for the category.
// if no second param (category) only tab will display with a "select category" message. or all recipes? is this too much?
// where is the author data stored and passed to get list of categories? context?
import { useEffect, useState } from "react";

const AuthorPage = ({ params }) => {
  // const router = useRouter();
  const [author_id, category] = params.author;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/api/blog-recipes/by-author/${author_id}/?categories=${category}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data);
      });
  }, [author_id, category]);

  return (
    <div>
      <div>Author page</div>
      <CardList data={recipes} category={category} />
    </div>
  );
};

export default AuthorPage;
AuthorPage.getLayout = function getLayout(page) {
  return <TabsLayout>{page}</TabsLayout>;
};

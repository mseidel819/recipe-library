"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import useSetTheme from "@/hooks/useSetTheme";
import useFetchAuthors from "@/hooks/useFetchAuthors";
import BasicTabs from "@/components/tabs/tabs.component";
import styles from "./layout.module.css";

const TabsLayout = ({ children }) => {
  const router = useRouter();
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const theme = useSetTheme();
  const authors = useFetchAuthors();

  const setAuthorHandler = (author) => {
    setSelectedAuthor(author);
  };

  const setCategoryHandler = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedAuthor || selectedCategory) {
      router.push(`/blogs/${selectedAuthor?.id}/${selectedCategory}`);
    }
  }, [selectedAuthor, selectedCategory]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.container}>
        <BasicTabs
          componentType="authors"
          tabArray={authors}
          handler={setAuthorHandler}>
          <BasicTabs
            componentType="categories"
            tabArray={selectedAuthor?.categories}
            handler={setCategoryHandler}>
            {children}
          </BasicTabs>
        </BasicTabs>
      </div>
    </ThemeProvider>
  );
};

export default TabsLayout;

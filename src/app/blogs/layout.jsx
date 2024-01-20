"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import useSetTheme from "@/hooks/useSetTheme";
import BasicTabs from "@/components/tabs/tabs.component";
import styles from "./layout.module.css";

const TabsLayout = ({ children }) => {
  const router = useRouter();
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [theme, setTheme] = useState({});

  const themeHook = useSetTheme();

  useEffect(() => {
    setTheme(themeHook);
  }, [theme, themeHook]);

  const setAuthorHandler = (author) => {
    setSelectedAuthor(author);
  };

  const setCategoryHandler = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    fetch(
      "https://peppy-alpaca-9050d7.netlify.app/api/api/blog-recipes/authors"
    )
      .then((res) => res.json())
      .then((data) => {
        setAuthors(data);
      });
  }, []);

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

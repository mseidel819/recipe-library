"use client";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState, useMemo } from "react";

import TabsLayout from "./layout";

const BlogPage = () => {
  //   const { data, error } = useSWR("/api/blogs", fetcher);

  //   if (error) return <div>failed to load</div>;
  //   if (!data) return <div>loading...</div>;
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <h1>Blog Page nothing here</h1>
      </div>
    </ThemeProvider>
  );
};

export default BlogPage;
BlogPage.getLayout = function getLayout(page) {
  return <TabsLayout>{page}</TabsLayout>;
};
